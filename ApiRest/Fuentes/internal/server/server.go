package server

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"
)

type Server struct {
	port int
}

func NewServer() *http.Server {
	// Cargar el archivo .env
	if os.Getenv("ENV") != "production" {
		// Si no es producción, carga el archivo .env
		err := godotenv.Load("../../.env")
		if err != nil {
			log.Fatal("Error al cargar el archivo .env")
		}
		fmt.Println("Archivo .env cargado correctamente")
	} else {
		fmt.Println("Entorno de producción, no se carga el archivo .env")
	}

	port, _ := strconv.Atoi(os.Getenv("PORT"))
	NewServer := &Server{
		port: port,
	}

	// Declare Server config
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", NewServer.port),
		Handler:      NewServer.RegisterRoutes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	return server
}
