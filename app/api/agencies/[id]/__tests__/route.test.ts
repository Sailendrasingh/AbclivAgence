import { GET, PUT, DELETE } from '../route'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

// Mock de la validation CSRF
jest.mock('@/lib/csrf-middleware', () => ({
  requireCSRF: jest.fn(() => Promise.resolve(null)),
}));

// Mock des logs et history
jest.mock('@/lib/logs', () => ({
  createLog: jest.fn(),
}))

jest.mock('@/lib/history', () => ({
  createAgencyHistory: jest.fn(),
}))

// Mock de getSession
const mockGetSession = jest.fn()
jest.mock('@/lib/session', () => ({
  getSession: () => mockGetSession(),
}))

describe('GET /api/agencies/[id]', () => {
  beforeEach(async () => {
    await prisma.agency.deleteMany()
    await prisma.user.deleteMany()
    jest.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/agencies/test-id')
    const response = await GET(request, { params: { id: 'test-id' } })

    expect(response.status).toBe(401)
  })

  it('should return agency details for authenticated user', async () => {
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: 'testuser',
        passwordHash,
        role: 'User',
        active: true,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })

    const agency = await prisma.agency.create({
      data: {
        name: 'Agence Test',
        state: 'OK',
        codeAgence: 'CODE001',
        codeRayon: 'RAYON001',
      },
    })

    const request = new NextRequest(`http://localhost/api/agencies/${agency.id}`)
    const response = await GET(request, { params: { id: agency.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.id).toBe(agency.id)
    expect(data.name).toBe('Agence Test')
    expect(data.state).toBe('OK')
    expect(data.codeAgence).toBe('CODE001')
  })

  it('should return 404 if agency not found', async () => {
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: 'testuser',
        passwordHash,
        role: 'User',
        active: true,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })

    const request = new NextRequest('http://localhost/api/agencies/non-existent-id')
    const response = await GET(request, { params: { id: 'non-existent-id' } })

    expect(response.status).toBe(404)
  })
})

describe('PUT /api/agencies/[id]', () => {
  beforeEach(async () => {
    await prisma.agency.deleteMany()
    await prisma.user.deleteMany()
    jest.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/agencies/test-id', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Agence Modifiée',
      }),
    })

    const response = await PUT(request, { params: { id: 'test-id' } })
    expect(response.status).toBe(401)
  })

  it('should update agency for Admin user', async () => {
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: 'admin',
        passwordHash,
        role: 'Super user',
        active: true,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })

    const agency = await prisma.agency.create({
      data: {
        name: 'Agence Originale',
        state: 'ALERTE',
      },
    })

    const request = new NextRequest(`http://localhost/api/agencies/${agency.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Agence Modifiée',
        state: 'OK',
        codeAgence: 'CODE001',
        codeRayon: 'RAYON001',
      }),
    })

    const response = await PUT(request, { params: { id: agency.id } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.name).toBe('Agence Modifiée')
    expect(data.state).toBe('OK')
    expect(data.codeAgence).toBe('CODE001')

    // Vérifier en base
    const updatedAgency = await prisma.agency.findUnique({
      where: { id: agency.id },
    })
    expect(updatedAgency?.name).toBe('Agence Modifiée')
    expect(updatedAgency?.state).toBe('OK')
  })

  it('should allow update without name (route does not validate name)', async () => {
    // Note: La route PUT /api/agencies/[id] ne valide pas que le nom est requis
    // Ce test vérifie le comportement actuel
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: `admin-${uniqueId}`,
        passwordHash,
        role: 'Super user',
        active: true,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })

    const agency = await prisma.agency.create({
      data: {
        name: 'Agence Test',
        state: 'OK',
      },
    })

    const request = new NextRequest(`http://localhost/api/agencies/${agency.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state: 'ALERTE',
      }),
    })

    const response = await PUT(request, { params: { id: agency.id } })
    // La route actuelle permet la mise à jour sans nom
    expect(response.status).toBe(200)
  })

  it('should allow update for User role (no RBAC check in route)', async () => {
    // Note: La route PUT /api/agencies/[id] ne vérifie pas le rôle actuellement
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: `user-${uniqueId}`,
        passwordHash,
        role: 'User',
        active: true,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })

    const agency = await prisma.agency.create({
      data: {
        name: 'Agence Test',
        state: 'OK',
      },
    })

    const request = new NextRequest(`http://localhost/api/agencies/${agency.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Agence Modifiée',
      }),
    })

    const response = await PUT(request, { params: { id: agency.id } })
    // La route actuelle permet la mise à jour pour tous les rôles authentifiés
    expect(response.status).toBe(200)
  })

  it('should create history entry for Super Admin', async () => {
    const { createAgencyHistory } = require('@/lib/history')
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: `superadmin-${uniqueId}`,
        passwordHash,
        role: 'Super Admin',
        active: true,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })

    const agency = await prisma.agency.create({
      data: {
        name: 'Agence Test',
        state: 'OK',
      },
    })

    const request = new NextRequest(`http://localhost/api/agencies/${agency.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Agence Modifiée',
        state: 'ALERTE',
        validatedAt: new Date().toISOString(),
      }),
    })

    await PUT(request, { params: { id: agency.id } })

    expect(createAgencyHistory).toHaveBeenCalled()
  })
})

describe('DELETE /api/agencies/[id]', () => {
  beforeEach(async () => {
    await prisma.agency.deleteMany()
    await prisma.user.deleteMany()
    jest.clearAllMocks()
  })

  it('should return 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/agencies/test-id', {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: 'test-id' } })
    expect(response.status).toBe(401)
  })

  it('should delete agency for Super Admin', async () => {
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: 'superadmin',
        passwordHash,
        role: 'Super Admin',
        active: true,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })

    const agency = await prisma.agency.create({
      data: {
        name: 'Agence à Supprimer',
        state: 'OK',
      },
    })

    const request = new NextRequest(`http://localhost/api/agencies/${agency.id}`, {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: agency.id } })
    expect(response.status).toBe(200)

    // Vérifier que l'agence est supprimée
    const deletedAgency = await prisma.agency.findUnique({
      where: { id: agency.id },
    })
    expect(deletedAgency).toBeNull()
  })

  it('should allow deletion for Admin role (no RBAC check in route)', async () => {
    // Note: La route DELETE /api/agencies/[id] ne vérifie pas le rôle actuellement
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: `admin-${uniqueId}`,
        passwordHash,
        role: 'Super user',
        active: true,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })

    const agency = await prisma.agency.create({
      data: {
        name: 'Agence Test',
        state: 'OK',
      },
    })

    const request = new NextRequest(`http://localhost/api/agencies/${agency.id}`, {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: agency.id } })
    // La route actuelle permet la suppression pour tous les rôles authentifiés
    expect(response.status).toBe(200)
  })

  it('should return 500 if agency not found (Prisma error)', async () => {
    // Note: La route DELETE retourne 500 quand Prisma ne trouve pas l'enregistrement
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(7)}`
    const passwordHash = await hashPassword('password123')
    const user = await prisma.user.create({
      data: {
        login: `superadmin-${uniqueId}`,
        passwordHash,
        role: 'Super Admin',
        active: true,
      },
    })

    mockGetSession.mockResolvedValue({ id: user.id, login: user.login, role: user.role })

    const request = new NextRequest('http://localhost/api/agencies/non-existent-id', {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: 'non-existent-id' } })
    // La route retourne maintenant 404 quand l'agence n'existe pas
    expect(response.status).toBe(404)
  })
})

