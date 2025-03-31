package services

import (
	"ApiRest/internal/models/dtos"
	"ApiRest/internal/models/entitys"
	"ApiRest/internal/utils"
	"fmt"
)

// Función para expandir un disco específico
func LoginUser(email string, password string) (dtos.Response, error) {
	// Respuesta inicial
	response := dtos.Response{
		Success: false,
		Data:    nil,
	}

	// 🔹 Buscar el usuario en la base de datos
	var userModel entitys.User
	userData, err := userModel.AuthenticateUser(email, password)
	if err != nil {
		response.Errors = append(response.Errors, "email y/o contraseñas incorrectas, vuelva a intentar")
		return response, nil // Aquí retornamos la respuesta con el error especificado
	}

	// Generar el token JWT
	tokenJwt, err := utils.GenerateToken(userData.Id, userData.Email, fmt.Sprintf("%d", userData.TypeUser))
	if err != nil {
		response.Errors = append(response.Errors, "Error al generar el Token")
		return response, nil
	}

	userData.TokenJwt = tokenJwt

	response.Success = true
	response.Message = "Usuario inicio correctamente Sesion"
	response.Data = userData

	// Devolvemos la respuesta exitosa
	return response, nil
}
