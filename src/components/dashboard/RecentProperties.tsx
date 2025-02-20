
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyData } from "@/types/property";
import { transformSupabaseData } from "@/components/property/webview/utils/transformSupabaseData";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentProperties() {
  const navigate = useNavigate();
  const { profile, isAdmin } = useAuth();
  
  const { data: recentProperties, isLoading, error } = useQuery({
    queryKey: ['recent-properties', profile?.id, isAdmin],
    queryFn: async () => {
      try {
        let query = supabase
          .from('properties')
          .select('*, property_images(*)')
          .order('created_at', { ascending: false })
          .limit(3);

        if (!isAdmin && profile) {
          query = query.eq('agent_id', profile.id);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Supabase query error:', error);
          throw error;
        }

        return (data || []).map(item => transformSupabaseData(item));
      } catch (err) {
        console.error('Error fetching properties:', err);
        throw err;
      }
    },
    retry: 2,
    staleTime: 30000, // Data remains fresh for 30 seconds
    cacheTime: 300000, // Cache data for 5 minutes
  });

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-red-500">
            Error loading properties. Please try again later.
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="w-16 h-16 rounded-lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Properties</CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate('/properties')}>
          View All
          <ArrowUpRight className="w-4 h-4 ml-2" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {(recentProperties || []).map((property: PropertyData) => (
            <div 
              key={property.id} 
              className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => navigate(`/property/${property.id}/edit`)}
            >
              <img
                src={property.images?.[0]?.url || '/placeholder.svg'}
                alt={property.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-medium">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.price}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
