package dtos

import "github.com/golang-jwt/jwt/v5"

type Claims struct {
	Id       string `json:"id"` // Id GUID
	Username string `json:"username"`
	RoleID   string `json:"roleID"`
	Origin   string `json:"origin"`
	jwt.RegisteredClaims
}
