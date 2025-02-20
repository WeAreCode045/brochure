
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { PropertyData } from "@/types/property";
import { transformSupabaseData } from "@/components/property/webview/utils/transformSupabaseData";
import { useAuth } from "@/providers/AuthProvider";

export const useProperties = () => {
  const { toast } = useToast();
  const { profile, isAdmin } = useAuth();

  const fetchProperties = async () => {
    let query = supabase
      .from('properties')
      .select(`
        id,
        title,
        price,
        agent_id,
        created_at,
        featuredImage,
        property_images!inner (
          id,
          url
        )
      `)
      .limit(1, { foreignTable: 'property_images' }); // Limit to just one image per property

    if (!isAdmin) {
      query = query.eq('agent_id', profile.id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data || []).map(item => transformSupabaseData(item));
  };

  const { data: properties = [], isLoading, error } = useQuery({
    queryKey: ['properties', profile?.id, isAdmin],
    queryFn: fetchProperties,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 1, // Only retry once on failure
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Er is een fout opgetreden bij het verwijderen van de brochure",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Brochure verwijderd",
      description: "De brochure is succesvol verwijderd",
    });
  };

  return {
    properties,
    isLoading,
    error,
    handleDelete,
  };
};
