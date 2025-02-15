
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormProps {
  agencyName?: string;
  agencyAddress?: string;
  agencyPhone?: string;
  agencyEmail?: string;
  secondaryColor?: string;
  propertyId: string;
}

const INQUIRY_TYPES = [
  { value: "information", label: "Meer informatie over deze woning" },
  { value: "viewing", label: "Een bezichtiging plannen" },
  { value: "offer", label: "Een bod uitbrengen" }
];

export function ContactForm({ 
  agencyName, 
  agencyAddress, 
  agencyPhone, 
  agencyEmail,
  secondaryColor,
  propertyId
}: ContactFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('property_contact_submissions')
        .insert([{
          property_id: propertyId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          inquiry_type: formData.inquiryType,
          message: formData.message,
        }]);

      if (error) throw error;

      toast({
        title: "Bericht verzonden",
        description: "We nemen zo spoedig mogelijk contact met u op!",
      });
      
      setFormData({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Er is iets misgegaan bij het verzenden van uw bericht.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-white/90">
          Naam
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiryType" className="text-sm font-medium text-white/90">
          Ik wil
        </Label>
        <Select
          value={formData.inquiryType}
          onValueChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}
        >
          <SelectTrigger className="text-sm bg-white/10 border-white/20 text-white">
            <SelectValue placeholder="Selecteer een optie" />
          </SelectTrigger>
          <SelectContent>
            {INQUIRY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-white/90">
            E-mail
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-white/90">
            Telefoonnummer
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="text-sm bg-white/10 border-white/20 text-white placeholder:text-white/60"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-white/90">
          Bericht
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Uw bericht..."
          className="text-sm min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/60"
          required
        />
      </div>

      <Button 
        type="submit"
        className="w-full h-12 text-sm font-medium bg-white text-gray-900 hover:bg-white/90 transition-colors"
      >
        Versturen
      </Button>
    </form>
  );
}
