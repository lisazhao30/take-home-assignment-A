'use client'
import { Modal, Button, Space, Text, Divider } from '@mantine/core'
import { useState } from 'react'
import { ResolveQuery, DeleteQuery } from '@/api/query-api'
import { IQuery } from '@/utils/types'
import { Status } from '@prisma/client'
import classes from '../styling/exist-query-modal.module.css'

interface ExistingModalViewProps {
  opened: boolean 
  onClose: () => void 
  data: IQuery 
  onUpdate: () => void
}

export const ExistingQueryModal: React.FC<ExistingModalViewProps> = ({
  opened,
  onClose,
  data,
  onUpdate
}) => {
  const [loading, setLoading] = useState<boolean>(false) 

  const handleResolveSubmit = async () => {
    setLoading(true)

    const newQuery = {
      title: `Query for ${data.title}`, 
      status: 'RESOLVED' as Status,
    }

    const result = await ResolveQuery(data.id, newQuery)

    if (result.success && result.data) {
      console.log('Query resolved successfully:', result.data)
      onUpdate()
      onClose()
    } else {
      console.error('Failed to resolve query:', result.error)
    }

    setLoading(false)
  }

  const handleDeleteSubmit = async () => {
    setLoading(true)

    const result = await DeleteQuery(data.id)

    if (result.success) {
      console.log('Query deleted successfully:', result.message)
      onUpdate()
      onClose()
    } else {
      console.error('Failed to delete query:', result.error)
    }

    setLoading(false)
  }

  const getDate = (date: Date) => new Date(date).toLocaleDateString()

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Query | ${data.title}`}
      centered
    >
      <div className={classes.header}>
        <div className={classes.header_content}>
          <Text size="sm" c="dimmed">
            Query Status
          </Text>
          <Text>{data.status}</Text>
        </div>
        <div className={classes.header_content}>
          <Text size="sm" c="dimmed">
            Created At
          </Text>
          <Text>{getDate(data.createdAt)}</Text>
        </div>
      </div>
      <Divider my="md" />
      <div className="description">
        <div className="updated_at">
          <Text size="sm" c="dimmed">
            Updated At
          </Text>
          <Text>{getDate(data.updatedAt)}</Text>
        </div>
        <Text>{data.description}</Text>
      </div>
      <Space h="md" />
      <div className={classes.buttons}>
        {data.status === Status.OPEN && (
          <Button onClick={handleResolveSubmit} loading={loading}>
            Resolve
          </Button>
        )}
        <Button onClick={handleDeleteSubmit} loading={loading} color="red">
          Delete
        </Button>
      </div>
    </Modal>
  )
}
