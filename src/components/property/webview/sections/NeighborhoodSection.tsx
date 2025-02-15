
import { WebViewSectionProps } from "../types";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { School, ShoppingBag, Train, Bus, Dumbbell } from "lucide-react";
import { WebViewImageGrid } from "../WebViewImageGrid";

interface PlaceDetails {
  types: string[];
  vicinity?: string;
  name?: string;
  rating?: number;
  photos?: string[];
}

interface PlacesData {
  education: PlaceDetails[];
  shopping: PlaceDetails[];
  train: PlaceDetails[];
  bus: PlaceDetails[];
  sports: PlaceDetails[];
}

const initialPlacesData: PlacesData = {
  education: [],
  shopping: [],
  train: [],
  bus: [],
  sports: [],
};

export function NeighborhoodSection({ property, settings }: WebViewSectionProps) {
  const [placesData, setPlacesData] = useState<PlacesData>(initialPlacesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      if (!settings?.googleMapsApiKey || !property.address) {
        setLoading(false);
        return;
      }

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
          setPlacesData({
            education: (data.education || []).filter(place => place.rating && place.rating >= 4),
            shopping: (data.shopping || []).filter(place => place.rating && place.rating >= 4),
            train: (data.train || []).filter(place => place.rating && place.rating >= 4),
            bus: (data.bus || []).filter(place => place.rating && place.rating >= 4),
            sports: (data.sports || []).filter(place => place.rating && place.rating >= 4),
          });
        }
      } catch (error) {
        console.error('Error fetching nearby places:', error);
        setPlacesData(initialPlacesData);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, [property.address, settings?.googleMapsApiKey]);

  const renderPlacesList = (places: PlaceDetails[], title: string, Icon: React.ElementType) => {
    if (!places || places.length === 0) return null;

    return (
      <div>
        <h4 className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
          <Icon className="w-5 h-5" style={{ color: settings?.secondaryColor }} />
          {title}
        </h4>
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
    <div className="space-y-6 pb-24">
      {property.areaPhotos && property.areaPhotos.length > 0 && (
        <div className="mb-8 w-full">
          <WebViewImageGrid images={property.areaPhotos} settings={settings} isLocationGrid={true} />
        </div>
      )}
      
      <div className="relative px-6">
        <h3 
          className="text-xl font-semibold mb-4"
          style={{ color: settings?.secondaryColor }}
        >
          Locatie
        </h3>
        <div className="text-gray-600 text-[13px] leading-relaxed mb-6">
          {loading && settings?.googleMapsApiKey ? (
            <div className="text-center py-4">Locatie informatie laden...</div>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-6">
              {renderPlacesList(placesData.education, "Onderwijsinstellingen", School)}
              {renderPlacesList(placesData.shopping, "Winkelcentra", ShoppingBag)}
              {renderPlacesList(placesData.train, "Treinstations", Train)}
              {renderPlacesList(placesData.bus, "Busstations", Bus)}
              {renderPlacesList(placesData.sports, "Sportfaciliteiten", Dumbbell)}
            </div>
          )}
        </div>
      </div>
      
      <div className="w-full h-[300px] rounded-lg overflow-hidden px-6">
        {settings?.googleMapsApiKey ? (
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${settings.googleMapsApiKey}&q=${encodeURIComponent(property.address)}&zoom=14&maptype=roadmap&language=nl&region=NL`}
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            Voeg een Google Maps API-sleutel toe in Instellingen &gt; Geavanceerd om de kaart te bekijken
          </div>
        )}
      </div>
    </div>
  );
}
