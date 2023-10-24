import prisma from '@/prisma/client'
import delay from 'delay'
import { notFound } from 'next/navigation'
import { type } from 'os'
import React from 'react'

type Props =  {
    params : {id : string}
}


const IssueDetialPage = async ({params}:Props) => {

  await delay(1000);

    
    const issue = await prisma.issue.findUnique({
        where : {id: parseInt(params.id)}
    });

    if(!issue) notFound();

  return (
    <div>
        <p>{issue.title}</p>
        <p>{issue.description}</p>
        <p>{issue.createdAt.toDateString()}</p>
    </div>
  )
}

export default IssueDetialPage