import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilters from './IssueStatusFilters'

const IssueActions = () => {
  return (
    <Flex justify='between' className='mb-5'>
        <IssueStatusFilters/>
        <Button><Link href='/issues/new'>Submit New Issue</Link></Button>
    </Flex>
  )
}

export default IssueActions