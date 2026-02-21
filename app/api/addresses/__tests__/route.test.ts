import { POST } from '../route'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

// Mock de la validation CSRF
jest.mock('@/lib/csrf-middleware', () => ({
  requireCSRF: jest.fn(() => Promise.resolve(null)),
}));

// Mock des logs
jest.mock('@/lib/logs', () => ({
  createLog: jest.fn(),
}))

// Mock de getSession
const mockGetSession = jest.fn()
jest.mock('@/lib/session', () => ({
  getSession: () => mockGetSession(),
}))

describe('POST /api/addresses', () => {
  let agency: any
  let user: any

  beforeEach(async () => {
    // Nettoyer d'abord
    await prisma.address.deleteMany()
    await prisma.agency.deleteMany()
    await prisma.user.deleteMany()
    jest.clearAllMocks()

    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`
    const passwordHash = await hashPassword('password123')
    user = await prisma.user.create({
      data: {
        login: `testuser-${uniqueId}`,
        passwordHash,
        role: 'User',
        active: true,
      },
    })

    agency = await prisma.agency.create({
      data: {
        name: 'Agence Test',
        state: 'OK',
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })
  })

  it('should return 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        label: 'Adresse principale',
        street: '123 Rue de la Test',
        city: 'Paris',
        postalCode: '75001',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(401)
  })

  it('should create address with valid data', async () => {
    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        label: 'Adresse principale',
        street: '123 Rue de la Test',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
        latitude: 48.8566,
        longitude: 2.3522,
        banId: 'ban-id-123',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.label).toBe('Adresse principale')
    expect(data.street).toBe('123 Rue de la Test')
    expect(data.city).toBe('Paris')
    expect(data.postalCode).toBe('75001')
    expect(data.country).toBe('France')
    expect(data.latitude).toBe(48.8566)
    expect(data.longitude).toBe(2.3522)
    expect(data.banId).toBe('ban-id-123')

    // Vérifier en base
    const address = await prisma.address.findUnique({
      where: { id: data.id },
    })
    expect(address).toBeDefined()
    expect(address?.label).toBe('Adresse principale')
  })

  it('should reject creation if agencyId is missing', async () => {
    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: 'Adresse principale',
        street: '123 Rue de la Test',
        city: 'Paris',
        postalCode: '75001',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Invalid input')
  })

  it('should reject creation if label is missing', async () => {
    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        street: '123 Rue de la Test',
        city: 'Paris',
        postalCode: '75001',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('should reject creation if street is missing', async () => {
    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        label: 'Adresse principale',
        city: 'Paris',
        postalCode: '75001',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('should reject creation if city is missing', async () => {
    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        label: 'Adresse principale',
        street: '123 Rue de la Test',
        postalCode: '75001',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('should reject creation if postalCode is missing', async () => {
    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        label: 'Adresse principale',
        street: '123 Rue de la Test',
        city: 'Paris',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('should use default country "France" if not provided', async () => {
    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        label: 'Adresse principale',
        street: '123 Rue de la Test',
        city: 'Paris',
        postalCode: '75001',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.country).toBe('France')
  })

  it('should create address without coordinates', async () => {
    // Vérifier que l'agence existe
    const existingAgency = await prisma.agency.findUnique({
      where: { id: agency.id },
    })
    if (!existingAgency) {
      // Recréer l'agence si elle n'existe plus
      agency = await prisma.agency.create({
        data: {
          name: 'Agence Test',
          state: 'OK',
        },
      })
    }

    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        label: 'Adresse manuelle',
        street: '123 Rue de la Test',
        city: 'Paris',
        postalCode: '75001',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.latitude).toBeNull()
    expect(data.longitude).toBeNull()
  })

  it('should create address without banId', async () => {
    const request = new NextRequest('http://localhost/api/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        label: 'Adresse manuelle',
        street: '123 Rue de la Test',
        city: 'Paris',
        postalCode: '75001',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.banId).toBeNull()
  })
})

