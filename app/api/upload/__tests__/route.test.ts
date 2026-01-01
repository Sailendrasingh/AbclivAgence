import { POST } from '../route'
import { NextRequest } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Mock des logs
jest.mock('@/lib/logs', () => ({
  createLog: jest.fn(),
}))

// Mock de getSession
const mockGetSession = jest.fn()
jest.mock('@/lib/session', () => ({
  getSession: () => mockGetSession(),
}))

// Mock de exifr
jest.mock('exifr', () => ({
  parse: jest.fn(),
}))

// Mock de fs/promises
jest.mock('fs/promises', () => ({
  writeFile: jest.fn(),
  mkdir: jest.fn(),
  stat: jest.fn(),
  readFile: jest.fn(),
}))

describe('POST /api/upload', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetSession.mockResolvedValue({ id: 'test-user-id', login: 'testuser', role: 'User' })
  })

  it('should return 401 if not authenticated', async () => {
    mockGetSession.mockResolvedValue(null)

    const formData = new FormData()
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    formData.append('file', file)

    const request = new NextRequest('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    expect(response.status).toBe(401)
  })

  it('should reject upload without file', async () => {
    const formData = new FormData()

    const request = new NextRequest('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Aucun fichier fourni')
  })

  it('should reject file with invalid MIME type', async () => {
    const formData = new FormData()
    const file = new File(['test'], 'test.txt', { type: 'text/plain' })
    formData.append('file', file)

    const request = new NextRequest('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Type de fichier non autorisé')
  })

  it('should reject file exceeding size limit', async () => {
    // Créer un fichier de 6 MB (dépasse la limite de 5 MB)
    const largeContent = 'x'.repeat(6 * 1024 * 1024)
    const formData = new FormData()
    const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' })
    formData.append('file', file)

    const request = new NextRequest('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('trop volumineux')
  })

  it('should reject file with falsified extension', async () => {
    // Créer un fichier .txt renommé en .jpg
    const formData = new FormData()
    const file = new File(['not an image'], 'fake.jpg', { type: 'image/jpeg' })
    formData.append('file', file)

    const request = new NextRequest('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toContain('Type de fichier non autorisé')
  })

  it('should accept valid JPEG file', async () => {
    // Créer un fichier JPEG valide (magic bytes: FF D8 FF)
    const jpegMagicBytes = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46])
    const formData = new FormData()
    const file = new File([jpegMagicBytes], 'test.jpg', { type: 'image/jpeg' })
    formData.append('file', file)

    const { writeFile, mkdir } = require('fs/promises')
    writeFile.mockResolvedValue(undefined)
    mkdir.mockResolvedValue(undefined)

    const request = new NextRequest('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.filename).toBeDefined()
    expect(data.filename).toMatch(/^\d+-[\w]+\.jpg$/)
  })

  it('should accept valid PNG file', async () => {
    // Créer un fichier PNG valide (magic bytes: 89 50 4E 47 0D 0A 1A 0A)
    const pngMagicBytes = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00])
    const formData = new FormData()
    const file = new File([pngMagicBytes], 'test.png', { type: 'image/png' })
    formData.append('file', file)

    const { writeFile, mkdir } = require('fs/promises')
    writeFile.mockResolvedValue(undefined)
    mkdir.mockResolvedValue(undefined)

    const request = new NextRequest('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.filename).toBeDefined()
    expect(data.filename).toMatch(/^\d+-[\w]+\.png$/)
  })

  it('should prevent path traversal in filename', async () => {
    const jpegMagicBytes = Buffer.from([0xFF, 0xD8, 0xFF])
    const formData = new FormData()
    const file = new File([jpegMagicBytes], '../../../etc/passwd.jpg', { type: 'image/jpeg' })
    formData.append('file', file)

    const { writeFile, mkdir } = require('fs/promises')
    writeFile.mockResolvedValue(undefined)
    mkdir.mockResolvedValue(undefined)

    const request = new NextRequest('http://localhost/api/upload', {
      method: 'POST',
      body: formData,
    })

    const response = await POST(request)
    
    // Le fichier devrait être sauvegardé avec un nom sécurisé, pas le chemin original
    expect(writeFile).toHaveBeenCalled()
    const writeFileCall = writeFile.mock.calls[0]
    const filepath = writeFileCall[0]
    
    // Vérifier que le chemin ne contient pas de path traversal
    expect(filepath).not.toContain('../')
    expect(filepath).toContain('uploads')
  })
})

