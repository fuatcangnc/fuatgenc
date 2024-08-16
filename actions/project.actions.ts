"use server"

import { ProjectSchema, projectSchema } from "@/schemas/projectSchema"
import { projects } from "@/lib/schema"
import { db } from "@/lib/db"
import { eq } from "drizzle-orm"

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

export async function createProject(data: ProjectSchema) {
  console.log("Received data:", data);
  const result = projectSchema.safeParse(data);
  if (!result.success) {
    console.error("Validation error:", result.error.format());
    return { success: false, error: result.error.format() };
  }
  try {
    console.log("Validated data:", result.data);
    //@ts-ignore
    const newProject = await db.insert(projects).values({
      name: result.data.name,
      status: result.data.status,
      startDate: new Date(result.data.startDate).toISOString(),
      endDate: result.data.endDate 
        ? new Date(result.data.endDate).toISOString()
        : null,
      image: result.data.image,
    }).returning();

    console.log("New project:", newProject);
    return { success: true, data: newProject[0] };
  } catch (error) {
    console.error("Proje ekleme hatası:", error);
    return { success: false, error: "Proje eklenirken bir hata oluştu: " + (error as Error).message };
  }
}

export async function updateProject(id: number, data: ProjectSchema) {
  console.log("Received update data:", data);
  const result = projectSchema.safeParse(data)
  if (!result.success) {
    console.error("Validation error:", JSON.stringify(result.error.format(), null, 2))
    return { success: false, error: JSON.stringify(result.error.format(), null, 2) }
  }

  try {
    const updatedProject = await db.update(projects)
      .set({
        name: result.data.name,
        //@ts-ignore
        status: result.data.status as any,
        startDate: result.data.startDate,
        endDate: result.data.endDate,
        image: result.data.image,
      })
      .where(eq(projects.id, id))
      .returning()

    if (updatedProject.length === 0) {
      return { success: false, error: "Güncellenecek proje bulunamadı." }
    }

    console.log("Updated project:", updatedProject[0]);
    return { success: true, data: updatedProject[0] }
  } catch (error) {
    console.error("Proje güncelleme hatası:", error)
    return { success: false, error: "Proje güncellenirken bir hata oluştu: " + (error as Error).message }
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

    return { success: true, data: deletedProject[0] }
  } catch (error) {
    console.error("Proje silme hatası:", error)
    return { success: false, error: "Proje silinirken bir hata oluştu." }
  }
}