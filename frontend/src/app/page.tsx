'use client'
import { TableView} from '../components/table-view'
import { useState, useEffect } from 'react'
import { GetFormData } from '@/api/form-data-api'
import { IFormData} from '@/utils/types'
import classes from '../styling/page.module.css'

export default function Home() {
  const [formData, setFormData] = useState<IFormData[]>([]) 
  const [isLoading, setIsLoading] = useState(true) 

  const fetchData = async () => {
    const result = await GetFormData()
    if (result.success && result.data) {
      // console.log('formData:', result.data)
      setFormData(result.data.formData || []) 
    } else {
      console.error('failed to fetch form data:', result.error)
    }
    setIsLoading(false) 
  }

  useEffect(() => {
    fetchData()
  }, [])

  // call fetchdata again when updates occurred
  const handleUpdates = () => fetchData()

  return (
    <div className={classes.wrapper}>
      <TableView
        formData={formData}
        isLoading={isLoading}
        handleUpdates={handleUpdates}
      />
    </div>
  )
}
