
import { useToast } from "@/components/ui/use-toast";
import { useFileUpload } from "@/hooks/useFileUpload";
import type { PropertyFormData } from "@/types/property";

export function usePropertyImages(
  formData: PropertyFormData,
  setFormData: (data: PropertyFormData) => void
) {
  const { toast } = useToast();
  const { uploadFile } = useFileUpload();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const files = Array.from(e.target.files);
        const uploadPromises = files.map(uploadFile);
        const uploadedUrls = await Promise.all(uploadPromises);
        
        setFormData({
          ...formData,
          images: [...formData.images, ...uploadedUrls]
        });
      } catch (error) {
        console.error('Error uploading images:', error);
        toast({
          title: "Error",
          description: "Failed to upload images",
          variant: "destructive",
        });
      }
    }
  };

  const handleAreaPhotosUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const files = Array.from(e.target.files);
        const uploadPromises = files.map(uploadFile);
        const uploadedUrls = await Promise.all(uploadPromises);
        
        setFormData({
          ...formData,
          areaPhotos: [...(formData.areaPhotos || []), ...uploadedUrls]
        });
      } catch (error) {
        console.error('Error uploading area photos:', error);
        toast({
          title: "Error",
          description: "Failed to upload area photos",
          variant: "destructive",
        });
      }
    }
  };

  const handleFloorplanUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const files = Array.from(e.target.files);
        const uploadPromises = files.map(uploadFile);
        const uploadedUrls = await Promise.all(uploadPromises);
        
        setFormData({
          ...formData,
          floorplans: [...formData.floorplans, ...uploadedUrls]
        });
      } catch (error) {
        console.error('Error uploading floorplans:', error);
        toast({
          title: "Error",
          description: "Failed to upload floorplans",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const handleRemoveAreaPhoto = (index: number) => {
    setFormData({
      ...formData,
      areaPhotos: (formData.areaPhotos || []).filter((_, i) => i !== index)
    });
  };

  const handleRemoveFloorplan = (index: number) => {
    setFormData({
      ...formData,
      floorplans: formData.floorplans.filter((_, i) => i !== index)
    });
  };

  const handleSetFeaturedImage = (url: string | null) => {
    setFormData({
      ...formData,
      featuredImage: url
    });
  };

  const handleToggleGridImage = (gridImages: string[]) => {
    setFormData({
      ...formData,
      gridImages
    });
  };

  return {
    handleImageUpload,
    handleAreaPhotosUpload,
    handleFloorplanUpload,
    handleRemoveImage,
    handleRemoveAreaPhoto,
    handleRemoveFloorplan,
    handleSetFeaturedImage,
    handleToggleGridImage
  };
}
