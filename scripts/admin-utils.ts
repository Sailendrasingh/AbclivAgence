import "dotenv/config";
import { PrismaClient, User } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getAdminOrNull(): Promise<User | null> {
  return prisma.user.findUnique({ where: { login: "Admin" } });
}

export function printAdminMissingHint(): void {
  console.log("❌ L'utilisateur Admin n'existe pas");
  console.log('💡 Utilisez "npm run restore:admin" pour créer l\'utilisateur Admin');
}

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}
