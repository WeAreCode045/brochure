
import { PropertyDetails } from "../PropertyDetails";
import { WebViewSectionProps } from "../types";
import { WebViewHeader } from "../WebViewHeader";

export function DetailsSection({ property, settings }: WebViewSectionProps) {
  console.log('Property details:', property);

  return (
    <div className="space-y-6">
      <WebViewHeader settings={settings} />
      
      <PropertyDetails 
        property={property}
        primaryColor={settings?.secondaryColor}
      />
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Description</h3>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{property.description}</p>
      </div>

      {property.features && property.features.length > 0 && (
        <div className="p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg text-xs"
            style={{ 
              backgroundColor: settings?.primaryColor || '#0EA5E9',
            }}
          >
            {property.features.map((feature, index) => (
              <div key={feature.id || index} className="flex items-start gap-2">
                <div 
                  className="w-1.5 h-1.5 mt-1.5 rounded-full bg-white"
                />
                <span className="text-white">{feature.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
