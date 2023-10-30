import { IssueStatusBadge, Link } from '@/app/components'
import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client'



type Props = {
  searchParams : {status : Status}
}
const IssuePage = async ({searchParams} : Props) => {

  console.log(Object.values(Status));
  console.log('search params :: ',searchParams.status);
  
  
  
  const statuses = Object.values(Status);
  const status =  statuses.includes(searchParams.status) ? searchParams.status : undefined;
  console.log(status);
  
  const issues = await prisma.issue.findMany({
    where : { status }
  });


  return (

    <div>
      <IssueActions/>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>CreatedAt</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='block md:hidden'><IssueStatusBadge status={issue.status}/></div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status}/></Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export const dynamic = 'force-dynamic';
export default IssuePage