import { FormControl, Validators } from '@angular/forms';

const SetFieldsForm = (camposForm: any, dataElement: any) => {
  const columnsForm: { [key: string]: FormControl } = {};

  const dataElementEntries = dataElement ?? {};
  
  const dataElementMap = new Map(Object.entries(dataElementEntries));

  camposForm.forEach((element: any) => {
    const value = dataElementMap.get(element.nombreCampo) ?? null;
    
    columnsForm[element.nombreCampo] = new FormControl(
      { value, disabled: element.nombreCampo.startsWith('id') ? true : false },
      element.obligatorio ? Validators.required : null
    );
  });

  return columnsForm;

};

const ValidarPropiedadEntidad = (nombreCampo: string, obj: any) => {
  return nombreCampo in obj;
};

export { SetFieldsForm, ValidarPropiedadEntidad };