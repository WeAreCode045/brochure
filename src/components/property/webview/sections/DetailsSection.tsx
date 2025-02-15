
import { PropertyDetails } from "../PropertyDetails";
import { WebViewSectionProps } from "../types";

export function DetailsSection({ property, settings }: WebViewSectionProps) {
  console.log('Property details:', property); // Add logging to debug

  return (
    <div className="space-y-6">
      <PropertyDetails 
        property={property}
        primaryColor={settings?.secondaryColor}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Description</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{property.description}</p>
      </div>
    </div>
  );
}
