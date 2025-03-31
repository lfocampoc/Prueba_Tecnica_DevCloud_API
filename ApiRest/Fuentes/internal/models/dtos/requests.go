package dtos

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type VmsRequest struct {
	Id     string `json:"id"`
	Name   string `json:"name" binding:"required"`  // Nombre de la máquina virtual
	Cores  int    `json:"cores" binding:"required"` // Número de núcleos
	Ram    int    `json:"ram" binding:"required"`   // Memoria RAM
	Disk   int    `json:"disk" binding:"required"`  // Espacio en disco
	Os     string `json:"os" binding:"required"`    // Sistema operativo
	Status bool   `json:"status"`                   // Estado de la máquina (activo o no)
}

type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`   // Puede ser cualquier tipo de datos (array, objeto)
	Errors  []string    `json:"errors,omitempty"` // Array de errores
}
