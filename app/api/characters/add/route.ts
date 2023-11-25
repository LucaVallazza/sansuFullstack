import prisma from "@/app/db"
import { STATUS_CODES } from "http"
import { NextResponse } from "next/server"


export async function  GET(req){
    console.log("GET a /api/characters")
    return new NextResponse("/api/characters", {status : 200})
}

export async function POST(req: Request){
    console.log("POST a /api/characters/add")
    
    // Extract the body
    const body = await req.json();
    console.log(body);


    const description = body.description as string

    const character = await prisma.character.findFirst({where: {description:description}})

    if(character){
        console.log(`Ya existe: ${body.description}!`);
        return new NextResponse("El character ya existe", {status:302})

    }else{
        const addCharacter = {
            description: description
        }
        await prisma.character.create({data: addCharacter})
        console.log(`Se agrego: ${body.description}!`);
        return new NextResponse("Creado!", {status:200})
    }
    
}

export async function OPTIONS (req:any) {
    return new NextResponse("ok" , {status:200})
}