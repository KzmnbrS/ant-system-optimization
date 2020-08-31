package aco

/**
 * Ant system (AS) ant colony optimization implementation
 *
 * @author Kuzmin Boris
 * @version 20190406
 */

import (
	"math"
	"math/rand"
)


type Environment struct {
	// Adjacency matrix
	Weights [][]float64 `json:"weights"`

	// Pheromone matrix
	Pheromones [][]float64 `json:"pheromones"`

	// [Weights] and [Pheromones] header
	Vertices []string `json:"vertices"`

	// Indices in [Vertices]
	Nest int `json:"nest"`
	Food int `json:"food"`
}

type Optimization struct {
	// Evaporation rate
	P float64 `json:"evaporationRate"`

	// Ants quantity
	Quantity int `json:"quantity"`

	// Amount of pheromones to be deposited on the path
	// during retracing phase by a single agent
	Q float64 `json:"capacity"`

	// [Alpha] and [Beta] are parameters that control
	// the relative importance of the pheromone versus
	// the heuristic information
	//
	// @see [ant.choiceProb]
	Alpha float64 `json:"alpha"`
	Beta  float64 `json:"beta"`
}

type ant struct {
	// [Environment.Vertices] index
	whereabouts int

	// Summary weight of all edges in the agent's memory
	mileage float64
	memory  map[Edge]bool
}

func (_ *ant) choiceProb(edge Edge,
						 env *Environment,
						 opt *Optimization) float64 {
	tau := math.Pow(env.Pheromones[edge.I][edge.J], opt.Alpha)
	eta := math.Pow(1 / env.Weights[edge.I][edge.J], opt.Beta)
	return tau * eta
}

func (ant *ant) move(env *Environment, opt *Optimization) int {
	county := make([]Edge, 0)

	var totalProb float64
	probMap := map[Edge]float64{}

	for _, edge := range adjacentEdges(ant.whereabouts, env.Weights) {
		if _, visited := ant.memory[edge]; !visited {
			county = append(county, edge)
			choiceProb := ant.choiceProb(edge, env, opt)

			totalProb += choiceProb
			probMap[edge] = choiceProb
		}
	}

	if len(county) == 0 { return AntLost }

	luck := rand.Float64()
	var acquiredArea float64

	for i, edge := range county {
		sectorArea := probMap[edge] / totalProb
		if luck >= acquiredArea && luck < acquiredArea + sectorArea {
			next := county[i]
			ant.mileage += env.Weights[next.I][next.J]

			ant.memory[next] = true
			ant.memory[next.invert()] = true

			ant.whereabouts = next.J
		} else { acquiredArea += sectorArea }
	}

	if ant.whereabouts == env.Food { return AntGoal }
	return AntActive
}

const (
	AntActive = iota
	AntLost
	AntGoal
)

// Returns matrix of pheromones to be deposited after
// all [opt.Quantity] ants are done
func DeltaMatrix(env *Environment, opt *Optimization) [][]float64 {
	deltaMatrix := SquareMatrix(len(env.Pheromones), 0)
	for i := 0; i < opt.Quantity; i++ {
		ant := ant{
			whereabouts: env.Nest,
			mileage: 0,
			memory: map[Edge]bool{},
		}

		for {
			state := ant.move(env, opt)
			if state != AntActive {
				if state == AntGoal {
					for edge := range ant.memory {
						delta := opt.Q / ant.mileage
						deltaMatrix[edge.I][edge.J] += delta
						deltaMatrix[edge.J][edge.I] += delta
					}
				}

				break
			}
		}
	}

	return deltaMatrix
}

func Evaporate(pheromones [][]float64, p float64) {
	for i := range pheromones {
		for j := range pheromones {
			pheromones[i][j] *= 1 - p
		}
	}
}

func Impose(source, destination [][]float64) {
	for i := range source {
		for j := range source {
			destination[i][j] += source[i][j]
		}
	}
}

func adjacentEdges(i int, matrix [][]float64) []Edge {
	ret := make([]Edge, 0)
	for j := range matrix[i] {
		if matrix[i][j] != 0 {
			ret = append(ret, Edge{i, j})
		}
	}

	return ret
}
