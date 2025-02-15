
export interface Agent {
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export interface AgencySettings {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  descriptionBackgroundUrl?: string;
  iconBuildYear?: string;
  iconBedrooms?: string;
  iconBathrooms?: string;
  iconGarages?: string;
  iconEnergyClass?: string;
  iconSqft?: string;
  iconLivingSpace?: string;
  googleMapsApiKey?: string;
  xmlImportUrl?: string;
  agents: Agent[];
  instagramUrl?: string;
  youtubeUrl?: string;
  facebookUrl?: string;
}
