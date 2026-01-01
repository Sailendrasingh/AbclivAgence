/**
 * Script pour ajouter la colonne 'order' à la table Contact
 * Usage: node scripts/add-contact-order-column.js
 */

const { PrismaClient } = require('@prisma/client')
const path = require('path')

// Forcer l'utilisation de la base de production
const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db')
process.env.DATABASE_URL = `file:${dbPath}`

const prisma = new PrismaClient()

async function addOrderColumn() {
  console.log('🔧 Ajout de la colonne "order" à la table Contact...\n')

  try {
    // Utiliser Prisma pour exécuter une requête SQL brute
    await prisma.$executeRawUnsafe(`
      ALTER TABLE Contact ADD COLUMN "order" INTEGER DEFAULT 0;
    `)
    
    console.log('✅ Colonne "order" ajoutée avec succès !')
    
    // Mettre à jour tous les contacts existants pour avoir order = 0
    await prisma.$executeRawUnsafe(`
      UPDATE Contact SET "order" = 0 WHERE "order" IS NULL;
    `)
    
    console.log('✅ Valeurs par défaut assignées aux contacts existants')
    
    // Vérifier
    const contacts = await prisma.contact.findMany({
      select: { id: true, managerName: true, order: true },
      take: 5,
    })
    
    console.log(`\n📋 Exemple de contacts (premiers 5):`)
    contacts.forEach((contact) => {
      console.log(`   - ${contact.managerName}: order = ${contact.order}`)
    })
    
  } catch (error) {
    if (error.message.includes('duplicate column name') || error.message.includes('already exists')) {
      console.log('ℹ️  La colonne "order" existe déjà')
    } else {
      console.error('❌ Erreur:', error.message)
      process.exit(1)
    }
  } finally {
    await prisma.$disconnect()
  }
}

addOrderColumn()

