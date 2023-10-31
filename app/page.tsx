import { PrismaClient } from '@prisma/client';
import Image from 'next/image'
import Pagination from './components/Pagination';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import prisma from '@/prisma/client';

export default async  function Home() {

  const open = await prisma.issue.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.issue.count({
    where: { status: 'CLOSED' },
  });

  return (
   <main>
      <IssueSummary open={open} inProgress={inProgress} closed={closed}/>
   </main>
  )
}
