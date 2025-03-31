package entitys

import (
	"ApiRest/internal/utils"
	"time"

	"github.com/google/uuid"
)

type Vms struct {
	Id           string    `gorm:"column:id;primaryKey" json:"id"`          // Identificador único (UUID)
	Name         string    `gorm:"column:name" json:"name"`                 // Nombre de la máquina virtual
	Cores        int       `gorm:"column:cores" json:"cores"`               // Número de núcleos
	Ram          int       `gorm:"column:ram" json:"ram"`                   // Memoria RAM
	Disk         int       `gorm:"column:disk" json:"disk"`                 // Espacio en disco
	Os           string    `gorm:"column:os" json:"os"`                     // Sistema operativo
	Status       bool      `gorm:"column:status" json:"status"`             // Estado de la máquina
	CreationDate time.Time `gorm:"column:creationDate" json:"creationDate"` // Fecha de creación
	UpdateDate   time.Time `gorm:"column:updateDate" json:"updateDate"`     // Fecha de actualización
}

// TableName establece el nombre de la tabla en GORM
func (Vms) TableName() string {
	return "vmsSchema.Vms"
}

// Create crea una nueva máquina virtual
func (vm *Vms) Create() error {
	db := utils.GetDB()

	vm.Id = uuid.New().String()
	vm.CreationDate = time.Now()
	vm.UpdateDate = time.Now()

	result := db.Create(vm)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// Update actualiza los detalles de una máquina virtual
func (vms *Vms) Update() error {
	db := utils.GetDB()

	vms.UpdateDate = time.Now()
	result := db.Save(vms)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// Delete elimina una máquina virtual por su ID
func (vms *Vms) Delete() error {
	db := utils.GetDB()
	result := db.Delete(vms)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// GetAll obtiene todas las máquinas virtuales
func (v *Vms) GetAllVms() ([]Vms, error) {
	db := utils.GetDB()
	var vms []Vms
	result := db.Find(&vms)
	if result.Error != nil {
		return nil, result.Error
	}
	return vms, nil
}

// GetById obtiene una máquina virtual por su ID
func (v *Vms) GetById(id string) (*Vms, error) {
	db := utils.GetDB()

	var vm Vms
	result := db.Where("Id = ?", id).First(&vm)
	if result.Error != nil {
		return nil, result.Error
	}
	return &vm, nil
}
