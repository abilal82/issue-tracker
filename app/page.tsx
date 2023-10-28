import { PrismaClient } from '@prisma/client';
import Image from 'next/image'

export default function Home() {

  const prisma = new PrismaClient();
  return (
   <main>
    <h2>Hello world</h2>
   </main>
  )
}
