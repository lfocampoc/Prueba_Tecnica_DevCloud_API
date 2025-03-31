package entitys

import (
	"ApiRest/internal/utils"
	"errors"
	"time"
)

type User struct {
	Id           string    `gorm:"column:id;primaryKey"` // Identificador único del usuario (UUID)
	Name         string    `gorm:"column:name"`          // Nombre del usuario
	LastName     string    `gorm:"column:lastName"`      // Apellido del usuario
	Email        string    `gorm:"column:email"`         // Correo electrónico del usuario
	Password     string    `gorm:"column:password"`      // Contraseña del usuario
	TokenJwt     string    `json:"token,omitempty"`      // Campo que solo se agrega para setear el token no es una columna
	TypeUser     int       `gorm:"column:typeUser"`      // Tipo de usuario (Administrador, Cliente, etc.)
	CreationDate time.Time `gorm:"column:creationDate"`  // Fecha de creación del usuario
}

// TableName establece el nombre de la tabla en GORM
func (User) TableName() string {
	return "userSchema.Users"
}

// AuthenticateUser autentica a un usuario utilizando el email/username y contraseña
func (u *User) AuthenticateUser(email, password string) (*User, error) {
	db := utils.GetDB()

	var user User
	// Buscar el usuario por el correo electrónico
	result := db.Where("Email = ?", email).First(&user)
	if result.Error != nil {
		return nil, errors.New("usuario no encontrado")
	}

	// Desencriptar la contraseña almacenada en la base de datos
	decryptedPassword, err := utils.Decrypt(user.Password) // Desencriptamos la contraseña

	if err != nil {
		return nil, errors.New("error al desencriptar la contraseña del usuario")
	}

	// Comparar la contraseña desencriptada con la ingresada
	if decryptedPassword != password {
		return nil, errors.New("contraseña incorrecta")
	}

	return &user, nil
}
