import { PrismaClient } from '@prisma/client';
import Image from 'next/image'
import Pagination from './components/Pagination';

export default function Home() {

  const prisma = new PrismaClient();
  return (
   <main>
    <Pagination itemCount={100} currentPage={5} pageSize={20}/>
   </main>
  )
}
