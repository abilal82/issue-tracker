import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
          <IssueDetails issue={issue}/>
        </Box>
        <Box>
          <EditIssueButton issueId={issue.id}/>
        </Box>
      </Grid>
    </div>
  );
};

export default IssueDetialPage;
