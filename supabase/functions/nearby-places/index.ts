
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

interface LocationData {
  lat: number;
  lng: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { address, apiKey } = await req.json()

    if (!address || !apiKey) {
      throw new Error('Missing required parameters: address or apiKey')
    }

    console.log('Fetching data for address:', address)

    // First, geocode the address
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    const geocodeResponse = await fetch(geocodeUrl)
    const geocodeData = await geocodeResponse.json()

    console.log('Geocode response:', geocodeData)

    if (!geocodeData.results?.[0]?.geometry?.location) {
      throw new Error('Could not geocode address')
    }

    const { lat, lng } = geocodeData.results[0].geometry.location

    // Types of places to search for
    const placeTypes = {
      education: 'school',
      shopping: 'shopping_mall',
      train: 'train_station',
      bus: 'bus_station',
      sports: 'gym',
    }

    const placesData: { [key: string]: any[] } = {}

    // Fetch places for each type
    for (const [key, type] of Object.entries(placeTypes)) {
      console.log(`Fetching ${key} data...`)
      const nearbyUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=${type}&key=${apiKey}`
      const response = await fetch(nearbyUrl)
      const data = await response.json()
      
      if (data.results) {
        placesData[key] = data.results.slice(0, 3).map((place: any) => ({
          types: place.types,
          vicinity: place.vicinity,
          name: place.name,
          rating: place.rating,
          photos: place.photos?.map((photo: any) => 
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${apiKey}`
          ) || []
        }))
      }
    }

    // Get area photos
    const photoSearchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&key=${apiKey}`
    const photoResponse = await fetch(photoSearchUrl)
    const photoData = await photoResponse.json()
    
    const areaPhotos = photoData.results
      ?.filter((place: any) => place.photos)
      .slice(0, 3)
      .map((place: any) => 
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${place.photos[0].photo_reference}&key=${apiKey}`
      ) || []

    console.log('Successfully fetched all places data')

    return new Response(
      JSON.stringify({ ...placesData, areaPhotos }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    )
  } catch (error) {
    console.error('Error in nearby-places function:', error)
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
