
import { AgencySettings } from "@/types/agency";
import { ElementsSettings } from "./ElementsSettings";
import { TypographySettings } from "./TypographySettings";
import { IconSettings } from "./IconSettings";
import { LogoUpload } from "./LogoUpload";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DesignTabProps {
  settings: AgencySettings;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onTypographyChange: (element: string, field: string, value: string) => void;
  onDescriptionBackgroundUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function DesignTab({ 
  settings, 
  onChange, 
  onSelectChange, 
  onTypographyChange,
  onDescriptionBackgroundUpload 
}: DesignTabProps) {
  return (
    <div className="space-y-8">
      <ElementsSettings
        settings={settings}
        onChange={onChange}
      />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="descriptionBackground">Description Background Image</Label>
          <Input
            id="descriptionBackground"
            name="descriptionBackground"
            type="file"
            onChange={onDescriptionBackgroundUpload}
            accept="image/*"
          />
          {settings.descriptionBackgroundUrl && (
            <div className="mt-2">
              <img
                src={settings.descriptionBackgroundUrl}
                alt="Description Background"
                className="h-32 w-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <TypographySettings
        settings={settings}
        onChange={onChange}
        onTypographyChange={onTypographyChange}
      />
      <IconSettings
        settings={settings}
        onSelectChange={onSelectChange}
      />
    </div>
  );
}
