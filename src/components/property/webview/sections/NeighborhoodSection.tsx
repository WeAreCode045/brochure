
import { WebViewSectionProps } from "../types";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

interface PlaceDetails {
  types: string[];
  vicinity?: string;
  name?: string;
  rating?: number;
}

export function NeighborhoodSection({ property, settings }: WebViewSectionProps) {
  const [nearbyPlaces, setNearbyPlaces] = useState<{
    [key: string]: PlaceDetails[];
  }>({
    restaurants: [],
    schools: [],
    transit: [],
    shopping: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      if (!settings?.googleMapsApiKey || !property.address) return;

      try {
        const { data, error } = await supabase.functions.invoke('nearby-places', {
          body: {
            address: property.address,
            apiKey: settings.googleMapsApiKey
          }
        });

        if (error) {
          throw error;
        }

        if (data) {
          setNearbyPlaces(data);
        }
      } catch (error) {
        console.error('Error fetching nearby places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, [property.address, settings?.googleMapsApiKey]);

  const renderPlacesList = (places: PlaceDetails[], title: string) => {
    if (places.length === 0) return null;

    return (
      <div>
        <h4 className="font-semibold mb-2 text-gray-700">{title}</h4>
        <ul className="list-disc list-inside space-y-1">
          {places.map((place, index) => (
            <li key={index} className="text-gray-600">
              {place.name}
              {place.rating && <span className="text-yellow-500 ml-1">★ {place.rating}</span>}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-4 px-6 pb-24">
      <div className="relative">
        <h3 
          className="text-xl font-semibold mb-4"
          style={{ color: settings?.secondaryColor }}
        >
          Location
        </h3>
        <div className="text-gray-600 text-[13px] leading-relaxed mb-6">
          {loading && settings?.googleMapsApiKey ? (
            <div className="text-center py-4">Loading neighborhood information...</div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-6">
              {renderPlacesList(nearbyPlaces.restaurants, "Nearby Restaurants")}
              {renderPlacesList(nearbyPlaces.schools, "Educational Facilities")}
              {renderPlacesList(nearbyPlaces.transit, "Transportation")}
              {renderPlacesList(nearbyPlaces.shopping, "Shopping")}
            </div>
          )}
        </div>
      </div>
      
      <div className="w-full h-[300px] rounded-lg overflow-hidden">
        {settings?.googleMapsApiKey ? (
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${settings.googleMapsApiKey}&q=${encodeURIComponent(property.address)}`}
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            Please add a Google Maps API key in Settings &gt; Advanced to view the map
          </div>
        )}
      </div>
    </div>
  );
}
