
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { PropertyFormData } from "@/types/property";
import { Json } from "@/integrations/supabase/types";

export function usePropertySubmit() {
  const { toast } = useToast();

  const handleSubmit = async (formData: PropertyFormData) => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('properties')
        .insert({
          ...formData,
          features: formData.features as unknown as Json,
          areas: formData.areas as unknown as Json[],
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property created successfully",
        variant: "default",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to create property",
        variant: "destructive",
      });
    }
  };

  return { handleSubmit };
}
