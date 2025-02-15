
import { AgencySettings, Agent } from "@/types/agency";
import { AgencyFields } from "./AgencyFields";
import { LogoUpload } from "./LogoUpload";

interface AgencyTabProps {
  settings: AgencySettings;
  logoPreview: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAgentChange: (agents: Agent[]) => void;
}

export function AgencyTab({ settings, logoPreview, onChange, onLogoUpload, onAgentChange }: AgencyTabProps) {
  return (
    <div className="space-y-6">
      <LogoUpload logoPreview={logoPreview} onLogoUpload={onLogoUpload} />
      <AgencyFields settings={settings} onChange={onChange} onAgentChange={onAgentChange} />
    </div>
  );
}
