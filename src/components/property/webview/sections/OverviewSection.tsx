
import { WebViewSectionProps } from "../types";
import { WebViewHeader } from "../WebViewHeader";
import { WebViewImageGrid } from "../WebViewImageGrid";

export function OverviewSection({ property, settings }: WebViewSectionProps) {
  return (
    <div className="relative h-full">
      <WebViewHeader settings={settings} />

      <div className="space-y-4 mt-2">
        {property.featuredImage && (
          <>
            <div className="relative px-6">
              <img
                src={property.featuredImage}
                alt={property.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>

            <WebViewImageGrid images={property.gridImages} settings={settings} isLocationGrid={false} />

            <div 
              className="relative py-4 px-6 shadow-lg w-full"
              style={{ backgroundColor: settings?.primaryColor || '#40497A' }}
            >
              {/* Left fold */}
              <div 
                className="absolute left-0 bottom-[-20px] h-[20px] w-[20px]"
                style={{ 
                  backgroundColor: settings?.primaryColor ? `${settings.primaryColor}99` : '#40497A99',
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                }}
              />
              {/* Right fold */}
              <div 
                className="absolute right-0 bottom-[-20px] h-[20px] w-[20px]"
                style={{ 
                  backgroundColor: settings?.primaryColor ? `${settings.primaryColor}99` : '#40497A99',
                  clipPath: 'polygon(0 0, 0 100%, 100% 0)'
                }}
              />
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white uppercase">
                  {property.title}
                </h1>
                <p className="text-2xl font-bold text-white">€ {property.price}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
