import { createInitialAdmin } from "../lib/auth"

async function main() {
  await createInitialAdmin()
  console.log("Admin initial créé : Login=Admin, Password=Password")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    const { prisma } = await import("../lib/prisma")
    await prisma.$disconnect()
  })

