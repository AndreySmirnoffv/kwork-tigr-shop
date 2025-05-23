// import { TypeUser } from "#types/type.user";
// import { prisma } from "@services/prisma.service";

import { TypeUser } from "#types/type.user";
import { prisma } from "@services/prisma.service";

// export async function findUserByIdentifier(
//   key: 'email' | 'phone' | 'userId',
//   value: string
// ): Promise<TypeUser | null> {
//   // Формируем whereClause с учетом передаваемого ключа
//   const whereClause: { email?: string; phone?: string; userId?: string } = {};
//   if (key === 'email') {
//     whereClause.email = value;
//   } else if (key === 'phone') {
//     whereClause.phone = value;
//   } else if (key === 'userId') {
//     whereClause.userId = value;
//   }

//   try {
//     // Используем findUnique для поиска по уникальному полю
//     const user = await prisma.user.findFirst({
//       where: whereClause,
//     });

//     // Если пользователь не найден, возвращаем null
//     if (!user) {
//       return null;
//     }

//     // Проверяем обязательные поля
//     if (!user.email || !user.userId || !user.password || !user.phone) {
//       throw new Error('Обязательные поля отсутствуют у пользователя');
//     }

//     // Формируем полное имя, учитывая возможные null значения
//     const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();

//     // Возвращаем пользователя с обработанным полным именем
//     return {
//       email: user.email,
//       phone: user.phone,
//       userId: user.userId,
//       password: user.password,
//       fullName: fullName || 'Без имени', // Если fullName пустое, возвращаем 'Без имени'
//     };
//   } catch (error) {
//     // Логируем ошибку для диагностики
//     console.error("Error during user lookup:", error);

//     // Пробрасываем ошибку дальше
//     throw new Error("Ошибка при поиске пользователя.");
//   }
// }

// export async function createUser(UserData: TypeUser) {
//   console.log('Upsert Data:', UserData);

//   return await prisma.user.upsert({
//     where: { email: UserData.email },
//     update: {
//       phone: UserData.phone,
//       password: UserData.password,
//       firstName: UserData.firstName,
//       lastName: UserData.lastName,
//     },
//     create: {
//       email: UserData.email,
//       phone: UserData.phone,
//       userId: UserData.userId,
//       password: UserData.password,
//       firstName: UserData.firstName,
//       lastName: UserData.lastName,
//     },
//   });
// }


// export async function findUserById(userId: string){
//   return await prisma.user.findFirst({
//     where: { userId }
//   })
// }

export async function findUserByEmail(email: string): Promise<TypeUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      email: true,
      phone: true,
      userId: true,
      password: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!user) return null;

  return {
    email: user.email,
    phone: user.phone,
    userId: user.userId,
    password: user.password,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || undefined,
  };
}

export async function findUserByPhone(phone: string): Promise<TypeUser | null> {
  const user = await prisma.user.findUnique({
    where: { phone },
    select: {
      email: true,
      phone: true,
      userId: true,
      password: true,
      firstName: true,
      lastName: true,
    },
  });

  if (!user) return null;

  return {
    email: user.email,
    phone: user.phone,
    userId: user.userId,
    password: user.password,
    firstName: user.firstName ?? undefined,
    lastName: user.lastName ?? undefined,
    fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || undefined,
  };
}

export async function findUserByUserId(userId: string): Promise<TypeUser | null> {
    const user = await prisma.user.findUnique({
        where: { userId },
        select: {
            email: true,
            phone: true,
            userId: true,
            password: true,
            firstName: true,
            lastName: true,
        },
    });

    if (!user) return null;

    console.log("DB user raw:", user);

    return {
        email: user.email ?? null,
        phone: user.phone ?? null,
        userId: user.userId,
        password: user.password ?? null,
        firstName: user.firstName ?? undefined,
        lastName: user.lastName ?? undefined,
        fullName: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || undefined,
    };
}

export async function createUser(userData: TypeUser) {
  console.log('Upsert Data:', userData);

  return await prisma.user.create({
    data: userData,
  });
}

export async function updateUserModel(userData: Partial<TypeUser>){
  return await prisma.user.update({
    where: { userId: userData.userId },
    data: userData
  })
}