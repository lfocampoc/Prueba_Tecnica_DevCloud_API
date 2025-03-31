package utils

import (
	"ApiRest/internal/models/dtos"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var (
	secretKey   = []byte("4ccd90a3c942d5c0bf1b03525c2b13247c67463d")
	validIssuer = "web"
)

// Metodo para generar un Token JWT
func GenerateToken(id string, username string, roleId string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // Expira en 24 horas

	// Crear los claims
	claims := &dtos.Claims{
		Id:       id,
		Username: username,
		RoleID:   roleId, // Agregar RoleID al token
		Origin:   "web",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime), // Expiración
			Issuer:    "mi-aplicacion",                    // Issuer, puedes cambiarlo según tu aplicación
		},
	}

	// Crear el token con los claims y el algoritmo de firma HMAC (HS256)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Firmar el token con la clave secreta (jwtSecret debe estar definida previamente)
	return token.SignedString(secretKey)
}

// validateToken valida el JWT y retorna el RoleID
func ValidateToken(tokenString string) (string, error) {
	claims := jwt.MapClaims{}
	parsedToken, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("método de firma inválido")
		}
		return secretKey, nil
	})

	if err != nil || !parsedToken.Valid {
		return "", errors.New("token inválido")
	}

	// Validaciones de claims
	if err := ValidateClaims(claims); err != nil {
		return "", err
	}

	// Extraer UserID
	userID, ok := claims["id"].(string)
	if !ok || userID == "" {
		return "", errors.New("id de la persona no encontrado en el token")
	}

	return userID, nil
}

// validateClaims realiza validaciones adicionales en los claims del token
func ValidateClaims(claims jwt.MapClaims) error {
	if claims["origin"] != validIssuer {
		return errors.New("issuer no válido")
	}

	if exp, ok := claims["exp"].(float64); ok && time.Unix(int64(exp), 0).Before(time.Now()) {
		return errors.New("token expirado")
	}
	return nil
}
