import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";



// if we don't declare parameters then nextjs will cache the output of this GET endpoint. So, To prevent it from chaching 
// the output, parameters are being decalred.

export async function GET(request: NextRequest) {
    const users = await prisma.user.findMany({orderBy : {name : 'asc' }});
    return NextResponse.json(users);
}