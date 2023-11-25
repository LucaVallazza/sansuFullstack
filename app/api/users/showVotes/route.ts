import { UserInterface, CreateUserRequest } from "@/lib/types";
import { NextResponse } from "next/server";
import prisma from "@/app/db";
import { UserType } from "@/lib/types";

export async function PUT(req: Request) {
  try {
    console.log("PUT a /user/showVotes");
    // Extract the body
    const body: UserType = await req.json();
    console.log(`${body.name}: Quiero actualizar mis votos`);

    //Handle User POST
    const user: any = await prisma.users.findUnique({
      where: { name: body.name },
    });

    if (user) {
      await prisma.users.update({ data: body, where: { name: body.name } });
      console.log(`Actualizados votos de ${user.name}`);
      return new NextResponse("Actualizado", { status: 200 });
    }
  } catch (e) {
    console.log(e);
    return new NextResponse("El post ha fracasau", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log("POST a /user/showVotes");
    // Extract the body
    const body: UserType = await req.json();
    console.log(`${body.name}: Quiero mostrarme!`);

    //Handle User POST
    const user: any = await prisma.users.findUnique({
      where: { name: body.name },
    });

    if (user) {
      await prisma.users.update({
        data: { hasShown: true },
        where: { name: body.name },
      });
      console.log(`Actualizado hasShown de ${user.name}`);
      return new NextResponse("Actualizado", { status: 200 });
    }
  } catch (e) {
    console.log(e);
    return new NextResponse("El post ha fracasau", { status: 500 });
  }
}

export async function GET(){
    console.log("GET a users/showVotes")
    const users = await prisma.users.findMany({where: {hasShown:true}})
    console.log(users)

    if(users)
        return NextResponse.json({users: users}, {status:200})
    else
        return new NextResponse("No encontrado", {status: 302})


}

export async function OPTIONS(req: any) {
  return new NextResponse("ok", { status: 200 });
}
