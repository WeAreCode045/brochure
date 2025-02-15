
interface WebViewImageGridProps {
  images: string[];
  settings?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}

export function WebViewImageGrid({ images, settings }: WebViewImageGridProps) {
  if (!images || images.length === 0) return null;

  const overlayColor = settings?.primaryColor || '#E2E8F0';
  const overlayStyle = { backgroundColor: `${overlayColor}80` }; // 80 adds 50% opacity

  return (
    <div className="grid grid-cols-4 gap-4 px-6">
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
