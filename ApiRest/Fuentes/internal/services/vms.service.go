package services

import (
	"ApiRest/internal/models/dtos"
	"ApiRest/internal/models/entitys"
	"fmt"
)

// CreateVirtualMachine crea una nueva máquina virtual en la base de datos
func CreateVirtualMachine(req dtos.VmsRequest) (dtos.Response, error) {
	response := dtos.Response{
		Success: false,
		Data:    nil, // Aquí inicializamos Data como nil
	}

	// Crear la máquina virtual
	vm := entitys.Vms{
		Name:  req.Name,
		Cores: req.Cores,
		Ram:   req.Ram,
		Disk:  req.Disk,
		Os:    req.Os,
	}

	// Guardamos la máquina virtual en la base de datos
	err := vm.Create()
	if err != nil {
		response.Errors = append(response.Errors, fmt.Sprintf("Error al crear la máquina virtual: %s", err.Error()))
		return response, nil
	}

	// Si se crea exitosamente, devolvemos la respuesta con la máquina virtual
	response.Success = true
	response.Message = fmt.Sprintf("Se ha creado la maquina exitosamente : %s", req.Name)
	response.Data = vm

	return response, nil
}

// GetAllVirtualMachines obtiene todas las máquinas virtuales
func GetAllVirtualMachines() (dtos.Response, error) {
	// Respuesta inicial
	response := dtos.Response{
		Success: false,
		Data:    nil, // Inicializamos Data como nil
	}

	// Obtener todas las máquinas virtuales
	var vmModel entitys.Vms
	vms, err := vmModel.GetAllVms()
	if err != nil {
		response.Errors = append(response.Errors, fmt.Sprintf("Error al obtener las máquinas virtuales: %s", err.Error()))
		return response, nil
	}

	// Si encontramos las máquinas virtuales, devolvemos la respuesta
	response.Success = true
	response.Data = vms

	return response, nil
}

// GetVirtualMachineById obtiene una máquina virtual por su ID
func GetVirtualMachineById(id string) (dtos.Response, error) {
	// Respuesta inicial
	response := dtos.Response{
		Success: false,
		Data:    nil, // Inicializamos Data como nil
	}

	// Buscar la máquina virtual por ID
	var vmModel entitys.Vms
	vm, err := vmModel.GetById(id)
	if err != nil {
		response.Errors = append(response.Errors, fmt.Sprintf("Error al obtener la máquina virtual: %s", err.Error()))
		return response, nil
	}

	// Si encontramos la máquina virtual, devolvemos la respuesta
	response.Success = true
	response.Data = vm

	return response, nil
}

// UpdateVirtualMachine actualiza los detalles de una máquina virtual
func UpdateVirtualMachine(req dtos.VmsRequest) (dtos.Response, error) {
	// Respuesta inicial
	response := dtos.Response{
		Success: false,
		Data:    nil, // Inicializamos Data como nil
	}

	// Buscar la máquina virtual por ID
	var vmModel entitys.Vms
	vm, err := vmModel.GetById(req.Id)
	if err != nil {
		response.Errors = append(response.Errors, fmt.Sprintf("Error al obtener la máquina virtual para actualizar: %s", err.Error()))
		return response, nil
	}

	// Actualizamos los campos de la máquina virtual
	vm.Name = req.Name
	vm.Cores = req.Cores
	vm.Ram = req.Ram
	vm.Disk = req.Disk
	vm.Os = req.Os

	// Llamamos al método de actualización en el modelo
	err = vm.Update()
	if err != nil {
		response.Errors = append(response.Errors, fmt.Sprintf("Error al actualizar la máquina virtual: %s", err.Error()))
		return response, nil
	}

	// Si la actualización es exitosa, devolvemos la respuesta
	response.Success = true
	response.Message = fmt.Sprintf("Se ha actualizado la maquina exitosamente : %s", req.Name)
	response.Data = vm

	return response, nil
}

// DeleteVirtualMachine elimina una máquina virtual por su ID
func DeleteVirtualMachine(id string) (dtos.Response, error) {
	// Respuesta inicial
	response := dtos.Response{
		Success: false,
		Data:    nil, // Inicializamos Data como nil
	}

	// Buscar la máquina virtual por ID
	var vmModel entitys.Vms
	vm, err := vmModel.GetById(id)
	if err != nil {
		response.Errors = append(response.Errors, fmt.Sprintf("Error al obtener la máquina virtual para eliminar: %s", err.Error()))
		return response, nil
	}

	// Llamamos al método de eliminación en el modelo
	err = vm.Delete()
	if err != nil {
		response.Errors = append(response.Errors, fmt.Sprintf("Error al eliminar la máquina virtual: %s", err.Error()))
		return response, nil
	}

	// Si la eliminación es exitosa, devolvemos la respuesta
	response.Success = true
	response.Message = fmt.Sprintf("Se ha eliminado la maquina exitosamente : %s", vm.Name)
	response.Data = vm

	return response, nil
}
