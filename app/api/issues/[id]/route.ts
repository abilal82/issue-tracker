import { issueSchema } from "@/app/validationschema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";




export async function PATCH(request : NextRequest, {params} : {params : {id : string}}) {

    const body = await request.json();
    const validatedResult = issueSchema.safeParse(body);
    if(!validatedResult.success) 
       return NextResponse.json(validatedResult.error.format(),{status : 400});
     
    const issue = await prisma.issue.findUnique({
        where : { id: parseInt(params.id)}
    });
    
    if(!issue) return NextResponse.json({error: 'Invalid Issue.'});

    const updatedIsuue = await prisma.issue.update({
        where: {id : issue.id},
        data : {
            title : validatedResult.data.title,
            description : validatedResult.data.description
        }
    });

    return NextResponse.json(updatedIsuue,{status : 201})


}