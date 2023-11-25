import { UserType } from '@/lib/types';
import prisma from "@/app/db";
import { NextResponse } from "next/server"

export async function GET(req:Request){
    try {
        console.log("GET to /users")

        const users : UserType[] = await prisma.users.findMany()

        console.log(users)

        return NextResponse.json({users: users},{ status: 200});        
    } 
    catch (error) {
        console.log(error)
        return new NextResponse("Algo salio mal...", {status:500})
    }

}

export async function OPTIONS (req:any) {
    return new NextResponse("ok" , {status:200})
}