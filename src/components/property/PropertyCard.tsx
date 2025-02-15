
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOrCreateWebViewUrl } from "@/utils/webViewUtils";
import { PropertyQROverlay } from "./PropertyQROverlay";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowUpRight, 
  Pencil, 
  Trash, 
  Bell,
  CheckCircle,
  Clock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface PropertyCardProps {
  property: any;
  onDelete: (id: string) => void;
}

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export const PropertyCard = ({
  property,
  onDelete,
}: PropertyCardProps) => {
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchWebViewUrl = async () => {
      const url = await getOrCreateWebViewUrl(property.id);
      if (url) {
        setWebViewUrl(url);
      }
    };
    
    fetchWebViewUrl();
    fetchSubmissions();

    // Subscribe to new submissions
    const channel = supabase
      .channel('property_submissions')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'property_contact_submissions',
          filter: `property_id=eq.${property.id}`,
        },
        () => {
          fetchSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [property.id]);

  const fetchSubmissions = async () => {
    const { data } = await supabase
      .from('property_contact_submissions')
      .select('*')
      .eq('property_id', property.id)
      .order('created_at', { ascending: false });

    if (data) {
      setSubmissions(data);
      setUnreadCount(data.filter(s => !s.is_read).length);
    }
  };

  const markAsRead = async (submissionId: string) => {
    await supabase
      .from('property_contact_submissions')
      .update({ is_read: true })
      .eq('id', submissionId);
    
    fetchSubmissions();
  };

  const getInquiryTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'information': 'Meer informatie',
      'viewing': 'Bezichtiging',
      'offer': 'Bod'
    };
    return types[type] || type;
  };

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
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSubmissions(true)}
            className="relative"
            title="Berichten"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </div>
      </Card>

      <Dialog open={showSubmissions} onOpenChange={setShowSubmissions}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Berichten voor {property.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Geen berichten gevonden</p>
            ) : (
              submissions.map((submission) => (
                <div 
                  key={submission.id} 
                  className={`p-4 rounded-lg border ${submission.is_read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{submission.name}</h4>
                      <p className="text-sm text-gray-600">{getInquiryTypeLabel(submission.inquiry_type)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {format(new Date(submission.created_at), 'dd/MM/yyyy HH:mm')}
                      </span>
                      {!submission.is_read && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markAsRead(submission.id)}
                          className="h-8"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Markeer als gelezen
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                    <p>
                      <span className="text-gray-600">E-mail:</span>{" "}
                      <a href={`mailto:${submission.email}`} className="text-blue-600 hover:underline">
                        {submission.email}
                      </a>
                    </p>
                    <p>
                      <span className="text-gray-600">Telefoon:</span>{" "}
                      <a href={`tel:${submission.phone}`} className="text-blue-600 hover:underline">
                        {submission.phone}
                      </a>
                    </p>
                  </div>
                  {submission.message && (
                    <p className="text-sm mt-2 text-gray-700">{submission.message}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
