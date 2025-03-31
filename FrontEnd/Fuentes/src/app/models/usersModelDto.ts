export interface UsersModel {
  id: string,
  name: string,
  lastName: string,
  email: string,
  password: string,
  typeUser: number
  token: string,
  creationDate: Date
}

export interface ResponseLoginRequest {
  success: boolean
  message: string
  data: UsersModel
  errors?: string[]
}