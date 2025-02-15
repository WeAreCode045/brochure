import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PropertyDetails } from "./property/PropertyDetails";
import { PropertyFeatures } from "./property/PropertyFeatures";
import { PropertyDescription } from "./property/PropertyDescription";
import { PropertyImages } from "./property/PropertyImages";
import { PropertyAreas } from "./property/PropertyAreas";
import { useParams } from "react-router-dom";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useFeatures } from "@/hooks/useFeatures";
import type { PropertySubmitData } from "@/types/property";
import { Json } from "@/integrations/supabase/types";

interface PropertyFormProps {
  onSubmit: (data: PropertySubmitData) => void;
}

export function PropertyForm({ onSubmit }: PropertyFormProps) {
  const { id } = useParams();
  const { toast } = useToast();
  const { formData, setFormData } = usePropertyForm(id, onSubmit);
  const { uploadFile } = useFileUpload();
  const { addFeature, removeFeature, updateFeature } = useFeatures(formData, setFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const files = Array.from(e.target.files);
        const uploadPromises = files.map(async (file) => {
          const url = await uploadFile(file);
          return url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...uploadedUrls]
        }));

        toast({
          title: "Success",
          description: "Images uploaded successfully",
          variant: "default",
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

  const handleFloorplanUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const files = Array.from(e.target.files);
        const uploadPromises = files.map(async (file) => {
          const url = await uploadFile(file);
          return url;
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        
        setFormData(prev => ({
          ...prev,
          floorplans: [...prev.floorplans, ...uploadedUrls]
        }));

        toast({
          title: "Success",
          description: "Floorplans uploaded successfully",
          variant: "default",
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

  const handleAreaImageUpload = async (areaId: string, files: FileList) => {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const url = await uploadFile(file);
        return url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      setFormData(prev => ({
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

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveFloorplan = (index: number) => {
    setFormData(prev => ({
      ...prev,
      floorplans: prev.floorplans.filter((_, i) => i !== index)
    }));
  };

  const handleSetFeaturedImage = (url: string | null) => {
    setFormData(prev => ({
      ...prev,
      featuredImage: url
    }));
  };

  const handleToggleGridImage = (newGridImages: string[]) => {
    setFormData(prev => ({
      ...prev,
      gridImages: newGridImages
    }));
  };

  const addArea = () => {
    setFormData(prev => ({
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
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.filter(area => area.id !== id)
    }));
  };

  const updateArea = (id: string, field: keyof PropertyArea, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.map(area => 
        area.id === id ? { ...area, [field]: value } : area
      )
    }));
  };

  const removeAreaImage = (areaId: string, imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.map(area => 
        area.id === areaId
          ? { ...area, images: area.images.filter(url => url !== imageUrl) }
          : area
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Title is required.",
        variant: "destructive",
      });
      return;
    }

    try {
      const submitData: PropertySubmitData = {
        ...formData,
        features: formData.features as unknown as Json,
        featuredImage: formData.featuredImage,
        gridImages: formData.gridImages
      };

      await onSubmit(submitData);
      
      toast({
        title: "Success",
        description: "Property saved successfully",
        variant: "default",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to save property",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl p-6 space-y-6 animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-6">
        <PropertyDetails
          {...formData}
          onChange={handleInputChange}
        />

        <PropertyDescription
          description={formData.description}
          onChange={handleInputChange}
        />

        <PropertyFeatures
          features={formData.features}
          onAdd={addFeature}
          onRemove={removeFeature}
          onUpdate={updateFeature}
        />

        <PropertyAreas
          areas={formData.areas || []}
          onAdd={addArea}
          onRemove={removeArea}
          onUpdate={updateArea}
          onImageUpload={handleAreaImageUpload}
          onImageRemove={removeAreaImage}
        />

        <PropertyImages
          images={formData.images}
          floorplans={formData.floorplans}
          featuredImage={formData.featuredImage}
          gridImages={formData.gridImages}
          onImageUpload={handleImageUpload}
          onFloorplanUpload={handleFloorplanUpload}
          onRemoveImage={handleRemoveImage}
          onRemoveFloorplan={handleRemoveFloorplan}
          onSetFeaturedImage={handleSetFeaturedImage}
          onToggleGridImage={handleToggleGridImage}
        />

        <Button type="submit">{id ? "Update Property" : "Create Property"}</Button>
      </form>
    </Card>
  );
}
