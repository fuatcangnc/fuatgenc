// import type { Config } from "drizzle-kit";

// export default {
//   dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
//   schema: "./lib/schema.ts",
//   out: "./drizzle",
//   dbCredentials: {
//     host: "ep-mute-unit-a2n67yi3-pooler.eu-central-1.aws.neon.tech",
//     port: 5432,
//     user: "default",
//     password: "LrRWOK90dTfu",
//     database: "verceldb",
//     ssl: {
//       rejectUnauthorized: false, // Optionally set to true if you have a trusted SSL certificate
//     },
//   },
// } satisfies Config;


import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: "ep-mute-unit-a2n67yi3-pooler.eu-central-1.aws.neon.tech",
    port: 5432,
    user: "default",
    password: "LrRWOK90dTfu",
    database: "verceldb",
    ssl: {
      rejectUnauthorized: false, // Optionally set to true if you have a trusted SSL certificate
    },
  },
} satisfies Config;
