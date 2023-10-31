import prisma from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table, TableBody } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const getFirstLetterOfName = (name: string) => name.charAt(0).toUpperCase();
  return (
    <Card>
        <Heading size='3' mb='-4'>Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id} className="h-2">
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assignedToUserId && (
                    <Avatar size='2' radius="full" src={issue.assignedToUser?.image!}fallback={getFirstLetterOfName(issue.assignedToUser?.name!)}
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
