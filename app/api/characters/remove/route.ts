import prisma from "@/app/db"
import { STATUS_CODES } from "http"
import { NextResponse } from "next/server"



export async function POST(req: Request){
    console.log("POST a /api/characters/remove")
    
    // Extract the body
    const body = await req.json();
    console.log(body);


    const description = body.description as string

    const character = await prisma.character.findFirst({where: {description:description}})

    if(character){
        console.log(`Borrando: ${body.description}!...`);
        
        await prisma.character.deleteMany({where: {description:description}})

        return new NextResponse("El character ya existe", {status:302})

    }else{
        console.log(`No se puede borrar pq no existe: ${body.description}!`);
        return new NextResponse("No existe", {status:200})
    }
    
}

export async function OPTIONS (req:any) {
    return new NextResponse("ok" , {status:200})
}