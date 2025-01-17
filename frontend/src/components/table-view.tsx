import { Table, Text } from '@mantine/core'
import { IconPlus, IconQuestionMark, IconCheck } from '@tabler/icons-react'
import { IFormData } from '@/utils/types'
import { NewModalView } from './new-query-modal'
import { ExistingQueryModal } from './existing-query-modal'
import { Status } from '@prisma/client'
import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import classes from '../styling/table-view.module.css'

interface DataTableProps {
  formData: IFormData[]
  isLoading: boolean
  handleUpdates: () => void
}

export const TableView: React.FC<DataTableProps> = ({
  formData,
  isLoading,
  handleUpdates,
}) => {
  const [selectedRow, setSelectedRow] = useState<IFormData | null>(null) 
  const [opened, { open, close }] = useDisclosure(false) 

  const handleOpenModal = (rowData: IFormData) => {
    setSelectedRow(rowData)
    open() 
  }

  const getQueryStatus = (status: Status | undefined, rowData: IFormData) => {
    if (!status) {
      return (
        <IconPlus
          size={20}
          color="blue"
          style={{ cursor: 'pointer' }}
          title="Add Query"
          onClick={() => handleOpenModal(rowData)} 
        />
      )
    }
    if (status === Status.OPEN) {
      return (
        <IconQuestionMark
          size={20}
          color="red"
          style={{ cursor: 'pointer' }}
          title="Open Query"
          onClick={() => handleOpenModal(rowData)} 
        />
      )
    } else {
      return (
        <IconCheck
          size={20}
          color="green"
          style={{ cursor: 'pointer' }}
          title="Resolved Query"
          onClick={() => handleOpenModal(rowData)} 
        />
      )
    }
  }

  const renderModal = () => {
    if (selectedRow?.query) {
      return (
        <ExistingQueryModal
          opened={opened}
          onClose={close}
          data={selectedRow.query} 
          onUpdate={handleUpdates}
        />
      )
    } else {
      // no query
      if (selectedRow) {
        return (
          <NewModalView
            opened={opened}
            onClose={close}
            data={selectedRow}
            onUpdate={handleUpdates}
          />
        )
      }
    }
  }

  const rows = formData.map((data, index) => (
    <Table.Tr key={index}>
      <Table.Td>{data.question}</Table.Td>
      <Table.Td>{data.answer}</Table.Td>
      <Table.Td className={classes.querystatus}>
        {getQueryStatus(data.query?.status, data)}
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <div className={classes.wrapper}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Text size="lg">Query Management Application</Text>
          <Table
            className={classes.table}
            highlightOnHover={true}
            withTableBorder
            verticalSpacing="sm"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Question</Table.Th>
                <Table.Th>Answer</Table.Th>
                <Table.Th>Queries</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          {renderModal()}
        </>
      )}
    </div>
  )
}
