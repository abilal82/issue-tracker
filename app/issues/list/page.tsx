import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

type Props = {
  searchParams: IssueQuery;
};



const IssuePage = async ({ searchParams }: Props) => {

  // const statuses = Object.values(Status);
  const status = Object.values(Status).includes(searchParams.status) ? searchParams.status : undefined;

    
  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" }: undefined;
  
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const issueCount = await prisma.issue.count({ where : {status : status}})


  return (
    <Flex direction='column' gap='2'>
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues}/>
      <Flex justify="center">
        <Pagination currentPage={page} itemCount={issueCount} pageSize={pageSize} />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";
export default IssuePage;
