import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users } from "@/lib/schema";
import { genSaltSync, hashSync } from "bcrypt-ts";

export async function getUserFromDb(email: string, password: string) {
    return await db.select().from(users).where(eq(users.email, email));
}


export async function createUser(email:string,password:string){
    let salt=genSaltSync(10)
    let hash=hashSync(password,salt)

    return await db.insert(users).values({email,password:hash})
}