import { PrismaClient } from '@prisma/client';
import Image from 'next/image'
import Pagination from './components/Pagination';
import LatestIssues from './LatestIssues';

export default function Home() {

  return (
   <main>
      <LatestIssues/>
   </main>
  )
}
