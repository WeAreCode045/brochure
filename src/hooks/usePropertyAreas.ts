
import { useToast } from "@/components/ui/use-toast";
import { useFileUpload } from "@/hooks/useFileUpload";
import type { PropertyArea, PropertyFormData } from "@/types/property";

type SetFormDataFunction = (data: PropertyFormData | ((prev: PropertyFormData) => PropertyFormData)) => void;

export function usePropertyAreas(
  formData: PropertyFormData,
  setFormData: SetFormDataFunction
) {
  const { toast } = useToast();
  const { uploadFile } = useFileUpload();

  const handleAreaImageUpload = async (areaId: string, files: FileList) => {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const url = await uploadFile(file);
        return url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      setFormData((prev: PropertyFormData) => ({
        ...prev,
        areas: prev.areas.map(area => 
          area.id === areaId 
            ? { ...area, images: [...area.images, ...uploadedUrls] }
            : area
        )
      }));

      toast({
        title: "Success",
        description: "Area images uploaded successfully",
        variant: "default",
      });
    } catch (error) {
      console.error('Error uploading area images:', error);
      toast({
        title: "Error",
        description: "Failed to upload area images",
        variant: "destructive",
      });
    }
  };

  const addArea = () => {
    setFormData((prev: PropertyFormData) => ({
      ...prev,
      areas: [
        ...prev.areas,
        {
          id: crypto.randomUUID(),
          title: '',
          description: '',
          images: []
        }
      ]
    }));
  };

  const removeArea = (id: string) => {
    setFormData((prev: PropertyFormData) => ({
      ...prev,
      areas: prev.areas.filter(area => area.id !== id)
    }));
  };

  const updateArea = (id: string, field: keyof PropertyArea, value: string | string[]) => {
    setFormData((prev: PropertyFormData) => ({
      ...prev,
      areas: prev.areas.map(area => 
        area.id === id ? { ...area, [field]: value } : area
      )
    }));
  };

  const removeAreaImage = (areaId: string, imageUrl: string) => {
    setFormData((prev: PropertyFormData) => ({
      ...prev,
      areas: prev.areas.map(area => 
        area.id === areaId
          ? { ...area, images: area.images.filter(url => url !== imageUrl) }
          : area
      )
    }));
  };

  return {
    handleAreaImageUpload,
    addArea,
    removeArea,
    updateArea,
    removeAreaImage
  };
}
