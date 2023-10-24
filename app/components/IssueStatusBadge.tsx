
import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'



const  statusMap : Record<Status, {label: string ,color: "red" | "violet" | "green" }> = {
    OPEN : { label : 'open', color : 'red'},
    IN_PROGRESS : {label : 'In progress', color : 'violet'},
    CLOSED : {label : 'Closed', color : 'green'}
}

const IssueStatusBadge = ({status}: {status : Status}) => {
  return (
    <div>  <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </div>
  )
}

export default IssueStatusBadge