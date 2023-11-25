import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    console.log("GET a /api/characters");

    const characters = await prisma.character.findMany();
    console.log(characters);

    return NextResponse.json({characters: characters}, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

export async function OPTIONS(req: any) {
  return new NextResponse("ok", { status: 200 });
}
