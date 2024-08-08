"use server"

import { projectSchema, ProjectFormData } from "@/schemas/projectSchema"
import { projects } from "@/lib/schema"
import { db } from "@/lib/db"
import fs from 'fs'
import path from 'path'
import { eq } from "drizzle-orm"
import { Project } from '@/types/index'

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

export async function createProject(formData: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    return { success: false, error: result.error.format() }
  }

  const projectData: ProjectFormData = result.data

  let imageUrl = ''
  if (projectData.image instanceof File) {
    imageUrl = await uploadProjectImage(projectData.image)
  } else {
    imageUrl = projectData.image
  }

  try {
    const newProject = await db.insert(projects).values({
      name: projectData.name,
      status: projectData.status,
      startDate: new Date(projectData.startDate),
      endDate: projectData.endDate ? new Date(projectData.endDate) : null,
      image: imageUrl,
    }).returning()

    return { success: true, data: newProject[0] }
  } catch (error) {
    console.error("Proje ekleme hatası:", error)
    return { success: false, error: "Proje eklenirken bir hata oluştu." }
  }
}

export async function updateProject(id: number, formData: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(formData))
  if (!result.success) {
    return { success: false, error: result.error.format() }
  }

  const projectData: ProjectFormData = result.data

  let imageUrl = ''
  if (projectData.image instanceof File) {
    imageUrl = await uploadProjectImage(projectData.image)
  } else {
    imageUrl = projectData.image
  }

  try {
    const updatedProject = await db.update(projects)
      .set({
        name: projectData.name,
        status: projectData.status,
        startDate: new Date(projectData.startDate),
        endDate: projectData.endDate ? new Date(projectData.endDate) : null,
        image: imageUrl,
      })
      .where(eq(projects.id, id))
      .returning()

    if (updatedProject.length === 0) {
      return { success: false, error: "Proje bulunamadı." }
    }

    return { success: true, data: updatedProject[0] }
  } catch (error) {
    console.error("Proje güncelleme hatası:", error)
    return { success: false, error: "Proje güncellenirken bir hata oluştu." }
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

    // Eğer projenin bir resmi varsa, onu da silelim
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
  return filename  // Yalnızca dosya adını döndür
}