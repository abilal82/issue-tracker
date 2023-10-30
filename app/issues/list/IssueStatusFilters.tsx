'use client'
import { Status } from '@prisma/client';
import * as Label from '@radix-ui/react-label';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React from 'react'


const statuses : {label : String, value ?: Status}[] =  [
    {label : "All"},
    {label : "In Progress", value : 'IN_PROGRESS'},
    {label : "Closed", value : 'CLOSED'},
    {label : "Open", value : 'OPEN'}
];
const IssueStatusFilters = () => {
    const router = useRouter();
  return (
    <>     
      <Select.Root defaultValue='' onValueChange={(status) => {
        const query = status ? `?status=${status}`: '';
        router.push(`/issues/list${query}`);
      }}>
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
            {statuses?.map(status => (
              <Select.Item key={status.value} value={status.value || ''}>
                {status.label}
              </Select.Item>
            ))}
        </Select.Content>
      </Select.Root>
    </>
    
    
  )
}

export default IssueStatusFilters