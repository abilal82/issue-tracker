import { patchIssueSchema } from "@/app/validationschema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  

    const body = await request.json();
    const validatedResult = patchIssueSchema.safeParse(body);

    if (!validatedResult.success)
        return NextResponse.json(validatedResult.error.format(), { status: 400 });

    const { assignedToUserId, title, description } = body;

    if (assignedToUserId) {
        const user = await prisma.user.findUnique({ where : {id : assignedToUserId}})
        if(!user) return NextResponse.json('Invalid user', {status : 400})
    }

    const issue = await prisma.issue.findUnique({where: { id: parseInt(params.id) }});

    if (!issue) return NextResponse.json({ error: "Invalid Issue." });

    const updatedIsuue = await prisma.issue
    .update({where: { id: issue.id },data: { title, description,assignedToUserId}});

    return NextResponse.json(updatedIsuue, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // await delay(3000);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return NextResponse.json({ error: "Invalid Issue." });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
