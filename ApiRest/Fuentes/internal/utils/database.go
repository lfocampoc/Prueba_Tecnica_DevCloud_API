package utils

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
)

var dbInstance *gorm.DB

func InitDB() error {
	var err error

	err = godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error al cargar el archivo .env")
		return err
	}

	// Cadena de conexion a la base de datos
	connString := fmt.Sprintf("sqlserver://%s:%s@%s:%s?database=%s",
		os.Getenv("DB_USER"),  // Usuario de la base de datos
		os.Getenv("DB_PWD"),   // Contraseña de la base de datos
		os.Getenv("DB_IP"),    // IP o nombre del servidor
		"1433",                // Puerto de SQL Server (por defecto es 1433)
		os.Getenv("DATABASE")) // Nombre de la base de datos

	dbInstance, err = gorm.Open(sqlserver.Open(connString), &gorm.Config{})
	if err != nil {
		return err
	}

	sqlDB, err := dbInstance.DB()
	if err != nil {
		return err
	}

	if err := sqlDB.Ping(); err != nil {
		log.Printf("Conexión a SQL: %s Fallida!\n", os.Getenv("database"))
		return err
	}

	log.Printf("Conexión a SQL: %s desde Go ok!\n", os.Getenv("database"))
	return nil
}

func GetDB() *gorm.DB {
	return dbInstance
}

func CloseDB() {
	sqlDB, err := dbInstance.DB()
	if err == nil {
		sqlDB.Close()
		log.Println("Conexión a la base de datos cerrada.")
	}
}
