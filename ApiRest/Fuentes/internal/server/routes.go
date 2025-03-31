package server

import (
	"ApiRest/internal/server/controllers"
	"ApiRest/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (s *Server) RegisterRoutes() http.Handler {
	authController := controllers.NewAuthController()
	vmsController := controllers.NewVmsController()

	// gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Use(corsMiddleware())

	r.GET("/ws", utils.HandleConnections) // Servicio que abre la conexion webSocket
	go utils.HandleMessages()             // Go rutina que inicia el envio de mensajes

	r.POST("/login", authController.LoginUsers) // Servicio que realiza login en la aplicación

	r.GET("vms", vmsController.GetVirtualsMachines)       // Servicio que realiza login en la aplicación
	r.GET("vms/idVms", vmsController.GetVirtualsMachines) // Servicio que realiza login en la aplicación

	// Rutas protegidas de VMS por Token
	protected := r.Group("/vms")
	protected.Use(utils.JWTMiddleware())
	protected.POST("", vmsController.CreateVirtualMachine)          // Servicio que crea una maquina virtual
	protected.PUT("/:idVms", vmsController.UpdateVirtualMachine)    // Servicio que actualiza una maquina virtual
	protected.DELETE("/:idVms", vmsController.DeleteVirtualMachine) // Elimina una maquina virual

	return r
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
