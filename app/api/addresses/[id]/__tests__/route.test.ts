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

describe('PUT /api/addresses/[id]', () => {
  let agency: any
  let address: any
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

    address = await prisma.address.create({
      data: {
        agencyId: agency.id,
        label: 'Adresse principale',
        street: '123 Rue de la Test',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
        latitude: 48.8566,
        longitude: 2.3522,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })
  })

  it('should return 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/addresses/test-id', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: 'Adresse modifiée',
      }),
    })

    const response = await PUT(request, { params: { id: 'test-id' } })
    expect(response.status).toBe(401)
  })

  it('should update address with valid data', async () => {
    const request = new NextRequest(`http://localhost/api/addresses/${address.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: 'Adresse modifiée',
        street: '456 Nouvelle Rue',
        city: 'Lyon',
        postalCode: '69001',
        country: 'France',
        latitude: 45.7640,
        longitude: 4.8357,
      }),
    })

    const response = await PUT(request, { params: { id: address.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.label).toBe('Adresse modifiée')
    expect(data.street).toBe('456 Nouvelle Rue')
    expect(data.city).toBe('Lyon')
    expect(data.postalCode).toBe('69001')
    expect(data.latitude).toBe(45.7640)
    expect(data.longitude).toBe(4.8357)

    // Vérifier en base
    const updatedAddress = await prisma.address.findUnique({
      where: { id: address.id },
    })
    expect(updatedAddress?.label).toBe('Adresse modifiée')
    expect(updatedAddress?.city).toBe('Lyon')
  })

  it('should use default country "France" if not provided', async () => {
    const request = new NextRequest(`http://localhost/api/addresses/${address.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: 'Adresse modifiée',
      }),
    })

    const response = await PUT(request, { params: { id: address.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.country).toBe('France')
  })

  it('should allow updating coordinates', async () => {
    const request = new NextRequest(`http://localhost/api/addresses/${address.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: 50.0,
        longitude: 3.0,
      }),
    })

    const response = await PUT(request, { params: { id: address.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.latitude).toBe(50.0)
    expect(data.longitude).toBe(3.0)
  })

  it('should allow clearing coordinates', async () => {
    const request = new NextRequest(`http://localhost/api/addresses/${address.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: null,
        longitude: null,
      }),
    })

    const response = await PUT(request, { params: { id: address.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.latitude).toBeNull()
    expect(data.longitude).toBeNull()
  })

  it('should return 500 if address not found', async () => {
    const request = new NextRequest('http://localhost/api/addresses/non-existent-id', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: 'Adresse modifiée',
      }),
    })

    const response = await PUT(request, { params: { id: 'non-existent-id' } })
    expect(response.status).toBe(404) // L'adresse n'existe pas
  })
})

describe('DELETE /api/addresses/[id]', () => {
  let agency: any
  let address: any
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

    address = await prisma.address.create({
      data: {
        agencyId: agency.id,
        label: 'Adresse principale',
        street: '123 Rue de la Test',
        city: 'Paris',
        postalCode: '75001',
        country: 'France',
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })
  })

  it('should return 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/addresses/test-id', {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: 'test-id' } })
    expect(response.status).toBe(401)
  })

  it('should delete address', async () => {
    const request = new NextRequest(`http://localhost/api/addresses/${address.id}`, {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: address.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)

    // Vérifier que l'adresse est supprimée
    const deletedAddress = await prisma.address.findUnique({
      where: { id: address.id },
    })
    expect(deletedAddress).toBeNull()
  })

  it('should return 500 if address not found', async () => {
    const request = new NextRequest('http://localhost/api/addresses/non-existent-id', {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: 'non-existent-id' } })
    expect(response.status).toBe(404) // L'adresse n'existe pas
  })
})

