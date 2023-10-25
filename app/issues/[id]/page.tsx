import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import { type } from 'os'
import React from 'react'

type Props =  {
    params : {id : string}
}


const IssueDetialPage = async ({params}:Props) => {

  await delay(500);

    
    const issue = await prisma.issue.findUnique({
        where : {id: parseInt(params.id)}
    });

    if(!issue) notFound();

  return (
    <div>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my='2'>
          <IssueStatusBadge status={issue.status}/>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>{issue.description}</Card>
    </div>
  )
}

export default IssueDetialPage