import { IssueStatusBadge , Link} from "@/app/components";
import { Status, Issue } from "@prisma/client";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";


export interface IssueQuery {
    status: Status;
    orderBy: keyof Issue;
    page : string;
}

interface Props  {
    searchParams: IssueQuery;
    issues : Issue[];
};
const IssueTable = ({searchParams , issues}: Props) => {
   
      
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.classNames}>
              <NextLink
                href={{ query: { ...searchParams, orderBy: column.value } }}>
                {column.label}
                {(column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )) || <ArrowDownIcon className="inline" />}
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
  );
};

const columns: { label: string; value: keyof Issue; classNames?: string }[] = [
  
    { label: "Issue", value: "title", classNames: "" },
    { label: "Status", value: "status", classNames: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", classNames: "hidden md:table-cell" },
];

export const columnNames = columns.map(column => column.value);
export default IssueTable;
