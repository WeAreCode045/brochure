
import { Card } from "@/components/ui/card";
import { PropertyData } from "@/types/property";
import { Home, Car, Calendar, Ruler, Zap } from "lucide-react";

interface DetailsPageProps {
  data: PropertyData;
}

export function DetailsPage({ data }: DetailsPageProps) {
  const getEnergyLabelColor = (label: string) => {
    const colors: { [key: string]: string } = {
      'A+++': 'bg-green-600',
      'A++': 'bg-green-500',
      'A+': 'bg-green-400',
      'A': 'bg-green-300',
      'B': 'bg-lime-400',
      'C': 'bg-yellow-400',
      'D': 'bg-orange-400',
      'E': 'bg-orange-500',
      'F': 'bg-red-400',
      'G': 'bg-red-500',
    };
    return colors[label] || 'bg-gray-400';
  };

  return (
    <div className="space-y-8">
      {/* Key Features */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-estate-50 rounded-xl p-6 flex flex-col items-center">
          <Home className="w-8 h-8 text-estate-600 mb-3" />
          <p className="text-estate-500 text-sm mb-1">Woonoppervlak</p>
          <p className="text-xl font-semibold text-estate-700">{data.livingArea} m²</p>
        </div>
        <div className="bg-estate-50 rounded-xl p-6 flex flex-col items-center">
          <Ruler className="w-8 h-8 text-estate-600 mb-3" />
          <p className="text-estate-500 text-sm mb-1">Perceel</p>
          <p className="text-xl font-semibold text-estate-700">{data.sqft} m²</p>
        </div>
        <div className="bg-estate-50 rounded-xl p-6 flex flex-col items-center">
          <Calendar className="w-8 h-8 text-estate-600 mb-3" />
          <p className="text-estate-500 text-sm mb-1">Bouwjaar</p>
          <p className="text-xl font-semibold text-estate-700">{data.buildYear}</p>
        </div>
        <div className="bg-estate-50 rounded-xl p-6 flex flex-col items-center">
          <Car className="w-8 h-8 text-estate-600 mb-3" />
          <p className="text-estate-500 text-sm mb-1">Garages</p>
          <p className="text-xl font-semibold text-estate-700">{data.garages}</p>
        </div>
      </div>

      {/* Additional Details */}
      <Card className="p-6 bg-white shadow-sm">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-estate-500 text-sm mb-2">Slaapkamers</p>
            <p className="text-2xl font-semibold text-estate-700">{data.bedrooms}</p>
          </div>
          <div className="text-center border-x border-estate-100">
            <p className="text-estate-500 text-sm mb-2">Badkamers</p>
            <p className="text-2xl font-semibold text-estate-700">{data.bathrooms}</p>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-estate-600" />
                <p className="text-estate-500 text-sm">Energielabel</p>
              </div>
              <div className={`px-4 py-1 rounded-full text-white font-semibold ${getEnergyLabelColor(data.energyLabel)}`}>
                {data.energyLabel}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Location and Description */}
      <div className="space-y-6">
        <Card className="p-6 bg-white shadow-sm">
          <h3 className="text-xl font-semibold text-estate-700 mb-3">Locatie</h3>
          <p className="text-estate-600 leading-relaxed">{data.address}</p>
        </Card>

        <div className="bg-[#D3E4FD] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-estate-700 mb-3">Beschrijving</h3>
          <p className="text-sm text-estate-600 whitespace-pre-wrap leading-relaxed">{data.description}</p>
        </div>
      </div>
    </div>
  );
}
