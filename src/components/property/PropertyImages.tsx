
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface PropertyImagesProps {
  images: string[];
  floorplans: string[];
  featuredImage: string | null;
  gridImages: string[];
  areaPhotos?: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFloorplanUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAreaPhotosUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  onRemoveFloorplan: (index: number) => void;
  onRemoveAreaPhoto: (index: number) => void;
  onSetFeaturedImage: (url: string | null) => void;
  onToggleGridImage: (gridImages: string[]) => void;
}

export function PropertyImages({
  images,
  floorplans,
  featuredImage,
  gridImages,
  areaPhotos = [],
  onImageUpload,
  onFloorplanUpload,
  onAreaPhotosUpload,
  onRemoveImage,
  onRemoveFloorplan,
  onRemoveAreaPhoto,
  onSetFeaturedImage,
  onToggleGridImage
}: PropertyImagesProps) {
  // Helper function to check if an image is in a specific grid position
  const isImageInPosition = (url: string, position: number) => {
    return gridImages[position - 1] === url;
  };

  // Helper function to handle grid position selection
  const handleGridPosition = (url: string, position: number) => {
    const newGridImages = [...gridImages];
    const positionIndex = position - 1;

    // Ensure array has enough slots
    while (newGridImages.length < position) {
      newGridImages.push('');
    }

    // If clicking the same position where image already is, remove it
    if (newGridImages[positionIndex] === url) {
      newGridImages[positionIndex] = '';
    } else {
      // Remove the image from its current position if it exists elsewhere
      const currentPosition = newGridImages.indexOf(url);
      if (currentPosition !== -1) {
        newGridImages[currentPosition] = '';
      }

      // Add image to new position
      newGridImages[positionIndex] = url;
    }

    // Clean up empty strings at the end of array
    while (newGridImages.length > 0 && newGridImages[newGridImages.length - 1] === '') {
      newGridImages.pop();
    }

    onToggleGridImage(newGridImages);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Photos (Max 20)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Property photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <div className="absolute bottom-2 left-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => onSetFeaturedImage(url === featuredImage ? null : url)}
                    className={`w-6 h-6 flex items-center justify-center rounded text-xs ${
                      url === featuredImage ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-900 hover:bg-blue-500 hover:text-white'
                    } transition-colors`}
                  >
                    F
                  </button>
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => handleGridPosition(url, num)}
                      className={`w-6 h-6 flex items-center justify-center rounded text-xs ${
                        isImageInPosition(url, num) ? 'bg-green-500 text-white' : 'bg-white/80 text-gray-900 hover:bg-green-500 hover:text-white'
                      } transition-colors`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 w-6 h-6"
                  onClick={() => onRemoveImage(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Input
          type="file"
          onChange={onImageUpload}
          accept="image/*"
          multiple
          className="mt-2"
        />
      </div>

      <div className="space-y-4">
        <Label>Area Photos (Max 6)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {areaPhotos.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Area photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6"
                onClick={() => onRemoveAreaPhoto(index)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        <Input
          type="file"
          onChange={onAreaPhotosUpload}
          accept="image/*"
          multiple
          className="mt-2"
        />
      </div>

      <div className="space-y-4">
        <Label>Floorplans (Max 10)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {floorplans.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Floorplan ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6"
                onClick={() => onRemoveFloorplan(index)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        <Input
          type="file"
          onChange={onFloorplanUpload}
          accept="image/*"
          multiple
          className="mt-2"
        />
      </div>
    </div>
  );
}
