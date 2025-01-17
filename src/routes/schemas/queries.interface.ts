import { IFormData } from './formData.interface'
import { Status } from '@prisma/client'

export interface IQuery {
  id: string
  title: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
  status: Status
  formData?: IFormData // set to optional bc of error encountered
  formDataId: string
}

export interface ICountedQuery {
  total: number
  query: IQuery[]
}
