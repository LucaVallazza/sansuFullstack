import { UserInterface, CreateUserRequest } from "@/lib/types";
import { NextResponse } from "next/server";
import prisma from "@/app/db";

export async function POST(req: Request) {
  try {
    // Extract the body
    const body: CreateUserRequest = await req.json();
    console.log(body);
    console.log(`${body.userName}: Knock knock!`);

    //Handle User POST
    const user: any = await prisma.users.findFirst({
      where: { name: body.userName.toLowerCase() },
    });

    if (!user) {
      console.log(`There is no ${body.userName} here... Let me see your ID!`);

      // Creamos un usuario desde cero
      const newUser: UserInterface = {
        name: body.userName.toLowerCase(),
        votes: [],
        hasShown: false,
      };

      // Lo mandamos a la DB
      await prisma.users.create({ data: newUser });

      console.log(`You have been registered!`);

      return NextResponse.json({message: 'Usuario encontrado', routeTo:'/vote' ,status: 201});
    } else {

      console.log(`There is an user!`);
      console.log(user);

      //Return status 200
      if(user.hasShown){
        return NextResponse.json({message: 'Usuario encontrado',routeTo:'/game', userName: user.name, status: 201});
      }else{
        return NextResponse.json({message: 'Usuario encontrado', routeTo:'/vote' ,status: 201});
      }
    }
  } catch (e) {
    console.log(e);
    return new NextResponse("El post ha fracasau", { status: 500 });
  }
}

export async function OPTIONS(req: any) {
  return new NextResponse("ok", { status: 200 });
}
