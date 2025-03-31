package utils

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// JWTMiddleware protege las rutas validando el JWT
func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := parseAuthorizationHeader(c.Request)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		userID, err := ValidateToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		c.Set("UserID", userID)
		c.Next()
	}
}

// parseAuthorizationHeader extrae el token del encabezado Authorization
func parseAuthorizationHeader(r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	if !strings.HasPrefix(strings.ToLower(authHeader), "seguridad ") {
		return "", errors.New("formato de autorización inválido")
	}

	return strings.TrimPrefix(authHeader, "seguridad "), nil
}
