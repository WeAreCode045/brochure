
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { AgencySettings, Agent } from "@/types/agency";

interface AgencyFieldsProps {
  settings: AgencySettings;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAgentChange: (agents: Agent[]) => void;
}

export const AgencyFields = ({ settings, onChange, onAgentChange }: AgencyFieldsProps) => {
  const addAgent = () => {
    const newAgent: Agent = {
      name: "",
      phone: "",
      email: "",
      whatsapp: ""
    };
    onAgentChange([...settings.agents, newAgent]);
  };

  const removeAgent = (index: number) => {
    const updatedAgents = settings.agents.filter((_, i) => i !== index);
    onAgentChange(updatedAgents);
  };

  const updateAgent = (index: number, field: keyof Agent, value: string) => {
    const updatedAgents = settings.agents.map((agent, i) => {
      if (i === index) {
        return { ...agent, [field]: value };
      }
      return agent;
    });
    onAgentChange(updatedAgents);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Agency Name</Label>
        <Input
          id="name"
          name="name"
          value={settings.name}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={settings.email}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={settings.phone}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={settings.address}
          onChange={onChange}
        />
      </div>

      <div className="space-y-4 mt-8">
        <h3 className="font-semibold">Social Media</h3>
        <div className="space-y-2">
          <Label htmlFor="instagramUrl">Instagram URL</Label>
          <Input
            id="instagramUrl"
            name="instagramUrl"
            type="url"
            value={settings.instagramUrl}
            onChange={onChange}
            placeholder="https://instagram.com/youragency"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="youtubeUrl">YouTube URL</Label>
          <Input
            id="youtubeUrl"
            name="youtubeUrl"
            type="url"
            value={settings.youtubeUrl}
            onChange={onChange}
            placeholder="https://youtube.com/@youragency"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="facebookUrl">Facebook URL</Label>
          <Input
            id="facebookUrl"
            name="facebookUrl"
            type="url"
            value={settings.facebookUrl}
            onChange={onChange}
            placeholder="https://facebook.com/youragency"
          />
        </div>
      </div>

      <div className="space-y-4 mt-8">
        <div className="flex items-center justify-between">
          <Label>Agents</Label>
          <Button type="button" onClick={addAgent} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </Button>
        </div>
        
        {settings.agents.map((agent, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Agent {index + 1}</h4>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm"
                onClick={() => removeAgent(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={agent.name}
                  onChange={(e) => updateAgent(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={agent.phone}
                  onChange={(e) => updateAgent(index, 'phone', e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={agent.email}
                  onChange={(e) => updateAgent(index, 'email', e.target.value)}
                />
              </div>
              <div>
                <Label>WhatsApp</Label>
                <Input
                  value={agent.whatsapp}
                  onChange={(e) => updateAgent(index, 'whatsapp', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
