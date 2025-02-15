
import { CalendarDays, Ruler, Home, Bed, Bath, Car } from "lucide-react";
import { PropertyData } from "@/types/property";

interface PropertyDetailsProps {
  property: PropertyData;
  primaryColor?: string;
}

export function PropertyDetails({ property, primaryColor }: PropertyDetailsProps) {
  const detailsConfig = [
    { icon: CalendarDays, label: "Build Year", value: property.buildYear },
    { icon: Home, label: "Living Area", value: `${property.livingArea} m²` },
    { icon: Ruler, label: "Plot Size", value: `${property.sqft} m²` },
    { icon: Bed, label: "Bedrooms", value: property.bedrooms },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
    { icon: Car, label: "Garages", value: property.garages }
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {detailsConfig.map((detail, index) => (
        <div
          key={index}
          className="p-4 rounded-lg text-center flex flex-col items-center justify-center"
          style={{ backgroundColor: primaryColor }}
        >
          <detail.icon className="w-5 h-5 text-white mb-2" />
          <p className="text-white font-bold text-xs mb-1">{detail.label}</p>
          <p className="text-white font-bold text-sm">{detail.value}</p>
        </div>
      ))}
    </div>
  );
}
