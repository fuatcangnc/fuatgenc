import type { Config } from "drizzle-kit";


export default {
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "123456789",
    database: "personalblog",
  },
}satisfies Config;