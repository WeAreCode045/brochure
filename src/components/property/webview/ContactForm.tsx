
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ContactFormProps {
  agencyName?: string;
  agencyAddress?: string;
  agencyPhone?: string;
  agencyEmail?: string;
  secondaryColor?: string;
}

export function ContactForm({ 
  agencyName, 
  agencyAddress, 
  agencyPhone, 
  agencyEmail,
  secondaryColor 
}: ContactFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We will contact you soon!",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium text-white/90">
            Name
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
          <Label htmlFor="email" className="text-sm font-medium text-white/90">
            Email
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-white/90">
          Phone Number
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
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium text-white/90">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="I'm interested in this property..."
          className="text-sm min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/60"
          required
        />
      </div>
      <Button 
        type="submit"
        className="w-full h-12 text-sm font-medium bg-white text-gray-900 hover:bg-white/90 transition-colors"
      >
        Send Message
      </Button>
    </form>
  );
}
