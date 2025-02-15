
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrCreateWebViewUrl } from "@/utils/webViewUtils";
import { PropertyQROverlay } from "./PropertyQROverlay";
import { ArrowUpRight, Pencil, Trash } from "lucide-react";

interface PropertyCardProps {
  property: any;
  onDelete: (id: string) => void;
}

export const PropertyCard = ({
  property,
  onDelete,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebViewUrl = async () => {
      const url = await getOrCreateWebViewUrl(property.id);
      if (url) {
        setWebViewUrl(url);
      }
    };
    
    fetchWebViewUrl();
  }, [property.id]);

  return (
    <>
      <Card key={property.id} className="p-6 space-y-6 relative group">
        {property.images?.[0] && (
          <div className="relative">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            {webViewUrl && (
              <PropertyQROverlay
                webViewUrl={webViewUrl}
                showQR={showQR}
                onMouseEnter={() => setShowQR(true)}
                onMouseLeave={() => setShowQR(false)}
              />
            )}
          </div>
        )}

        <div>
          <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
          <p className="text-lg font-medium">{property.price}</p>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate(`/property/${property.id}/webview`)}
            title="Open Preview"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate(`/property/${property.id}/edit`)}
            title="Bewerk"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="icon"
            onClick={() => onDelete(property.id)}
            title="Verwijder"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </>
  );
};
