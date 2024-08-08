"use server"

import { projectSchema, ProjectFormData } from "@/schemas/projectSchema"
import { projects } from "@/lib/schema"
import { db } from "@/lib/db"
import fs from 'fs'
import path from 'path'
import { eq } from "drizzle-orm"
import { Project } from '@/types/index'
import { revalidatePath } from "next/cache"


type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>

export async function createProject(data: ProjectInput) {
  try {
    const validatedData = projectSchema.parse(data)
    const [newProject] = await db.insert(projects).values({
      name: validatedData.name,
      status: validatedData.status,
      startDate: new Date(validatedData.startDate),
      endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      image: validatedData.image,
    } as { name: string; status: string; startDate: Date; endDate: Date | null; image: string; }).returning()
    revalidatePath('/admin/projects')
    return { success: true, data: newProject }
  } catch (error) {
    console.error('Proje oluşturulurken hata oluştu:', error)
    return { success: false, error: 'Proje oluşturulamadı' }
  }
}

export async function updateProject(id: number, data: Partial<ProjectInput>) {
  try {
    const validatedData = projectSchema.partial().parse(data)
    const updateData = {
      ...(validatedData.name && { name: validatedData.name }),
      ...(validatedData.status && { status: validatedData.status }),
      ...(validatedData.startDate && { startDate: new Date(validatedData.startDate) }),
      ...(validatedData.endDate && { endDate: new Date(validatedData.endDate) }),
      ...(validatedData.image && { image: validatedData.image }),
    }
    const [updatedProject] = await db.update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning()
    revalidatePath('/admin/projects')
    return { success: true, data: updatedProject }
  } catch (error) {
    console.error('Proje güncellenirken hata oluştu:', error)
    return { success: false, error: 'Proje güncellenemedi' }
  }
}

export async function getProjects() {
  try {
    const projectsData = await db.select().from(projects)
    return { success: true, data: projectsData }
  } catch (error) {
    console.error("Proje çekme hatası:", error)
    return { success: false, error: "Projeler çekilirken bir hata oluştu." }
  }
}

export async function getProjectById(id: number) {
  try {
    const project = await db.select().from(projects).where(eq(projects.id, id))
    if (project.length === 0) {
      return { success: false, error: "Proje bulunamadı." }
    }
    return { success: true, data: project[0] }
  } catch (error) {
    console.error("Proje çekme hatası:", error)
    return { success: false, error: "Proje çekilirken bir hata oluştu." }
  }
}


export async function deleteProject(id: number) {
  try {
    const deletedProject = await db.delete(projects)
      .where(eq(projects.id, id))
      .returning()

    if (deletedProject.length === 0) {
      return { success: false, error: "Proje bulunamadı." }
    }

    if (deletedProject[0].image) {
      const imagePath = path.join(process.cwd(), 'public', 'uploads', 'proje-yonetimi', deletedProject[0].image)
      await fs.promises.unlink(imagePath).catch(err => console.error("Resim silme hatası:", err))
    }

    return { success: true, data: deletedProject[0] }
  } catch (error) {
    console.error("Proje silme hatası:", error)
    return { success: false, error: "Proje silinirken bir hata oluştu." }
  }
}

export async function uploadProjectImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filename = file.name
  const filepath = path.join(process.cwd(), 'public', 'uploads', 'proje-yonetimi', filename)

  await fs.promises.writeFile(filepath, buffer)
  return filename
}
