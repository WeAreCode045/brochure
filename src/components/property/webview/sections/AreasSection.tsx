
import { WebViewSectionProps } from "../types";

export function AreasSection({ property, settings }: WebViewSectionProps) {
  if (!property.areas || property.areas.length === 0) return null;

  // Calculate which areas should be shown on this page based on the page number
  const pageMatch = property.currentPath?.match(/areas-(\d+)/);
  const pageIndex = pageMatch ? parseInt(pageMatch[1]) : 0;
  const startIndex = pageIndex * 2;
  const areasForThisPage = property.areas.slice(startIndex, startIndex + 2);

  const getImageUrl = (imageId: string): string | undefined => {
    return property.images.find(img => img.id === imageId)?.url;
  };

  return (
    <div className="space-y-4 pb-24">
      <div className="px-6 space-y-8">
        {areasForThisPage.map((area, index) => (
          <div key={index} className="space-y-4">
            <div>
              <h3 
                className="text-xl font-semibold mb-2"
                style={{ color: settings?.secondaryColor }}
              >
                {area.title}
              </h3>
              <p className="text-gray-600 text-[13px] leading-relaxed whitespace-pre-wrap">
                {area.description}
              </p>
            </div>

            {area.imageIds && area.imageIds.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {area.imageIds.map((imageId, imgIndex) => {
                  const imageUrl = getImageUrl(imageId);
                  if (!imageUrl) return null;

                  return (
                    <img
                      key={imgIndex}
                      src={imageUrl}
                      alt={`${area.title} ${imgIndex + 1}`}
                      className="w-full aspect-video object-cover rounded-lg"
                    />
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
