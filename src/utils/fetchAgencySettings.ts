
import { supabase } from "@/integrations/supabase/client";
import { AgencySettings, Agent } from "@/types/agency";
import { defaultAgencySettings } from "./defaultAgencySettings";
import { Json } from "@/integrations/supabase/types";

export async function fetchAgencySettings(): Promise<AgencySettings | null> {
  const { data, error } = await supabase
    .from('agency_settings')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }

  if (!data) return null;

  // Ensure agents is an array and has the correct shape
  const agents: Agent[] = Array.isArray(data.agents) 
    ? (data.agents as Json[]).map((agent: any) => ({
        name: agent.name || "",
        phone: agent.phone || "",
        email: agent.email || "",
        whatsapp: agent.whatsapp || ""
      }))
    : [];

  return {
    id: String(data.id),
    name: data.name || defaultAgencySettings.name,
    email: data.email || defaultAgencySettings.email,
    phone: data.phone || defaultAgencySettings.phone,
    address: data.address || defaultAgencySettings.address,
    primaryColor: data.primary_color || defaultAgencySettings.primaryColor,
    secondaryColor: data.secondary_color || defaultAgencySettings.secondaryColor,
    logoUrl: data.logo_url,
    instagramUrl: data.instagram_url || defaultAgencySettings.instagramUrl,
    youtubeUrl: data.youtube_url || defaultAgencySettings.youtubeUrl,
    facebookUrl: data.facebook_url || defaultAgencySettings.facebookUrl,
    agents: agents,
    iconBuildYear: data.icon_build_year || defaultAgencySettings.iconBuildYear,
    iconBedrooms: data.icon_bedrooms || defaultAgencySettings.iconBedrooms,
    iconBathrooms: data.icon_bathrooms || defaultAgencySettings.iconBathrooms,
    iconGarages: data.icon_garages || defaultAgencySettings.iconGarages,
    iconEnergyClass: data.icon_energy_class || defaultAgencySettings.iconEnergyClass,
    iconSqft: data.icon_sqft || defaultAgencySettings.iconSqft,
    iconLivingSpace: data.icon_living_space || defaultAgencySettings.iconLivingSpace,
    googleMapsApiKey: data.google_maps_api_key || defaultAgencySettings.googleMapsApiKey,
    xmlImportUrl: data.xml_import_url || defaultAgencySettings.xmlImportUrl,
  };
}
