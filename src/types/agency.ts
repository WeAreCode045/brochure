
export interface Typography {
  color: string;
  size: string;
  weight: string;
  font: string;
}

export interface AgencySettings {
  id?: string;
  name: string;
  agentName: string;
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
  typography_h1?: Typography;
  typography_h2?: Typography;
  typography_p?: Typography;
  typography_title?: Typography;
  typography_price?: Typography;
  typography_label?: Typography;
  typography_list?: Typography;
}
