
import { PropertyForm } from "./PropertyForm";
import type { PropertySubmitData } from "@/types/property";

interface EditPropertyFormProps {
  onSubmit: (data: PropertySubmitData) => Promise<void>;
}

export function EditPropertyForm({ onSubmit }: EditPropertyFormProps) {
  return <PropertyForm onSubmit={onSubmit} />;
}
