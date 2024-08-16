import ProjectsList from '@/components/admin/proje-yonetimi/projects-list'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function ProjeYonetimiPage() {
  return (
    <div className="container mx-auto p-4">
      <ProjectsList />
    </div>
  )
}