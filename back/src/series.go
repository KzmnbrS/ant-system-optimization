package main

import (
	"aco"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"
)

type ACOSeriesRPL struct {
	Env        aco.Environment  `json:"environment"`
	Opt        aco.Optimization `json:"optimization"`
	Iterations int              `json:"iterations"`
}

func ACOSeriesHandler(w http.ResponseWriter, r *http.Request) {
	var data ACOSeriesRPL

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}

	if err := json.Unmarshal(body, &data); err != nil {
		panic(err)
	}

	phChan := make(chan [][]float64)

	w.Write([]byte{'{'})
	go aco.Series(&data.Env, &data.Opt,
		          data.Iterations,
				  phChan)

	// TODO: Better

	var i int
	for phMatrix := range phChan {
		fmt.Fprintf(w, "\"%d\":[", i)

		dim := len(phMatrix)
		high := dim - 1

		for i := 0; i < dim; i++ {
			w.Write([]byte{'['})
			for j := 0; j < dim; j++ {
				fmt.Fprint(w, math.Round(phMatrix[i][j] * 1000) / 1000)

				if j != high {
					w.Write([]byte{','})
				}
			}

			w.Write([]byte{']'})
			if i != high {
				w.Write([]byte{','})
			}
		}

		w.Write([]byte{']'})

		i++
		if i != data.Iterations {
			w.Write([]byte{','})
		}
	}

	w.Write([]byte{'}'})
}
