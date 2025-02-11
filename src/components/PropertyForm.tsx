import { useState, useEffect, Key } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PropertyDetails } from "./property/PropertyDetails";
import { PropertyFeatures } from "./property/PropertyFeatures";
import { PropertyDescription } from "./property/PropertyDescription";
import { PropertyImages } from "./property/PropertyImages";
import { supabase } from "@/lib/supabase";

export interface PropertyFeature {
  id: string;
  description: string;
}

export interface PropertyData {
  id: Key;
  title: string;
  price: string;
  address: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  livingArea: string;
  buildYear: string;
  garages: string;
  energyLabel: string;
  description: string;
  features: PropertyFeature[];
  images: string[];
  floorplans: string[];
}

interface PropertyFormProps {
  onSubmit: (data: PropertyData) => void;
  initialData?: PropertyData;
}
export function PropertyForm({ onSubmit, initialData }: PropertyFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PropertyData>({
    id: "",
    title: "",
    price: "",
    address: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    livingArea: "",
    buildYear: "",
    garages: "",
    energyLabel: "",
    description: "",
    features: [],
    images: [],
    floorplans: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (newImages.length > 20) {
        toast({
          title: "Te veel afbeeldingen",
          description: "Selecteer maximaal 20 afbeeldingen",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, images: newImages.map(file => file.name) }));
    }
  };
  const handleFloorplanUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFloorplans = Array.from(e.target.files);
      if (newFloorplans.length > 10) {
        toast({
          title: "Te veel plattegronden",
          description: "Selecteer maximaal 10 plattegronden",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, floorplans: newFloorplans.map(file => file.name) }));
    }
  };
  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { id: Date.now().toString(), description: "" }],
    }));
  };

  const removeFeature = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature.id !== id),
    }));
  };

  const updateFeature = (id: string, description: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature) =>
        feature.id === id ? { ...feature, description } : feature
      ),
    }));
  };

  const uploadFiles = async (files: File[], bucket: string) => {
    const uploadPromises = files.map(async (file) => {
      const { data, error } = await supabase.storage.from(bucket).upload(file.name, file);
      if (error) throw error;
      return data.path;
    });
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrls = await uploadFiles(formData.images.map(name => new File([], name)), 'property-images');
      const floorplanUrls = await uploadFiles(formData.floorplans.map(name => new File([], name)), 'property-floorplans');

      const propertyData = {
        ...formData,
        images: imageUrls,
        floorplans: floorplanUrls,
      };

      const { error } = await supabase.from('properties').insert([propertyData]);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Property saved successfully",
      });

      onSubmit(propertyData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save property",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

        <PropertyImages
          onImageUpload={handleImageUpload}
          onFloorplanUpload={handleFloorplanUpload}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Genereer Brochure"}
        </Button>
      </form>
    </Card>
  );
}
