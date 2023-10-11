import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"

export async function GET() {
  try {  
    const notes = await prisma.publications.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newNote = await prisma.publications.create({
      data: data
    });

    return NextResponse.json(newNote);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}