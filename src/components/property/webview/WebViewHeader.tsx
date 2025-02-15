
import { Mail, Phone, MapPin } from "lucide-react";
import { AgencySettings } from "@/types/agency";

interface WebViewHeaderProps {
  settings?: AgencySettings;
}

export function WebViewHeader({ settings }: WebViewHeaderProps) {
  return (
    <div className="p-4 flex justify-between items-center bg-white shadow-sm rounded-lg">
      <div>
        {settings?.logoUrl && (
          <img
            src={settings.logoUrl}
            alt="Agency Logo"
            className="w-[120px] h-auto object-contain" // Reduced from 150px to 120px
          />
        )}
      </div>
      <div className="flex items-center gap-4 text-[10px]"> {/* Changed from text-sm to text-[10px] */}
        {settings?.address && (
          <div className="flex items-center gap-1">
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: settings?.secondaryColor }}
            >
              <MapPin className="w-3 h-3 text-white" />
            </div>
            <span className="text-gray-600">{settings.address}</span>
          </div>
        )}
        {settings?.phone && (
          <div className="flex items-center gap-1">
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: settings?.secondaryColor }}
            >
              <Phone className="w-3 h-3 text-white" />
            </div>
            <span className="text-gray-600">{settings.phone}</span>
          </div>
        )}
        {settings?.email && (
          <div className="flex items-center gap-1">
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: settings?.secondaryColor }}
            >
              <Mail className="w-3 h-3 text-white" />
            </div>
            <span className="text-gray-600">{settings.email}</span>
          </div>
        )}
      </div>
    </div>
  );
}
