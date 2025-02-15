
import { PropertyData } from "@/types/property";
import { AgencySettings } from "@/types/agency";
import { Mail, Phone, MapPin } from "lucide-react";

interface DetailsPageProps {
  data: PropertyData;
  settings?: AgencySettings;
}

export function DetailsPage({ data, settings }: DetailsPageProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header with agency info and property title */}
      <div className="p-6 border-b flex justify-between items-center">
        <div className="flex items-center gap-6">
          {settings?.logoUrl && (
            <img
              src={settings.logoUrl}
              alt="Agency Logo"
              className="h-12 object-contain"
            />
          )}
          <div className="flex flex-col gap-1 text-sm">
            {settings?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-estate-600" />
                <span>{settings.phone}</span>
              </div>
            )}
            {settings?.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-estate-600" />
                <span>{settings.email}</span>
              </div>
            )}
            {settings?.address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-estate-600" />
                <span>{settings.address}</span>
              </div>
            )}
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-estate-800">{data.title}</h1>
      </div>

      {/* Description */}
      <div className="p-6">
        <p className="text-estate-700 whitespace-pre-wrap leading-relaxed">
          {data.description}
        </p>
      </div>

      {/* Features Table */}
      <div className="px-6">
        <div 
          className="rounded-lg overflow-hidden"
          style={{ backgroundColor: settings?.primaryColor || '#475569' }}
        >
          <table className="w-full">
            <tbody>
              {data.features.map((feature, index) => (
                <tr 
                  key={feature.id}
                  className={index !== data.features.length - 1 ? "border-b border-white/20" : ""}
                >
                  <td className="py-3 px-4 text-white">
                    {feature.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t bg-estate-50 flex justify-between items-center">
        <span className="font-semibold text-estate-600">
          {data.title}
        </span>
        <span className="text-sm text-estate-500">2</span>
      </div>
    </div>
  );
}
