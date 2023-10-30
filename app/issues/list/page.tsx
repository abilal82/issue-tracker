import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";

type Props = {
  searchParams: { status: Status; orderBy: keyof Issue };
};

const columns: { label: string; value: keyof Issue; classNames?: string }[] = [
  
  { label: "Issue", value: "title", classNames: "" },
  { label: "Status", value: "status", classNames: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", classNames: "hidden md:table-cell" },
];

const IssuePage = async ({ searchParams }: Props) => {

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

    
  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy 
  });

  return (
    <div>
      <IssueActions />
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.classNames}>
                <NextLink  href={{ query: { ...searchParams, orderBy: column.value } }} >
                  {column.label}
                  {(column.value === searchParams.orderBy &&  <ArrowUpIcon className="inline"/>) || <ArrowDownIcon className="inline" />}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuePage;
