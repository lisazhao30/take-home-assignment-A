'use client'
import { Modal, Button, Space, Textarea } from '@mantine/core'
import { useState } from 'react'
import { CreateQuery } from '@/api/query-api'
import { IFormData } from '@/utils/types'
import { Status } from '@prisma/client'

interface NewModalViewProps {
  opened: boolean 
  onClose: () => void 
  data: IFormData
  onUpdate: () => void
}

export const NewModalView: React.FC<NewModalViewProps> = ({
  opened,
  onClose,
  data,
  onUpdate
}) => {
  const [description, setDescription] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false) 

  const handleSubmit = async () => {
    setLoading(true)

    const newQuery = {
      title: `${data.question}`, 
      description,
      status: 'OPEN' as Status, 
      formDataId: data.id,
    }

    const result = await CreateQuery(newQuery)

    if (result.success) {
      console.log('Query created successfully:', result.data)
      onUpdate()
      onClose()
    } else {
      console.error('Failed to create query:', result.error)
    }

    setLoading(false)
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Create a Query | ${data.question}`}
      centered
    >
      <Textarea
        placeholder="Add a new remark"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <Space h="md" />
      <Button fullWidth onClick={handleSubmit} loading={loading}>
        Create
      </Button>
    </Modal>
  )
}
