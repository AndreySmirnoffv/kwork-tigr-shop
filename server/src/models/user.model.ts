import { TypeUser } from "#types/TypeUser";
import { prisma } from "@services/prisma.service";


export async function findUserByEmailOrPhone(identifier: string) {
    const userByEmail = await prisma.user.findUnique({
      where: { email: identifier },
    });
  
    if (userByEmail) return userByEmail;
  
    return await prisma.user.findUnique({
      where: { phone: identifier },
    });
  }
  

export async function createOrUpdateUser(UserData: TypeUser){
    return await prisma.user.upsert({
        where: { email: UserData.email },
        update: UserData,
        create: UserData
    })
}