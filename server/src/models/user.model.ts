import { TypeUser } from "#types/type.user";
import { prisma } from "@services/prisma.service";

export async function findUserByIdentifier(
  key: 'email' | 'phone' | 'userId',
  value: string
): Promise<TypeUser | null> {
  const whereClause =
    key === 'email'
      ? { email: value }
      : key === 'phone'
      ? { phone: value }
      : { userId: value };

  const user = await prisma.user.findFirst({
    where: whereClause,
  });

  if (!user) return null;

  if (!user.email || !user.userId || !user.password || !user.phone) {
    throw new Error('Обязательные поля отсутствуют у пользователя');
  }

  // Обработка возможных null для firstName и lastName
  const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

  return {
    email: user.email,
    phone: user.phone,
    userId: user.userId,
    password: user.password,
    fullName: fullName || 'Без имени', // Если fullName пустой, поставим 'Без имени'
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