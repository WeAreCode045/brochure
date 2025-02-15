
import { useAgencySettings } from "@/hooks/useAgencySettings";
import { usePropertyWebView } from "./webview/usePropertyWebView";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PropertyData } from "@/types/property";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { PropertyWebViewContent } from "./webview/PropertyWebViewContent";
import { PropertyBreadcrumb } from "./webview/PropertyBreadcrumb";

interface PropertyWebViewProps {
  property?: PropertyData;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
}

export function PropertyWebView({ property, open, onOpenChange }: PropertyWebViewProps = {}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings } = useAgencySettings();
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  
  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching property:', error);
          return;
        }

        if (data) {
          setPropertyData(data);
        }
      }
    };

    if (id) {
      fetchProperty();
    } else if (property) {
      setPropertyData(property);
    }
  }, [id, property]);
  
  const {
    selectedImage,
    setSelectedImage,
    currentPage,
    setCurrentPage,
    handleShare,
    handlePrint
  } = usePropertyWebView();

  if (!propertyData) {
    return <div>Loading...</div>;
  }

  if (typeof open !== 'undefined' && onOpenChange) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[595px] h-[842px] p-0 overflow-hidden">
          <DialogTitle className="sr-only">Property View</DialogTitle>
          <PropertyWebViewContent 
            property={propertyData}
            settings={settings}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            handleShare={handleShare}
            handlePrint={handlePrint}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="max-w-[595px] h-[842px] mx-auto my-8 bg-white shadow-lg overflow-hidden">
      <PropertyBreadcrumb 
        title={propertyData.title}
        onBack={() => navigate('/')}
      />
      <PropertyWebViewContent 
        property={propertyData}
        settings={settings}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        handleShare={handleShare}
        handlePrint={handlePrint}
      />
    </div>
  );
}
