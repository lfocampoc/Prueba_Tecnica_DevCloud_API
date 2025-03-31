package main

import (
	"fmt"
	"log"
	"net/http"

	"ApiRest/internal/server"
	"ApiRest/internal/utils"
)

func main() {
	// Iniciar conexión a la DB
	if err := utils.InitDB(); err != nil {
		log.Fatalf("Error al conectar a la DB: %v", err)
	}
	defer utils.CloseDB()

	// Inicializa servidor configuraciones
	server := server.NewServer()

	// Create a done channel to signal when the shutdown is complete
	done := make(chan bool, 1)

	err := server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		panic(fmt.Sprintf("http server error: %s", err))
	}

	// Wait for the graceful shutdown to complete
	<-done
	log.Println("Graceful shutdown complete.")
}
