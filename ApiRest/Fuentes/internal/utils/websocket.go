package utils

import (
	"fmt"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool) // Mapa para mantener las conexiones activas
var broadcast = make(chan string)            // Canal para enviar mensajes a todos los clientes
var mu sync.Mutex                            // Mutex para manejar concurrencia

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Asegúrate de manejar adecuadamente la seguridad de la CORS
	},
}

func HandleConnections(c *gin.Context) {
	// Establecer la conexión WebSocket
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer conn.Close()

	// Agregar la conexión al mapa
	mu.Lock()
	clients[conn] = true
	mu.Unlock()

	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			mu.Lock()
			delete(clients, conn)
			mu.Unlock()
			break
		}
	}
}

// Función que maneja la difusión de mensajes a los clientes
func HandleMessages() {
	for {
		msg := <-broadcast // Espera un mensaje

		// Enviar el mensaje a todos los clientes conectados
		mu.Lock()
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, []byte(msg))
			if err != nil {
				fmt.Println(err)
				client.Close()
				delete(clients, client)
			}
		}
		mu.Unlock()
	}
}

// Puedes agregar tus métodos CRUD aquí que llamen a broadcast cuando se cree, edite o elimine un ítem
func BroadcastUpdate(message string) {
	broadcast <- message
}
