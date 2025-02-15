
interface WebViewImageGridProps {
  images: string[];
  settings?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
  isLocationGrid?: boolean;
}

export function WebViewImageGrid({ images, settings, isLocationGrid = false }: WebViewImageGridProps) {
  if (!images || images.length === 0) return null;

  const overlayColor = isLocationGrid 
    ? settings?.primaryColor || '#E2E8F0'
    : settings?.secondaryColor || '#E2E8F0';
  const overlayStyle = { backgroundColor: `${overlayColor}A6` }; // A6 adds 65% opacity

  const gridClass = isLocationGrid ? "grid-cols-3" : "grid-cols-4";

  return (
    <div className={`grid ${gridClass} gap-4 px-6`}>
      {images.slice(0, 4).map((image, index) => (
        <div key={index} className="relative shadow-lg rounded-lg">
          <img
            src={image}
            alt={`Grid ${index + 1}`}
            className="w-full aspect-[4/3] object-cover rounded-lg"
          />
          <div 
            className="absolute inset-0 rounded-lg"
            style={overlayStyle}
          />
        </div>
      ))}
    </div>
  );
}
