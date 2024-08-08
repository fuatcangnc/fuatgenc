"use client"
import React from 'react'
import { ProjectDataTable } from './ProjectDataTable'
import { columns } from './columns'
import { getProjects } from '@/actions/project.actions'

export default function ProjeYonetimi() {
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const result = await getProjects()
        if (result.success) {
          setData(result.data)
        } else {
          setError("Projeler yüklenirken bir hata oluştu.")
        }
      } catch (err) {
        setError("Projeler yüklenirken bir hata oluştu.")
        console.error("Proje yükleme hatası:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return <div>Yükleniyor...</div>
  }

  if (error) {
    return <div>Hata: {error}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Proje Yönetimi</h1>
      <ProjectDataTable columns={columns} data={data} />
    </div>
  )
}