import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { issueSchema } from "../../validationschema";

export async function POST(request : NextRequest) {

    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if(!validation.success)
    return NextResponse.json(validation.error.format(),{status: 400});

    const newIssue = await prisma.issue.create({
        data: {title : body.title, description: body.description, status: 'CLOSED'}
    });

    return NextResponse.json(newIssue, {status: 200});
}

export async function GET(request: NextRequest) {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues);
}















