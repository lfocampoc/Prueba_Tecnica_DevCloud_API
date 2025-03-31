package controllers

import (
	"ApiRest/internal/models/dtos"
	"ApiRest/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// AuthController maneja las operaciones relacionadas con discos
type AuthController struct{}

// NewAuthController crea una instancia del controlador de discos
func NewAuthController() *AuthController {
	return &AuthController{}
}

// LoginUsers Metodo encargado de iniciar sesion
func (d *AuthController) LoginUsers(ctx *gin.Context) {
	var req dtos.LoginRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validar parámetros
	if req.Email == "" || req.Password == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Parámetros inválidos"})
		return
	}

	response, err := services.LoginUser(req.Email, req.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, response)
}
