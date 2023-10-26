import { issueSchema } from "@/app/validationschema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";




export async function PATCH(request : NextRequest, {params} : {params : {id : string}}) {

    
    const body = await request.json();
    console.log(body);
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



export async function DELETE(request : NextRequest, {params} : {params : {id : string}}) {
    
    const issue = await prisma.issue.findUnique({
        where : { id: parseInt(params.id)}
    });
    if(!issue) return NextResponse.json({error: 'Invalid Issue.'});

    await prisma.issue.delete({
        where : {id : issue.id}
    })

    return NextResponse.json({})
    
}