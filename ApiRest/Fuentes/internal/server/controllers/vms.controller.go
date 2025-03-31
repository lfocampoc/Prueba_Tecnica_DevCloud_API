package controllers

import (
	"ApiRest/internal/models/dtos"
	"ApiRest/internal/services"
	"ApiRest/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type VmsController struct{}

// NewDiskController crea una instancia del controlador de discos
func NewVmsController() *VmsController {
	return &VmsController{}
}

// LoginUsers Metodo encargado de iniciar sesion
func (v *VmsController) CreateVirtualMachine(ctx *gin.Context) {
	var req dtos.VmsRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validamos los parámetros
	if req.Name == "" || req.Cores == 0 || req.Ram == 0 || req.Disk == 0 || req.Os == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Faltan campos obligatorios"})
		return
	}

	// Llamamos al servicio para crear la máquina virtual
	response, err := services.CreateVirtualMachine(req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Notificamos al front que se creo una maquina
	utils.BroadcastUpdate("Nuevo ítem creado. Actualiza tu lista.")

	ctx.JSON(http.StatusOK, response)
}

// LoginUsers Metodo encargado de iniciar sesion
func (v *VmsController) GetVirtualsMachines(ctx *gin.Context) {
	response, err := services.GetAllVirtualMachines()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, response)
}

// LoginUsers Metodo encargado de iniciar sesion
func (v *VmsController) GetVMById(ctx *gin.Context) {
	id := ctx.Param("id")

	// Validamos que el ID sea correcto
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "ID de máquina virtual no proporcionado"})
		return
	}

	response, err := services.GetVirtualMachineById(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, response)
}

// LoginUsers Metodo encargado de iniciar sesion
func (v *VmsController) UpdateVirtualMachine(ctx *gin.Context) {
	var req dtos.VmsRequest
	if err := ctx.BindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validamos los parámetros
	if req.Id == "" || req.Name == "" || req.Cores == 0 || req.Ram == 0 || req.Disk == 0 || req.Os == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Faltan campos obligatorios"})
		return
	}

	// Llamamos al servicio para actualizar la máquina virtual
	response, err := services.UpdateVirtualMachine(req)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Notificamos al front que se creo una maquina
	utils.BroadcastUpdate("La maquina se actualizo correctamente...")

	ctx.JSON(http.StatusOK, response)
}

// LoginUsers Metodo encargado de iniciar sesion
func (v *VmsController) DeleteVirtualMachine(ctx *gin.Context) {
	id := ctx.Param("idVms")

	// Validamos que el ID sea correcto
	if id == "" {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "ID de máquina virtual no proporcionado"})
		return
	}

	// Llamamos al servicio para eliminar la máquina virtual
	response, err := services.DeleteVirtualMachine(id)
	if err != nil {
		// Si ocurre un error en el servicio, retornamos el error
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Retornamos la respuesta del servicio (que contiene Success, Data y Errors)
	if response.Success {
		ctx.JSON(http.StatusOK, gin.H{"message": response.Data})

		// Notificamos al front que se elimino una maquina
		utils.BroadcastUpdate("La maquina se elimino correctamente...")
	} else {
		// Si no fue exitoso, retornamos los errores
		ctx.JSON(http.StatusInternalServerError, gin.H{"errors": response.Errors})
	}
}
