
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PropertyArea } from "@/types/property";
import { PlusCircle, MinusCircle, Upload, X } from "lucide-react";
import { useState } from "react";

interface PropertyAreasProps {
  areas: PropertyArea[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof PropertyArea, value: string | string[]) => void;
  onImageUpload: (id: string, files: FileList) => void;
  onImageRemove: (id: string, imageUrl: string) => void;
}

export function PropertyAreas({
  areas,
  onAdd,
  onRemove,
  onUpdate,
  onImageUpload,
  onImageRemove,
}: PropertyAreasProps) {
  const [expandedArea, setExpandedArea] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Ruimtes en Verdiepingen</Label>
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Ruimte Toevoegen
        </Button>
      </div>
      
      {areas.map((area) => (
        <div 
          key={area.id} 
          className="border rounded-lg p-4 space-y-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor={`area-title-${area.id}`}>Titel</Label>
                <Input
                  id={`area-title-${area.id}`}
                  value={area.title}
                  onChange={(e) => onUpdate(area.id, 'title', e.target.value)}
                  placeholder="Bijv. Woonkamer, Eerste Verdieping"
                />
              </div>
              
              <div>
                <Label htmlFor={`area-desc-${area.id}`}>Beschrijving</Label>
                <Textarea
                  id={`area-desc-${area.id}`}
                  value={area.description}
                  onChange={(e) => onUpdate(area.id, 'description', e.target.value)}
                  placeholder="Beschrijf deze ruimte..."
                />
              </div>

              <div>
                <Label>Foto's</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  {area.images.map((imageUrl) => (
                    <div key={imageUrl} className="relative group">
                      <img
                        src={imageUrl}
                        alt={area.title}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => onImageRemove(area.id, imageUrl)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-sm text-gray-500 mt-1">Upload</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => e.target.files && onImageUpload(area.id, e.target.files)}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onRemove(area.id)}
              className="shrink-0"
            >
              <MinusCircle className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
