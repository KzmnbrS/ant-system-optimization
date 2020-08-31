package aco

/**
 * Ant system (AS) ant colony optimization implementation
 *
 * @author Kuzmin Boris
 * @version 20190406
 */

type Edge struct {
	I int
	J int
}

func (e *Edge) invert() Edge {
	return Edge{e.J, e.I}
}


func SquareMatrix(dim int, val float64) [][]float64 {
	mat := make([][]float64, dim, dim)
	for i := range mat {
		mat[i] = make([]float64, dim, dim)
		for j := range mat[i] {
			mat[i][j] = val
		}
	}

	return mat
}


func Series(env *Environment, opt *Optimization,
	 		iterations int, out chan<- [][]float64)  {
	defer func() {
		close(out)
	}()

	for t := 0; t < iterations; t++ {
		deltaMatrix := DeltaMatrix(env, opt)
		Impose(deltaMatrix, env.Pheromones)
		Evaporate(env.Pheromones, opt.P)
		out <- env.Pheromones
	}
}

func Path(env *Environment) []Edge {
	path := make([]Edge, 0)
	visits := map[Edge]bool{}
	current := env.Nest

	for current != env.Food {
		county := make([]Edge, 0)
		for _, edge := range adjacentEdges(current, env.Weights) {
			if _, visited := visits[edge]; !visited {
				county = append(county, edge)
			}
		}

		if len(county) == 0 {
			return nil
		}

		var (
			maxPh float64
			maxEdge int
		)

		for i, edge := range county {
			ph := env.Pheromones[edge.I][edge.J]
			if ph > maxPh {
				maxPh = ph
				maxEdge = i
			}
		}

		path = append(path, county[maxEdge])
		visits[county[maxEdge]] = true
		visits[county[maxEdge].invert()] = true
	}

	return path
}
