
import { supabase } from "@/integrations/supabase/client";
import { AgencySettings } from "@/types/agency";

interface AgencySettingsData {
  name: string;
  email: string;
  phone: string;
  address: string;
  primary_color: string;
  secondary_color: string;
  logo_url?: string;
  description_background_url?: string;
  icon_build_year: string;
  icon_bedrooms: string;
  icon_bathrooms: string;
  icon_garages: string;
  icon_energy_class: string;
  icon_sqft: string;
  icon_living_space: string;
  google_maps_api_key: string;
  xml_import_url: string;
  instagram_url?: string;
  youtube_url?: string;
  facebook_url?: string;
  agents: any[];
}

export const agencySettingsService = {
  async uploadLogo(file: Blob, filename: string) {
    const { data, error } = await supabase.storage
      .from('agency_files')
      .upload(filename, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('agency_files')
      .getPublicUrl(filename);

    return publicUrl;
  },

  async uploadDescriptionBackground(file: Blob, filename: string) {
    const { data, error } = await supabase.storage
      .from('agency_files')
      .upload(filename, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('agency_files')
      .getPublicUrl(filename);

    return publicUrl;
  },

  async updateSettings(id: string, data: AgencySettings) {
    const updateData: AgencySettingsData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      primary_color: data.primaryColor,
      secondary_color: data.secondaryColor,
      logo_url: data.logoUrl,
      description_background_url: data.descriptionBackgroundUrl,
      icon_build_year: data.iconBuildYear,
      icon_bedrooms: data.iconBedrooms,
      icon_bathrooms: data.iconBathrooms,
      icon_garages: data.iconGarages,
      icon_energy_class: data.iconEnergyClass,
      icon_sqft: data.iconSqft,
      icon_living_space: data.iconLivingSpace,
      google_maps_api_key: data.googleMapsApiKey,
      xml_import_url: data.xmlImportUrl,
      instagram_url: data.instagramUrl,
      youtube_url: data.youtubeUrl,
      facebook_url: data.facebookUrl,
      agents: data.agents
    };

    const { error } = await supabase
      .from('agency_settings')
      .update(updateData)
      .eq('id', id);

    if (error) throw error;
  },

  async createSettings(data: AgencySettingsData) {
    const { error } = await supabase
      .from('agency_settings')
      .insert(data);

    if (error) throw error;
  }
};
