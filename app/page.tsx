import { PrismaClient } from '@prisma/client';
import Image from 'next/image'
import Pagination from './components/Pagination';

export default function Home({searchParams} : {searchParams: {page : string}}) {

  const prisma = new PrismaClient();
  return (
   <main>
    <Pagination itemCount={100} currentPage={parseInt(searchParams.page)} pageSize={20}/>
   </main>
  )
}
