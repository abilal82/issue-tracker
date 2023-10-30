'use client'
import { Status } from '@prisma/client';
import * as Label from '@radix-ui/react-label';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'


const statuses : {label : String, value ?: Status}[] =  [
    {label : "All"},
    {label : "In Progress", value : 'IN_PROGRESS'},
    {label : "Closed", value : 'CLOSED'},
    {label : "Open", value : 'OPEN'}
];
const IssueStatusFilters = () => {

    const router = useRouter();
    const searchParams = useSearchParams();

  return (
    <>     
      <Select.Root defaultValue='' onValueChange={(status) => {

        const params = new URLSearchParams();

        if(status) params.append('status',status);

        if(searchParams.get('orderBy')) 
          params.append('orderBy',searchParams.get('orderBy')!);

        const query = params.size ? '?' + params.toString() : '';

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