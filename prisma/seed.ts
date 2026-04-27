import { PrismaClient } from '@prisma/client'
import * as bcryptjs from 'bcryptjs'
import "dotenv/config"

async function main() {
  // Inicialização forçada com a URL do env
  const prisma = new PrismaClient()
  
  console.log("Iniciando seed...")
  
  const hashedPassword = await bcryptjs.hash('admin123', 10)
  
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

  console.log("Usuário administrador criado/atualizado:", admin.email)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error("Erro no seed:", e)
  process.exit(1)
})
