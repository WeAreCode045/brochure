
import { PropertyDetails } from "../PropertyDetails";
import { WebViewSectionProps } from "../types";
import { WebViewHeader } from "../WebViewHeader";

export function DetailsSection({ property, settings }: WebViewSectionProps) {
  console.log('Property details:', property);

  return (
    <div className="space-y-6 pb-24">
      <WebViewHeader settings={settings} />
      
      <PropertyDetails 
        property={property}
        primaryColor={settings?.secondaryColor}
        settings={settings}
      />
      
      <div className="p-6" 
        style={{
          backgroundImage: settings?.descriptionBackgroundUrl ? `url(${settings.descriptionBackgroundUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: settings?.descriptionBackgroundUrl ? 'rgba(255, 255, 255, 0.9)' : 'transparent'
        }}>
        <div className={`${settings?.descriptionBackgroundUrl ? 'bg-white/90 p-6 rounded-lg' : ''}`}>
          <h3 className="text-xl font-semibold mb-4">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{property.description}</p>
        </div>
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
