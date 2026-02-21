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

describe('POST /api/contacts', () => {
  let agency: any
  let user: any

  beforeEach(async () => {
    // Nettoyer d'abord
    await prisma.contact.deleteMany()
    await prisma.agency.deleteMany()
    await prisma.user.deleteMany()
    jest.clearAllMocks()

    // Créer un utilisateur et une agence de test avec un login unique
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

    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(401)
  })

  it('should create contact with valid data', async () => {
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

    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
        postNumber: '123456',
        agentNumber: '1234',
        directLine: '0123456789',
        emails: ['john.doe@example.com'],
        note: 'Note de test',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.managerName).toBe('John Doe')
    expect(data.postNumber).toBe('123456')
    expect(data.agentNumber).toBe('1234')
    expect(data.directLine).toBe('01 23 45 67 89') // Normalisé avec espaces
    expect(data.order).toBe(0) // Premier contact

    // Vérifier en base
    const contact = await prisma.contact.findUnique({
      where: { id: data.id },
    })
    expect(contact).toBeDefined()
    expect(contact?.managerName).toBe('John Doe')
  })

  it('should reject creation if agencyId is missing', async () => {
    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        managerName: 'John Doe',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Invalid input')
  })

  it('should reject creation if managerName is missing', async () => {
    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })

  it('should reject invalid postNumber (not 6 digits)', async () => {
    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
        postNumber: '12345', // 5 chiffres au lieu de 6
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('6 chiffres')
  })

  it('should reject invalid agentNumber (not 4 digits)', async () => {
    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
        agentNumber: '123', // 3 chiffres au lieu de 4
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('4 chiffres')
  })

  it('should reject invalid directLine (not 10 digits)', async () => {
    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
        directLine: '012345678', // 9 chiffres au lieu de 10
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('10 chiffres')
  })

  it('should accept directLine with spaces', async () => {
    // Utiliser l'agence créée dans beforeEach
    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
        directLine: '01 23 45 67 89',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.directLine).toBe('01 23 45 67 89')
  })

  it('should reject invalid email', async () => {
    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
        emails: ['invalid-email'],
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Email invalide')
  })

  it('should reject emails if not an array', async () => {
    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
        emails: 'not-an-array',
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Invalid input')
  })

  it('should accept multiple valid emails', async () => {
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

    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
        emails: ['john.doe@example.com', 'john.doe2@example.com'],
      }),
    })

    const response = await POST(request)
    expect(response.status).toBe(201)
  })

  it('should assign correct order to multiple contacts', async () => {
    // Créer le premier contact
    const request1 = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'Contact 1',
      }),
    })
    const response1 = await POST(request1)
    const data1 = await response1.json()
    expect(data1.order).toBe(0)

    // Créer le deuxième contact
    const request2 = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'Contact 2',
      }),
    })
    const response2 = await POST(request2)
    const data2 = await response2.json()
    expect(data2.order).toBe(1)
  })

  it('should create contact with minimal required fields', async () => {
    const request = new NextRequest('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agencyId: agency.id,
        managerName: 'John Doe',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.managerName).toBe('John Doe')
    expect(data.postNumber).toBe('')
    expect(data.agentNumber).toBe('')
    expect(data.directLine).toBe('')
    expect(data.emails).toBe('[]')
  })
})

