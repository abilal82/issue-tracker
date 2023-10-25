import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from "next/link";

type Props = {
  params: { id: string };
};

const IssueDetialPage = async ({ params }: Props) => {
  await delay(2000);

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Grid columns={{ initial: "1", md: "2" }}>
        <Box>
          <Heading>{issue.title}</Heading>
          <Flex gap="3" my="2">
            <IssueStatusBadge status={issue.status} />
            <Text>{issue.createdAt.toDateString()}</Text>
          </Flex>
          <Card className="prose" mt="4">
            <Markdown>{issue.description}</Markdown>
          </Card>
        </Box>
        <Box>
          <Button><Pencil2Icon/> <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link> </Button>
        </Box>
      </Grid>
    </div>
  );
};

export default IssueDetialPage;
