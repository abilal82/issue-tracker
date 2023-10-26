import prisma from '@/prisma/client'

import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import IssueFormSkeleton from './loading'



type Props = {
    params : {id: string}
}

const IssueForm = dynamic(
  () => import('@/app/issues/_components/IssueForm'),
  {
    ssr : false,
    loading : () => <IssueFormSkeleton/>
  })
const EditIssueForm = async ({params}: Props) => {

    const issue  =  await prisma.issue.findUnique({
        where: {id : parseInt(params.id)}
    });
    console.log("issue",issue);
    
    if(!issue) notFound();

  return (
    <div>
        <IssueForm issue={issue}/>
    </div>
  )
}

export default EditIssueForm