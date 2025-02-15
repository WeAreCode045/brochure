
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { PropertyForm } from "./PropertyForm";
import type { PropertySubmitData } from "@/types/property";
import { Json } from "@/integrations/supabase/types";

export function EditPropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (data: PropertySubmitData) => {
    if (!id) return;

    try {
      const { error } = await supabase
        .from('properties')
        .update({
          ...data,
          features: data.features as Json,
          areas: data.areas,
          gridImages: data.gridImages,
        })
        .eq('id', id);

      if (error) throw error;

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

  return <PropertyForm onSubmit={handleSubmit} />;
}
