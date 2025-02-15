
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PropertyDetails } from "./property/PropertyDetails";
import { PropertyFeatures } from "./property/PropertyFeatures";
import { PropertyDescription } from "./property/PropertyDescription";
import { PropertyImages } from "./property/PropertyImages";
import { PropertyAreas } from "./property/PropertyAreas";
import { useParams } from "react-router-dom";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { usePropertyImages } from "@/hooks/usePropertyImages";
import { usePropertyAreas } from "@/hooks/usePropertyAreas";
import { usePropertyFormSubmit } from "@/hooks/usePropertyFormSubmit";
import { useFeatures } from "@/hooks/useFeatures";
import type { PropertySubmitData } from "@/types/property";

interface PropertyFormProps {
  onSubmit: (data: PropertySubmitData) => void;
}

export function PropertyForm({ onSubmit }: PropertyFormProps) {
  const { id } = useParams();
  const { formData, setFormData } = usePropertyForm(id, onSubmit);
  const { addFeature, removeFeature, updateFeature } = useFeatures(formData, setFormData);
  const { handleSubmit } = usePropertyFormSubmit(onSubmit);
  
  const {
    handleImageUpload,
    handleAreaPhotosUpload,
    handleFloorplanUpload,
    handleRemoveImage,
    handleRemoveAreaPhoto,
    handleRemoveFloorplan,
    handleSetFeaturedImage,
    handleToggleGridImage
  } = usePropertyImages(formData, setFormData);

  const {
    handleAreaImageUpload,
    addArea,
    removeArea,
    updateArea,
    removeAreaImage
  } = usePropertyAreas(formData, setFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!formData) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl p-6 space-y-6 animate-fadeIn">
      <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-6">
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
          areaPhotos={formData.areaPhotos}
          featuredImage={formData.featuredImage}
          gridImages={formData.gridImages}
          onImageUpload={handleImageUpload}
          onAreaPhotosUpload={handleAreaPhotosUpload}
          onFloorplanUpload={handleFloorplanUpload}
          onRemoveImage={handleRemoveImage}
          onRemoveAreaPhoto={handleRemoveAreaPhoto}
          onRemoveFloorplan={handleRemoveFloorplan}
          onSetFeaturedImage={handleSetFeaturedImage}
          onToggleGridImage={handleToggleGridImage}
        />

        <Button type="submit">{id ? "Update Property" : "Create Property"}</Button>
      </form>
    </Card>
  );
}
