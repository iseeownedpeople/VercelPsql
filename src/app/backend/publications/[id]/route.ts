import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"

interface Params {
    params: {id : String}
}

export async function GET(request: Request, {params} : Params) {
    const task = await prisma.publications.findUnique({
        where: {
            id: params.id as string
        }
    })
    return NextResponse.json(task)
}


export async function PUT(request: Request, {params} : Params) {
    const data = await request.json()
    const task = await prisma.publications.update({
        where: {
            id: (params.id) as string
        }, 
        data: data
    })
    return NextResponse.json(task)
}
