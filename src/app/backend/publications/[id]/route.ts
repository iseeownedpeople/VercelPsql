import { NextResponse } from "next/server";
import { prisma } from "@/app/libs/prisma"

interface Params {
    params: {id : String}
}

export async function GET(request: Request, {params} : Params) {
    const task = await prisma.publications.findUnique({
        where: {
            id: Number(params.id)
        }
    })
    return NextResponse.json(task)
}


export async function PUT(request: Request, {params} : Params) {
    const data = await request.json()
    const task = await prisma.publications.update({
        where: {
            id: Number(params.id)
        }, 
        data: data
    })
    return NextResponse.json(task)
}
