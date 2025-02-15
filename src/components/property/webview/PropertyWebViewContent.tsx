
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PropertyData } from "@/types/property";
import { AgencySettings } from "@/types/agency";
import { WebViewFooter } from "./WebViewFooter";
import { OverviewSection } from "./sections/OverviewSection";
import { DetailsSection } from "./sections/DetailsSection";
import { FloorplansSection } from "./sections/FloorplansSection";
import { ContactSection } from "./sections/ContactSection";
import { AreasSection } from "./sections/AreasSection";
import { WebViewHeader } from "./WebViewHeader";

interface PropertyWebViewContentProps {
  property: PropertyData;
  settings: AgencySettings;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedImage: string | null;
  setSelectedImage: (image: string | null) => void;
  handleShare: (platform: string) => Promise<void>;
  handlePrint: () => void;
}

export function PropertyWebViewContent({
  property,
  settings,
  currentPage,
  setCurrentPage,
  selectedImage,
  setSelectedImage,
  handleShare,
  handlePrint
}: PropertyWebViewContentProps) {
  const key = `page-${currentPage}`;

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-4">
          <WebViewHeader settings={settings} />
          <OverviewSection key={key} property={property} settings={settings} />
        </div>
      )
    },
    {
      id: 'details',
      title: 'Details',
      content: <DetailsSection key={key} property={property} settings={settings} />
    },
    {
      id: 'floorplans',
      title: 'Floorplans',
      content: (
        <div className="space-y-4">
          <WebViewHeader settings={settings} />
          <FloorplansSection key={key} property={property} settings={settings} />
        </div>
      )
    }
  ];

  // Add area sections if there are areas
  if (property.areas && property.areas.length > 0) {
    const areaPages = Math.ceil(property.areas.length / 2);
    for (let i = 0; i < areaPages; i++) {
      sections.push({
        id: `areas-${i}`,
        title: `Areas ${i + 1}`,
        content: (
          <div className="space-y-4">
            <WebViewHeader settings={settings} />
            <AreasSection 
              key={`${key}-areas-${i}`} 
              property={{
                ...property,
                currentPath: `areas-${i}`
              }} 
              settings={settings} 
            />
          </div>
        )
      });
    }
  }

  sections.push({
    id: 'contact',
    title: 'Contact',
    content: (
      <div className="space-y-4">
        <WebViewHeader settings={settings} />
        <ContactSection key={key} property={property} settings={settings} />
      </div>
    )
  });

  const filteredSections = sections.filter(section => {
    if (section.id === 'floorplans' && (!property.floorplans || property.floorplans.length === 0)) return false;
    return true;
  });

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {filteredSections[currentPage]?.content}
        </div>

        <WebViewFooter 
          currentPage={currentPage}
          totalPages={filteredSections.length}
          onPrevious={() => setCurrentPage(currentPage - 1)}
          onNext={() => setCurrentPage(currentPage + 1)}
          onShare={(platform) => handleShare(platform)}
          onPrint={handlePrint}
        />
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
