import { TypeUser } from "#types/type.user";
import { prisma } from "@services/prisma.service";


export async function findUserByIdentifier(
  key: 'email' | 'phone' | "userId",
  value: string
): Promise<TypeUser | null> {
  const user = await prisma.user.findUnique({
    where:
      key === 'email'
        ? { email: value }
        : { phone: value },
  });

  if (!user) return null;

  if (!user.userId) {
    throw new Error('User does not have a userId');
  }

  return {
    email: user.email,
    phone: user.phone,
    userId: user.userId,
    password: user.password,
  };
}
export async function createOrUpdateUser(UserData: TypeUser){
  return await prisma.user.upsert({
    where: { email: UserData.email },
    update: UserData,
    create: UserData
  });
  
}

export async function findUserById(userId: string){
  return await prisma.user.findFirst({
    where: { userId }
  })
}