
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { usePropertyImages } from "@/hooks/usePropertyImages";
import { usePropertyAreas } from "@/hooks/usePropertyAreas";
import { usePropertyFormSubmit } from "@/hooks/usePropertyFormSubmit";
import { useFeatures } from "@/hooks/useFeatures";
import { usePropertyAutosave } from "@/hooks/usePropertyAutosave";
import type { PropertyFormData } from "@/types/property";
import { steps } from "./property/form/formSteps";
import { FormStepNavigation } from "./property/form/FormStepNavigation";
import { useFormSteps } from "@/hooks/useFormSteps";
import { PropertyFormContent } from "./property/form/PropertyFormContent";

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
}

export function PropertyForm({ onSubmit }: PropertyFormProps) {
  const { id } = useParams();
  const { formData, setFormData, isLoading } = usePropertyForm(id, onSubmit);
  const { addFeature, removeFeature, updateFeature } = useFeatures(formData, setFormData);
  const { handleSubmit } = usePropertyFormSubmit(onSubmit);
  const { autosaveData } = usePropertyAutosave();
  
  const {
    handleImageUpload,
    handleAreaPhotosUpload,
    handleFloorplanUpload,
    handleRemoveImage: handleRemoveImageById,
    handleRemoveAreaPhoto,
    handleRemoveFloorplan,
    handleSetFeaturedImage,
    handleToggleGridImage
  } = usePropertyImages(formData, setFormData);

  const handleRemoveImage = (index: number) => {
    const imageToRemove = formData.images[index];
    if (imageToRemove) {
      handleRemoveImageById(imageToRemove.id);
    }
  };

  const {
    handleAreaImageUpload,
    addArea,
    removeArea,
    updateArea,
    removeAreaImage
  } = usePropertyAreas(formData, setFormData);

  const { currentStep, handleNext, handlePrevious, handleStepClick } = useFormSteps(
    formData,
    () => autosaveData(formData),
    steps.length
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMapImageDelete = async () => {
    setFormData({ ...formData, map_image: null });
  };

  if (!formData || isLoading) {
    return null;
  }

  return (
    <Card className="w-full p-6 animate-fadeIn">
      <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-6">
        <FormStepNavigation
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isUpdateMode={!!id}
        />
        <PropertyFormContent 
          formData={formData}
          onSubmit={(e) => handleSubmit(e, formData)}
          currentStep={currentStep}
          addFeature={addFeature}
          removeFeature={removeFeature}
          updateFeature={updateFeature}
          handleInputChange={handleInputChange}
          handleImageUpload={handleImageUpload}
          handleAreaPhotosUpload={handleAreaPhotosUpload}
          handleFloorplanUpload={handleFloorplanUpload}
          handleRemoveImage={handleRemoveImage}
          handleRemoveAreaPhoto={handleRemoveAreaPhoto}
          handleRemoveFloorplan={handleRemoveFloorplan}
          handleSetFeaturedImage={handleSetFeaturedImage}
          handleToggleGridImage={handleToggleGridImage}
          addArea={addArea}
          removeArea={removeArea}
          updateArea={updateArea}
          handleAreaImageUpload={handleAreaImageUpload}
          removeAreaImage={removeAreaImage}
          handleMapImageDelete={handleMapImageDelete}
        />
      </form>
    </Card>
  );
}
