
import { useAgencySettings } from "@/hooks/useAgencySettings";
import { WebViewFooter } from "./webview/WebViewFooter";
import { OverviewSection } from "./webview/sections/OverviewSection";
import { DetailsSection } from "./webview/sections/DetailsSection";
import { PhotosSection } from "./webview/sections/PhotosSection";
import { FloorplansSection } from "./webview/sections/FloorplansSection";
import { ContactSection } from "./webview/sections/ContactSection";
import { usePropertyWebView } from "./webview/usePropertyWebView";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useProperties } from "@/hooks/useProperties";

export function PropertyWebView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { settings } = useAgencySettings();
  const { properties } = useProperties();
  
  const property = properties?.find(p => p.id === id);
  
  const {
    selectedImage,
    setSelectedImage,
    currentPage,
    setCurrentPage,
    handleShare,
    handlePrint
  } = usePropertyWebView();

  if (!property) {
    return <div>Property not found</div>;
  }

  // Force re-render when page changes
  const key = `page-${currentPage}`;

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: <OverviewSection key={key} property={property} settings={settings} />
    },
    {
      id: 'details',
      title: 'Details',
      content: <DetailsSection key={key} property={property} settings={settings} />
    },
    {
      id: 'photos',
      title: 'Photos',
      content: <PhotosSection key={key} property={property} settings={settings} />
    },
    {
      id: 'floorplans',
      title: 'Floorplans',
      content: <FloorplansSection key={key} property={property} settings={settings} />
    },
    {
      id: 'contact',
      title: 'Contact',
      content: <ContactSection key={key} property={property} settings={settings} />
    }
  ];

  const filteredSections = sections.filter(section => {
    if (section.id === 'photos' && (!property.images || property.images.length === 0)) return false;
    if (section.id === 'floorplans' && (!property.floorplans || property.floorplans.length === 0)) return false;
    return true;
  });

  return (
    <>
      <div className="max-w-[595px] h-[842px] mx-auto my-8 bg-white shadow-lg overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {filteredSections[currentPage]?.content}
          </div>

          <WebViewFooter 
            currentPage={currentPage}
            totalPages={filteredSections.length}
            onPrevious={() => setCurrentPage(prev => prev - 1)}
            onNext={() => setCurrentPage(prev => prev + 1)}
            onShare={handleShare}
            onPrint={handlePrint}
          />
        </div>
      </div>

      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-[90vw] max-h-[90vh]">
            <DialogTitle className="sr-only">Image Preview</DialogTitle>
            <img
              src={selectedImage}
              alt="Large view"
              className="w-full h-full object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
