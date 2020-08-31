package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"runtime"
	"time"
)

func main() {
	router := mux.NewRouter()
	router.
		Path("/ACOSeries").
		Methods(http.MethodPost).
		HandlerFunc(ACOSeriesHandler)

	runtime.GOMAXPROCS(runtime.NumCPU())
	server := &http.Server{
		Addr:         "localhost:8080",
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler: router,
	}

	log.Fatal(server.ListenAndServe())
}
