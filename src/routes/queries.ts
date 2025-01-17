import { FastifyInstance } from 'fastify'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { ApiError } from '../errors'
import { IQuery } from './schemas/queries.interface'

async function queryRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'queryRoutes' })

  // get all queries
  app.get<{
    Reply: IQuery[]
  }>('', {
    async handler(_, reply) {
      log.debug('get queries')
      try {
        const queries = await prisma.query.findMany({
          include: { formData: true },
        })
        reply.send(queries)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('Failed to fetch queries', 400)
      }
    },
  })

  // create new query
  app.post<{
    Body: Pick<IQuery, 'title' | 'description' | 'status' | 'formDataId'>
    Reply: IQuery
  }>('', {
    async handler(req, reply) {
      log.debug('create query')
      const { title, description, status, formDataId } = req.body

      if (!title || !status || !formDataId) {
        throw new ApiError('Title, status, and formDataId are required', 400)
      }

      try {
        const newQuery = await prisma.query.create({
          data: { title, description, status, formDataId },
          include: { formData: true },
        })
        reply.send(newQuery)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('Failed to create query', 400)
      }
    },
  })

  // update query status
  app.put<{
    Params: { id: string }
    Body: Partial<Pick<IQuery, 'title' | 'description' | 'status'>>
    Reply: IQuery
  }>('/:id', {
    async handler(req, reply) {
      log.debug('update query')
      const { id } = req.params
      const { title, description, status } = req.body

      try {
        const updatedQuery = await prisma.query.update({
          where: { id },
          data: { title, description, status },
          include: { formData: true },
        })
        reply.send(updatedQuery)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError(`Failed to update query with ID ${id}`, 400)
      }
    },
  })

  // delete query by id
  app.delete<{
    Params: { id: string }
    Reply: { message: string }
  }>('/:id', {
    async handler(req, reply) {
      log.debug('delete query')
      const { id } = req.params

      try {
        await prisma.query.delete({
          where: { id },
        })
        reply.send({ message: `Query with ID ${id} has been deleted` })
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError(`Failed to delete query with ID ${id}`, 400)
      }
    },
  })
}

export default queryRoutes
