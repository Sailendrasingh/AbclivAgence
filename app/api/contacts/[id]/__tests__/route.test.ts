import { PUT, DELETE } from '../route'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

// Mock des logs
jest.mock('@/lib/logs', () => ({
  createLog: jest.fn(),
}))

// Mock de getSession
const mockGetSession = jest.fn()
jest.mock('@/lib/session', () => ({
  getSession: () => mockGetSession(),
}))

describe('PUT /api/contacts/[id]', () => {
  let agency: any
  let contact: any
  let user: any

  beforeEach(async () => {
    // Nettoyer d'abord
    await prisma.contact.deleteMany()
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

    contact = await prisma.contact.create({
      data: {
        agencyId: agency.id,
        managerName: 'John Doe',
        postNumber: '123456',
        agentNumber: '1234',
        directLine: '01 23 45 67 89',
        emails: JSON.stringify(['john.doe@example.com']),
        order: 0,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })
  })

  it('should return 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/contacts/test-id', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        managerName: 'Jane Doe',
      }),
    })

    const response = await PUT(request, { params: { id: 'test-id' } })
    expect(response.status).toBe(401)
  })

  it('should update contact with valid data', async () => {
    const request = new NextRequest(`http://localhost/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        managerName: 'Jane Doe',
        postNumber: '654321',
        agentNumber: '4321',
        directLine: '0987654321',
        emails: ['jane.doe@example.com'],
      }),
    })

    const response = await PUT(request, { params: { id: contact.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.managerName).toBe('Jane Doe')
    expect(data.postNumber).toBe('654321')
    expect(data.agentNumber).toBe('4321')
    expect(data.directLine).toBe('09 87 65 43 21')

    // Vérifier en base
    const updatedContact = await prisma.contact.findUnique({
      where: { id: contact.id },
    })
    expect(updatedContact?.managerName).toBe('Jane Doe')
  })

  it('should reject invalid postNumber', async () => {
    const request = new NextRequest(`http://localhost/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postNumber: '12345', // 5 chiffres
      }),
    })

    const response = await PUT(request, { params: { id: contact.id } })
    expect(response.status).toBe(400)
  })

  it('should reject invalid agentNumber', async () => {
    const request = new NextRequest(`http://localhost/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agentNumber: '123', // 3 chiffres
      }),
    })

    const response = await PUT(request, { params: { id: contact.id } })
    expect(response.status).toBe(400)
  })

  it('should reject invalid directLine', async () => {
    const request = new NextRequest(`http://localhost/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        directLine: '012345678', // 9 chiffres
      }),
    })

    const response = await PUT(request, { params: { id: contact.id } })
    expect(response.status).toBe(400)
  })

  it('should reject invalid email', async () => {
    const request = new NextRequest(`http://localhost/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emails: ['invalid-email'],
      }),
    })

    const response = await PUT(request, { params: { id: contact.id } })
    expect(response.status).toBe(400)
  })

  it('should update order', async () => {
    // Créer un deuxième contact
    const contact2 = await prisma.contact.create({
      data: {
        agencyId: agency.id,
        managerName: 'Contact 2',
        postNumber: '654321',
        agentNumber: '4321',
        directLine: '',
        emails: '[]',
        order: 1,
      },
    })

    const request = new NextRequest(`http://localhost/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: 2,
      }),
    })

    const response = await PUT(request, { params: { id: contact.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.order).toBe(2)
  })

  it('should allow clearing optional fields', async () => {
    const request = new NextRequest(`http://localhost/api/contacts/${contact.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postNumber: '',
        agentNumber: '',
        directLine: '',
        emails: [],
        note: null,
      }),
    })

    const response = await PUT(request, { params: { id: contact.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.postNumber).toBe('')
    expect(data.agentNumber).toBe('')
    expect(data.directLine).toBe('')
    expect(data.emails).toBe('[]')
  })

  it('should return 404 if contact not found', async () => {
    const request = new NextRequest('http://localhost/api/contacts/non-existent-id', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        managerName: 'Jane Doe',
      }),
    })

    const response = await PUT(request, { params: { id: 'non-existent-id' } })
    expect(response.status).toBe(404) // Le contact n'existe pas
  })
})

describe('DELETE /api/contacts/[id]', () => {
  let agency: any
  let contact: any
  let user: any

  beforeEach(async () => {
    await prisma.contact.deleteMany()
    await prisma.agency.deleteMany()
    await prisma.user.deleteMany()
    jest.clearAllMocks()

    const passwordHash = await hashPassword('password123')
    user = await prisma.user.create({
      data: {
        login: 'testuser',
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

    contact = await prisma.contact.create({
      data: {
        agencyId: agency.id,
        managerName: 'John Doe',
        postNumber: '123456',
        agentNumber: '1234',
        directLine: '',
        emails: '[]',
        order: 0,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })
  })

  it('should return 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/contacts/test-id', {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: 'test-id' } })
    expect(response.status).toBe(401)
  })

  it('should delete contact', async () => {
    const request = new NextRequest(`http://localhost/api/contacts/${contact.id}`, {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: contact.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)

    // Vérifier que le contact est supprimé
    const deletedContact = await prisma.contact.findUnique({
      where: { id: contact.id },
    })
    expect(deletedContact).toBeNull()
  })

  it('should return 500 if contact not found', async () => {
    const request = new NextRequest('http://localhost/api/contacts/non-existent-id', {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: 'non-existent-id' } })
    expect(response.status).toBe(404) // Le contact n'existe pas
  })
})

