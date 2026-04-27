import { PrismaClient } from '@prisma/client'
import "dotenv/config"
const prisma = new PrismaClient()
async function main() {
  try {
    const count = await prisma.barber.count()
    console.log("Conexão OK! Total de barbeiros:", count)
  } catch (err) {
    console.error("Erro na conexão:", err)
  }
}
main().finally(() => prisma.$disconnect())
