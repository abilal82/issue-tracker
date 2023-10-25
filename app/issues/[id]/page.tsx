import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import Markdown from 'react-markdown'
import React from 'react'


type Props =  {
    params : {id : string}
}


const IssueDetialPage = async ({params}:Props) => {

  await delay(2000);

    
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
        <Card className='prose' mt='4'>
          <Markdown>{issue.description}</Markdown>
        </Card>
    </div>
  )
}

export default IssueDetialPage