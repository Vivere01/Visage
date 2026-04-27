import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

import "dotenv/config"
const prisma = new PrismaClient()

async function main() {
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

  console.log({ admin })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
