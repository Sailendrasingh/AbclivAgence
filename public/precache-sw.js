// Script à exécuter dans la console du navigateur pour forcer la mise en cache
// de toutes les ressources nécessaires pour le mode offline

(async function precacheAllResources() {
  console.log('🚀 Début du préchargement des ressources...')
  
  const cacheName = 'agences-v7'
  const cache = await caches.open(cacheName)
  
  // Pages à mettre en cache
  const pages = [
    '/',
    '/login',
    '/dashboard/agences',
  ]
  
  // Fonction pour mettre en cache une URL et toutes ses dépendances
  async function cachePage(url) {
    try {
      console.log(`📄 Préchargement de ${url}...`)
      const response = await fetch(url)
      if (response.ok) {
        await cache.put(url, response.clone())
        console.log(`✅ ${url} mis en cache`)
        
        // Extraire les ressources liées depuis le HTML
        const html = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        
        // Trouver tous les scripts et styles
        const scripts = Array.from(doc.querySelectorAll('script[src]'))
        const styles = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
        const images = Array.from(doc.querySelectorAll('img[src]'))
        
        const resources = [
          ...scripts.map(s => s.getAttribute('src')),
          ...styles.map(s => s.getAttribute('href')),
          ...images.map(i => i.getAttribute('src')),
        ].filter(Boolean)
        
        // Mettre en cache les ressources
        for (const resource of resources) {
          try {
            const resourceUrl = new URL(resource, window.location.origin).href
            if (!resourceUrl.includes('/api/')) {
              const resResponse = await fetch(resourceUrl)
              if (resResponse.ok) {
                await cache.put(resourceUrl, resResponse.clone())
                console.log(`  ✅ ${resourceUrl}`)
              }
            }
          } catch (err) {
            console.warn(`  ⚠️ Erreur pour ${resource}:`, err)
          }
        }
      } else {
        console.warn(`⚠️ ${url}: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error(`❌ Erreur pour ${url}:`, error)
    }
  }
  
  // Précharger toutes les pages
  for (const page of pages) {
    await cachePage(page)
    // Attendre un peu entre chaque page
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  console.log('✨ Préchargement terminé!')
  console.log('📦 Vérifiez le cache dans DevTools > Application > Cache Storage > agences-v7')
})()

