import { Status } from '@prisma/client'

export interface IQuery {
  id: string
  title: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
  status: Status
  formData: IFormData
  formDataId: string
}

export interface IFormData {
  id: string
  question: string
  answer: string
  query?: IQuery
}

export interface ICountedFormData {
  total: number
  formData: IFormData[]
}
