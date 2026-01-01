import { NextRequest } from "next/server"
import { prisma } from "./prisma"

export async function createLog(
  userId: string | null,
  action: string,
  details: any,
  request?: NextRequest
) {
  try {
    const ipAddress = request?.headers.get("x-forwarded-for") || 
                     request?.headers.get("x-real-ip") || 
                     "unknown"
    const userAgent = request?.headers.get("user-agent") || "unknown"

    await prisma.log.create({
      data: {
        userId,
        action,
        details: details ? JSON.stringify(details) : null,
        ipAddress: Array.isArray(ipAddress) ? ipAddress[0] : ipAddress,
        userAgent,
      },
    })
  } catch (error) {
    console.error("Error creating log:", error)
  }
}

export async function cleanupOldLogs() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  try {
    await prisma.log.deleteMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    })
  } catch (error) {
    console.error("Error cleaning up logs:", error)
  }
}

