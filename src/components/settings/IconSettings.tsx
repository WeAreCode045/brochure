import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgencySettings } from "@/types/agency";
import { icons } from "lucide-react";
import { 
  faHome,
  faBed,
  faBath,
  faCar,
  faCalendar,
  faRuler,
  faBolt,
  faMapMarker,
  faLandmark,
  faBuilding,
  faHouse,
  faWarehouse,
  faCity,
  faTree,
  faSwimmingPool,
  faKey,
  faDoorOpen,
  faSun,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IconSettingsProps {
  settings: AgencySettings;
  onSelectChange: (name: string, value: string) => void;
}

const faIcons = {
  home: faHome,
  bed: faBed,
  bath: faBath,
  car: faCar,
  calendar: faCalendar,
  ruler: faRuler,
  zap: faBolt,
  'map-pin': faMapMarker,
  landmark: faLandmark,
  building: faBuilding,
  house: faHouse,
  warehouse: faWarehouse,
  city: faCity,
  tree: faTree,
  pool: faSwimmingPool,
  key: faKey,
  door: faDoorOpen,
  sun: faSun,
  leaf: faLeaf,
};

const lucideIconOptions = Object.keys(icons).sort().map(icon => ({
  id: `lucide-${icon}`,
  name: icon,
  source: 'lucide'
}));

const faIconOptions = Object.keys(faIcons).sort().map(icon => ({
  id: `fa-${icon}`,
  name: icon,
  source: 'fa'
}));

const iconOptions = [...lucideIconOptions, ...faIconOptions].sort((a, b) => a.name.localeCompare(b.name));

export const IconSettings = ({ settings, onSelectChange }: IconSettingsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">PDF Icon Settings</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="icon_build_year">Build Year Icon</Label>
          <Select 
            value={settings.iconBuildYear || 'calendar'} 
            onValueChange={(value) => onSelectChange("iconBuildYear", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon">
                {settings.iconBuildYear && faIcons[settings.iconBuildYear as keyof typeof faIcons] ? (
                  <FontAwesomeIcon icon={faIcons[settings.iconBuildYear as keyof typeof faIcons]} className="mr-2" />
                ) : null}
                {settings.iconBuildYear}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.id} value={icon.name} className="flex items-center">
                  {icon.source === 'fa' && faIcons[icon.name as keyof typeof faIcons] ? (
                    <FontAwesomeIcon icon={faIcons[icon.name as keyof typeof faIcons]} className="mr-2" />
                  ) : null}
                  {icon.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon_bedrooms">Bedrooms Icon</Label>
          <Select 
            value={settings.iconBedrooms || 'bed'} 
            onValueChange={(value) => onSelectChange("iconBedrooms", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon">
                {settings.iconBedrooms && faIcons[settings.iconBedrooms as keyof typeof faIcons] ? (
                  <FontAwesomeIcon icon={faIcons[settings.iconBedrooms as keyof typeof faIcons]} className="mr-2" />
                ) : null}
                {settings.iconBedrooms}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.id} value={icon.name} className="flex items-center">
                  {icon.source === 'fa' && faIcons[icon.name as keyof typeof faIcons] ? (
                    <FontAwesomeIcon icon={faIcons[icon.name as keyof typeof faIcons]} className="mr-2" />
                  ) : null}
                  {icon.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon_bathrooms">Bathrooms Icon</Label>
          <Select 
            value={settings.iconBathrooms || 'bath'} 
            onValueChange={(value) => onSelectChange("iconBathrooms", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon">
                {settings.iconBathrooms && faIcons[settings.iconBathrooms as keyof typeof faIcons] ? (
                  <FontAwesomeIcon icon={faIcons[settings.iconBathrooms as keyof typeof faIcons]} className="mr-2" />
                ) : null}
                {settings.iconBathrooms}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.id} value={icon.name} className="flex items-center">
                  {icon.source === 'fa' && faIcons[icon.name as keyof typeof faIcons] ? (
                    <FontAwesomeIcon icon={faIcons[icon.name as keyof typeof faIcons]} className="mr-2" />
                  ) : null}
                  {icon.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon_garages">Garages Icon</Label>
          <Select 
            value={settings.iconGarages || 'car'} 
            onValueChange={(value) => onSelectChange("iconGarages", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon">
                {settings.iconGarages && faIcons[settings.iconGarages as keyof typeof faIcons] ? (
                  <FontAwesomeIcon icon={faIcons[settings.iconGarages as keyof typeof faIcons]} className="mr-2" />
                ) : null}
                {settings.iconGarages}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.id} value={icon.name} className="flex items-center">
                  {icon.source === 'fa' && faIcons[icon.name as keyof typeof faIcons] ? (
                    <FontAwesomeIcon icon={faIcons[icon.name as keyof typeof faIcons]} className="mr-2" />
                  ) : null}
                  {icon.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon_energy_class">Energy Class Icon</Label>
          <Select 
            value={settings.iconEnergyClass || 'zap'} 
            onValueChange={(value) => onSelectChange("iconEnergyClass", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon">
                {settings.iconEnergyClass && faIcons[settings.iconEnergyClass as keyof typeof faIcons] ? (
                  <FontAwesomeIcon icon={faIcons[settings.iconEnergyClass as keyof typeof faIcons]} className="mr-2" />
                ) : null}
                {settings.iconEnergyClass}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.id} value={icon.name} className="flex items-center">
                  {icon.source === 'fa' && faIcons[icon.name as keyof typeof faIcons] ? (
                    <FontAwesomeIcon icon={faIcons[icon.name as keyof typeof faIcons]} className="mr-2" />
                  ) : null}
                  {icon.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon_sqft">Plot Size Icon</Label>
          <Select 
            value={settings.iconSqft || 'ruler'} 
            onValueChange={(value) => onSelectChange("iconSqft", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon">
                {settings.iconSqft && faIcons[settings.iconSqft as keyof typeof faIcons] ? (
                  <FontAwesomeIcon icon={faIcons[settings.iconSqft as keyof typeof faIcons]} className="mr-2" />
                ) : null}
                {settings.iconSqft}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.id} value={icon.name} className="flex items-center">
                  {icon.source === 'fa' && faIcons[icon.name as keyof typeof faIcons] ? (
                    <FontAwesomeIcon icon={faIcons[icon.name as keyof typeof faIcons]} className="mr-2" />
                  ) : null}
                  {icon.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon_living_space">Living Space Icon</Label>
          <Select 
            value={settings.iconLivingSpace || 'home'} 
            onValueChange={(value) => onSelectChange("iconLivingSpace", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select icon">
                {settings.iconLivingSpace && faIcons[settings.iconLivingSpace as keyof typeof faIcons] ? (
                  <FontAwesomeIcon icon={faIcons[settings.iconLivingSpace as keyof typeof faIcons]} className="mr-2" />
                ) : null}
                {settings.iconLivingSpace}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {iconOptions.map((icon) => (
                <SelectItem key={icon.id} value={icon.name} className="flex items-center">
                  {icon.source === 'fa' && faIcons[icon.name as keyof typeof faIcons] ? (
                    <FontAwesomeIcon icon={faIcons[icon.name as keyof typeof faIcons]} className="mr-2" />
                  ) : null}
                  {icon.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
