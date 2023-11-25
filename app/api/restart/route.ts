import prisma from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await prisma.users.deleteMany()
        await prisma.character.deleteMany()
    
        return new NextResponse('Reseteado', {status:200})

    }catch(e){
        
        return new NextResponse('Something went wrong...', {status:500})
    }
}