"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface BANResult {
  features: Array<{
    properties: {
      label: string
      housenumber?: string
      street?: string
      postcode: string
      city: string
    }
    geometry: {
      coordinates: [number, number]
    }
  }>
}

export function AddressSearch({
  onSelect,
}: {
  onSelect: (address: any) => void
}) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setResults([])
    
    try {
      const response = await fetch(`/api/ban/search?q=${encodeURIComponent(query)}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.error || "Erreur lors de la recherche d'adresse"
        setError(errorMessage)
        return
      }

      const data: BANResult = await response.json()

      // Vérifier que la réponse contient des features
      if (!data.features || !Array.isArray(data.features)) {
        setError("Aucun résultat trouvé")
        return
      }

      setResults(
        data.features.map((feature) => {
          // Construire l'adresse complète avec numéro + rue
          const housenumber = feature.properties.housenumber || ""
          const street = feature.properties.street || ""
          
          // Si on a housenumber et street, les combiner
          // Sinon, utiliser la première partie du label (avant la virgule) qui contient généralement l'adresse complète
          let fullStreet = ""
          if (housenumber && street) {
            fullStreet = `${housenumber} ${street}`
          } else {
            // Le label de l'API BAN est formaté comme "23-25 Rue Jean-Jacques Rousseau, 75001 Paris"
            // On prend la partie avant la première virgule pour avoir "23-25 Rue Jean-Jacques Rousseau"
            fullStreet = feature.properties.label.split(',')[0].trim()
          }
          
          return {
            label: feature.properties.label,
            street: fullStreet, // Adresse complète avec numéro (ex: "23-25 Rue Jean-Jacques Rousseau")
            city: feature.properties.city,
            postalCode: feature.properties.postcode,
            latitude: feature.geometry.coordinates[1],
            longitude: feature.geometry.coordinates[0],
          }
        })
      )
    } catch (error) {
      console.error("Error searching address:", error)
      setError("Erreur lors de la recherche d'adresse. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une adresse..."
          onKeyDown={(e) => e.key === "Enter" && search()}
        />
        <Button onClick={search} disabled={loading}>
          <Search className="h-4 w-4 mr-2" />
          Rechercher
        </Button>
      </div>
      {error && (
        <div className="text-sm text-destructive p-2 bg-destructive/10 rounded-md">
          {error}
        </div>
      )}
      {results.length > 0 && (
        <div className="border rounded-md max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <div
              key={index}
              className="p-2 hover:bg-accent cursor-pointer"
              onClick={() => onSelect(result)}
            >
              <div className="font-medium">{result.label}</div>
              <div className="text-sm text-muted-foreground">
                {result.postalCode} {result.city}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

