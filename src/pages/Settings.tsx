
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAgencySettings } from "@/hooks/useAgencySettings";
import { SettingsTab } from "@/types/settings";
import { AgencyTab } from "@/components/settings/AgencyTab";
import { DesignTab } from "@/components/settings/DesignTab";
import { AdvancedTab } from "@/components/settings/AdvancedTab";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>("agency");
  const {
    settings,
    logoPreview,
    isLoading,
    handleSubmit,
    handleChange,
    handleSelectChange,
    handleAgentChange,
    handleLogoUpload,
    handleDescriptionBackgroundUpload,
  } = useAgencySettings();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="flex gap-2 mb-6">
        <Button 
          onClick={() => setActiveTab("agency")} 
          variant={activeTab === "agency" ? "default" : "outline"}
        >
          Agency Details
        </Button>
        <Button 
          onClick={() => setActiveTab("design")} 
          variant={activeTab === "design" ? "default" : "outline"}
        >
          Design
        </Button>
        <Button 
          onClick={() => setActiveTab("advanced")} 
          variant={activeTab === "advanced" ? "default" : "outline"}
        >
          Advanced
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {activeTab === "agency" && (
          <AgencyTab
            settings={settings}
            logoPreview={logoPreview}
            onChange={handleChange}
            onLogoUpload={handleLogoUpload}
            onAgentChange={handleAgentChange}
          />
        )}
        
        {activeTab === "design" && (
          <DesignTab
            settings={settings}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            onDescriptionBackgroundUpload={handleDescriptionBackgroundUpload}
          />
        )}
        
        {activeTab === "advanced" && (
          <AdvancedTab
            settings={settings}
            onChange={handleChange}
          />
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}

export default Settings;
