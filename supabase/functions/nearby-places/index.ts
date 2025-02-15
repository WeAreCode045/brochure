
import { serve } from 'https://deno.fresh.dev/std@1.0.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

interface LocationData {
  lat: number;
  lng: number;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { address, apiKey } = await req.json()

    // First, geocode the address
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    const geocodeResponse = await fetch(geocodeUrl)
    const geocodeData = await geocodeResponse.json()

    if (!geocodeData.results?.[0]?.geometry?.location) {
      throw new Error('Could not geocode address')
    }

    const { lat, lng } = geocodeData.results[0].geometry.location

    // Types of places to search for
    const placeTypes = {
      restaurants: 'restaurant',
      schools: 'school',
      transit: 'transit_station',
      shopping: 'shopping_mall'
    }

    const placesData: { [key: string]: any[] } = {}

    // Fetch places for each type
    for (const [key, type] of Object.entries(placeTypes)) {
      const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${apiKey}`
      const response = await fetch(nearbyUrl)
      const data = await response.json()
      
      if (data.results) {
        placesData[key] = data.results.slice(0, 3).map((place: any) => ({
          types: place.types,
          vicinity: place.vicinity,
          name: place.name,
          rating: place.rating
        }))
      }
    }

    return new Response(
      JSON.stringify(placesData),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 400, 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})
