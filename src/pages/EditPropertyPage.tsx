
import { useNavigate, useParams } from "react-router-dom";
import { EditPropertyForm } from "@/components/EditPropertyForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { PropertySubmitData } from "@/types/property";
import { Json } from "@/integrations/supabase/types";

export default function EditPropertyPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const handleSubmit = async (data: PropertySubmitData) => {
    try {
      const propertyData = {
        title: data.title,
        price: data.price,
        address: data.address,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        sqft: data.sqft,
        livingArea: data.livingArea,
        buildYear: data.buildYear,
        garages: data.garages,
        energyLabel: data.energyLabel,
        description: data.description,
        features: data.features as Json,
        images: data.images,
        floorplans: data.floorplans,
        featuredImage: data.featuredImage,
        gridImages: data.gridImages,
        hasGarden: data.hasGarden,
        areas: data.areas as Json[],
      };

      if (id) {
        const { error: updateError } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', id);
        
        if (updateError) throw updateError;
      }

      toast({
        title: "Success",
        description: "Property updated successfully",
        variant: "default",
      });

      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to update property",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Property</h1>
      <EditPropertyForm onSubmit={handleSubmit} />
    </div>
  );
}
