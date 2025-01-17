import { IQuery } from "./queries.interface"

export interface IFormData {
  id: string
  question: string
  answer: string
  query?: IQuery | null
}

export interface ICountedFormData {
  total: number
  formData: IFormData[]
}
