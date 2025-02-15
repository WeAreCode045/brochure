
import { WebViewSectionProps } from "../types";

export function NeighborhoodSection({ property, settings }: WebViewSectionProps) {
  return (
    <div className="space-y-4 px-6 pb-24">
      <div className="relative">
        <h3 
          className="text-xl font-semibold mb-4"
          style={{ color: settings?.secondaryColor }}
        >
          Location
        </h3>
        <div className="text-gray-600 text-[13px] leading-relaxed mb-6">
          <p>This property is located in a vibrant neighborhood with easy access to local amenities.</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Transportation</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Public transit nearby</li>
                <li>Easy highway access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-gray-700">Amenities</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Shopping centers</li>
                <li>Schools and parks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full h-[300px] rounded-lg overflow-hidden">
        {settings?.googleMapsApiKey ? (
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=${settings.googleMapsApiKey}&q=${encodeURIComponent(property.address)}`}
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            Please add a Google Maps API key in Settings &gt; Advanced to view the map
          </div>
        )}
      </div>
    </div>
  );
}
