
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocationData } from "./location/useLocationData";
import { useMapImage } from "./location/useMapImage";
import { MapPreview } from "./location/MapPreview";
import { supabase } from "@/integrations/supabase/client";
import type { PropertyPlaceType } from "@/types/property";
import type { Json } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";
import { AddressInput } from "./location/AddressInput";
import { NearbyPlaces } from "./location/NearbyPlaces";

interface PropertyLocationProps {
  id?: string;
  address: string;
  description?: string;
  map_image?: string | null;
  nearby_places?: PropertyPlaceType[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onLocationFetch: () => Promise<void>;
  onMapImageDelete?: () => void;
  onMapImageUpload?: (url: string) => void;
}

export function PropertyLocation({
  id,
  address,
  description,
  map_image,
  nearby_places = [],
  onChange,
  onLocationFetch,
  onMapImageDelete,
  onMapImageUpload,
}: PropertyLocationProps) {
  const { isLoading, fetchLocationData } = useLocationData();
  const { isUploading, uploadMapImage } = useMapImage();
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !id) return;

    const file = e.target.files[0];
    const url = await uploadMapImage(file);
    
    if (url) {
      try {
        const { error } = await supabase
          .from('properties')
          .update({ map_image: url })
          .eq('id', id);

        if (error) throw error;

        if (onMapImageUpload) {
          onMapImageUpload(url);
        }
      } catch (error) {
        console.error('Error updating property with map image:', error);
      }
    }

    e.target.value = '';
  };

  const handleLocationFetch = async () => {
    const data = await fetchLocationData(address, id);
    if (data) {
      await onLocationFetch();
    }
  };

  const handleGenerateDescription = async () => {
    if (!id || !address) return;

    try {
      const { data, error } = await supabase.functions.invoke('generate-location-description', {
        body: { 
          address, 
          nearbyPlaces: nearby_places,
          language: 'nl'
        }
      });

      if (error) throw error;

      if (data?.description) {
        const { error: updateError } = await supabase
          .from('properties')
          .update({ location_description: data.description })
          .eq('id', id);

        if (updateError) throw updateError;

        const event = {
          target: {
            name: 'location_description',
            value: data.description
          }
        } as React.ChangeEvent<HTMLTextAreaElement>;
        
        onChange(event);

        toast({
          description: "Locatiebeschrijving succesvol gegenereerd",
        });
      }
    } catch (error) {
      console.error('Error generating description:', error);
      toast({
        variant: "destructive",
        description: "Kon geen locatiebeschrijving genereren",
      });
    }
  };

  const handlePlaceDelete = async (e: React.MouseEvent, placeId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!id) return;

    try {
      const updatedPlaces = nearby_places
        .filter(place => place.id !== placeId)
        .map(place => ({
          id: place.id,
          name: place.name,
          type: place.type,
          vicinity: place.vicinity,
          rating: place.rating,
          user_ratings_total: place.user_ratings_total
        })) as Json;

      const { error } = await supabase
        .from('properties')
        .update({ nearby_places: updatedPlaces })
        .eq('id', id);

      if (error) throw error;

      await onLocationFetch();
      toast({
        description: "Voorziening verwijderd succesvol",
      });
    } catch (error) {
      console.error('Error removing place:', error);
      toast({
        variant: "destructive",
        description: "Kon voorziening niet verwijderen",
      });
    }
  };

  return (
    <div className="space-y-6">
      <AddressInput
        address={address}
        isLoading={isLoading}
        isUploading={isUploading}
        disabled={!id}
        hasNearbyPlaces={nearby_places.length > 0}
        onChange={onChange}
        onLocationFetch={handleLocationFetch}
        onImageUpload={handleImageUpload}
        onGenerateDescription={handleGenerateDescription}
      />

      {map_image && (
        <MapPreview 
          map_image={map_image} 
          onDelete={onMapImageDelete ?? (() => {})} 
        />
      )}

      <div className="space-y-2">
        <Label htmlFor="location_description">Locatiebeschrijving</Label>
        <Textarea
          id="location_description"
          name="location_description"
          value={description}
          onChange={onChange}
          className="min-h-[200px]"
          placeholder="Genereer een beschrijving van de locatie met de knop hierboven..."
        />
      </div>

      <NearbyPlaces 
        places={nearby_places} 
        onPlaceDelete={handlePlaceDelete} 
      />
    </div>
  );
}
