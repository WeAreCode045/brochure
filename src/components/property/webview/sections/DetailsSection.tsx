
import { PropertyDetails } from "../PropertyDetails";
import { WebViewSectionProps } from "../types";
import { WebViewHeader } from "../WebViewHeader";

export function DetailsSection({ property, settings }: WebViewSectionProps) {
  console.log('Property details:', property); // Add logging to debug

  return (
    <div className="space-y-6">
      <WebViewHeader settings={settings} />
      
      <PropertyDetails 
        property={property}
        primaryColor={settings?.secondaryColor}
      />
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Description</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{property.description}</p>
      </div>

      {property.features && property.features.length > 0 && (
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.features.map((feature, index) => (
              <div key={feature.id || index} className="flex items-start gap-2">
                <div 
                  className="w-2 h-2 mt-2 rounded-full"
                  style={{ backgroundColor: settings?.secondaryColor }}
                />
                <span>{feature.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
