import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { createLog } from "@/lib/logs"

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""
  const filter = searchParams.get("filter") || "ALL"

  try {
    const where: any = {}

    if (filter !== "ALL") {
      where.state = filter
    }

    if (search) {
      // Recherche sur TOUS les champs selon PRD
      where.OR = [
        { name: { contains: search } },
        { codeAgence: { contains: search } },
        { codeRayon: { contains: search } },
        {
          addresses: {
            some: {
              OR: [
                { label: { contains: search } },
                { street: { contains: search } },
                { city: { contains: search } },
                { postalCode: { contains: search } },
              ],
            },
          },
        },
        {
          contacts: {
            some: {
              OR: [
                { managerName: { contains: search } },
                { postNumber: { contains: search } },
                { agentNumber: { contains: search } },
                { directLine: { contains: search } },
                { emails: { contains: search } },
                { note: { contains: search } },
              ],
            },
          },
        },
        {
          technical: {
            OR: [
              { networkIp: { contains: search } },
              { technicalNotes: { contains: search } },
              { machineBrand: { contains: search } },
              { machineModel: { contains: search } },
              { machineIp: { contains: search } },
              { machineMac: { contains: search } },
              { wifiRouterBrand: { contains: search } },
              { wifiRouterModel: { contains: search } },
              { wifiRouterIp: { contains: search } },
              { wifiRouterSerial: { contains: search } },
              { mainRouterBrand: { contains: search } },
              { mainRouterModel: { contains: search } },
              { mainRouterIp: { contains: search } },
              { mainRouterSerial: { contains: search } },
              { mainRouterLinkType: { contains: search } },
              { backupRouterBrand: { contains: search } },
              { backupRouterModel: { contains: search } },
              { backupRouterIp: { contains: search } },
              { backupRouterSerial: { contains: search } },
              { recorderBrand: { contains: search } },
              { recorderModel: { contains: search } },
              { recorderSerial: { contains: search } },
              { recorderMac: { contains: search } },
              { recorderIp: { contains: search } },
              { recorderStorage: { contains: search } },
              // Recherche sur PC
              {
                pcs: {
                  some: {
                    OR: [
                      { name: { contains: search } },
                      { ip: { contains: search } },
                      { mac: { contains: search } },
                      { serialNumber: { contains: search } },
                      { brand: { contains: search } },
                      { model: { contains: search } },
                    ],
                  },
                },
              },
              // Recherche sur imprimantes
              {
                printers: {
                  some: {
                    OR: [
                      { name: { contains: search } },
                      { ip: { contains: search } },
                      { mac: { contains: search } },
                      { serialNumber: { contains: search } },
                      { brand: { contains: search } },
                      { model: { contains: search } },
                    ],
                  },
                },
              },
              // Recherche sur caméras
              {
                cameras: {
                  some: {
                    OR: [
                      { brand: { contains: search } },
                      { model: { contains: search } },
                      { type: { contains: search } },
                      { ip: { contains: search } },
                    ],
                  },
                },
              },
              // Recherche sur points d'accès WiFi
              {
                wifiAccessPoints: {
                  some: {
                    OR: [
                      { ssid: { contains: search } },
                      { brand: { contains: search } },
                      { model: { contains: search } },
                      { ip: { contains: search } },
                      { serialNumber: { contains: search } },
                    ],
                  },
                },
              },
              // Recherche sur champs dynamiques
              {
                dynamicFields: {
                  some: {
                    OR: [
                      { key: { contains: search } },
                      { value: { contains: search } },
                    ],
                  },
                },
              },
            ],
          },
        },
        // Recherche sur photos (titre et type)
        {
          photos: {
            some: {
              OR: [
                { type: { contains: search } },
                { title: { contains: search } },
              ],
            },
          },
        },
      ]
    }

    const agencies = await prisma.agency.findMany({
      where,
      orderBy: { name: "asc" },
      take: 100, // Limite raisonnable
    })

    return NextResponse.json(agencies)
  } catch (error) {
    console.error("Error fetching agencies:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, photo, state, codeAgence, codeRayon, dateOuverture, dateFermeture, validatedAt } = body

    if (!name) {
      return NextResponse.json(
        { error: "Le nom de l'agence est obligatoire" },
        { status: 400 }
      )
    }

    const agency = await prisma.agency.create({
      data: {
        name,
        photo: photo || null,
        state: state || "ALERTE", // Valeur par défaut selon PRD
        codeAgence: codeAgence || null,
        codeRayon: codeRayon || null,
        dateOuverture: dateOuverture ? new Date(dateOuverture) : null,
        dateFermeture: dateFermeture ? new Date(dateFermeture) : null,
        validatedAt: validatedAt ? new Date(validatedAt) : null,
      },
    })

    await createLog(session.id, "AGENCE_CREEE", {
      agencyId: agency.id,
      agencyName: name,
    }, request)

    return NextResponse.json(agency, { status: 201 })
  } catch (error) {
    console.error("Error creating agency:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
