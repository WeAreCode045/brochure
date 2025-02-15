
import { PropertyDetails } from "../PropertyDetails";
import { WebViewSectionProps } from "../types";

export function DetailsSection({ property, settings }: WebViewSectionProps) {
  console.log('Property details:', property);

  return (
    <div className="space-y-4 pb-24">
      <PropertyDetails 
        property={property}
        primaryColor={settings?.secondaryColor}
        settings={settings}
      />
      
      <div className="py-2 px-6 relative">
        {settings?.descriptionBackgroundUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${settings.descriptionBackgroundUrl})`,
              opacity: 0.2
            }}
          />
        )}
        <div className="relative">
          <h3 
            className="text-xl font-semibold mb-2"
            style={{ color: settings?.secondaryColor }}
          >
            Description
          </h3>
          <p className="text-gray-600 text-[13px] leading-relaxed whitespace-pre-wrap">{property.description}</p>
        </div>
      </div>

      {property.features && property.features.length > 0 && (
        <div className="px-6 py-2 mb-4">
          <h3 
            className="text-xl font-semibold mb-2"
            style={{ color: settings?.secondaryColor }}
          >
            Features
          </h3>
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
