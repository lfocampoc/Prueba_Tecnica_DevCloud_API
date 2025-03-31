export interface VmsModelDto {
  id: string,
  name: string,
  cores: number,
  ram: number,
  disk: number,
  os: string,
  status: boolean,
  creationDate: Date,
  updateDate: Date
}
  
export interface ResponseVmsDto {
  success: boolean
  message: string
  data: VmsModelDto[]
  erros?: string[]
}