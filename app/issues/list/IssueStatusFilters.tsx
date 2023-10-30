'use client'
import { Status } from '@prisma/client';
import * as Label from '@radix-ui/react-label';
import { Select } from '@radix-ui/themes';
import React from 'react'


const statuses : {label : String, value ?: Status}[] =  [
    {label : "All"},
    {label : "In Progress", value : 'IN_PROGRESS'},
    {label : "Open", value : 'OPEN'},
    {label : "Closed", value : 'CLOSED'},
];
const IssueStatusFilters = () => {
  return (
    <>
         
      <Select.Root defaultValue='' >
       
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