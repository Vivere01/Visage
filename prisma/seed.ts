import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'
import "dotenv/config"

const prisma = new PrismaClient()

async function main() {
  console.log("Iniciando seed com Prisma 6...")
  
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.barber.upsert({
    where: { email: 'admin@gmail.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'admin@gmail.com',
      name: 'Admin Visage',
      password: hashedPassword,
      shopName: 'Visage Studio',
      slug: 'admin-visage',
    },
  })

  console.log("Usuário administrador configurado:", admin.email)
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
