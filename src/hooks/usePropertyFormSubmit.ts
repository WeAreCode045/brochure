
import { useToast } from "@/components/ui/use-toast";
import type { PropertyFormData, PropertySubmitData } from "@/types/property";
import { Json } from "@/integrations/supabase/types";

export function usePropertyFormSubmit(onSubmit: (data: PropertySubmitData) => void) {
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, formData: PropertyFormData) => {
    e.preventDefault();
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const submitData: PropertySubmitData = {
        ...formData,
        features: formData.features as unknown as Json,
        areas: formData.areas as unknown as Json[],
        featuredImage: formData.featuredImage,
        gridImages: formData.gridImages
      };

      await onSubmit(submitData);
      
      toast({
        title: "Success",
        description: "Property saved successfully",
        variant: "default",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to save property",
        variant: "destructive",
      });
    }
  };

  return { handleSubmit };
}
