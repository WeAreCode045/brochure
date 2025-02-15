
import { ContactForm } from "../ContactForm";
import { WebViewSectionProps } from "../types";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone } from "lucide-react";

export function ContactSection({ property, settings }: WebViewSectionProps) {
  const handleWhatsAppClick = (whatsapp: string) => {
    const phone = whatsapp.replace(/\D/g, ''); // Remove non-digits
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Agency Contact Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Contact Agency</h3>
        <div className="space-y-3">
          {settings?.name && (
            <p className="font-medium">{settings.name}</p>
          )}
          {settings?.address && (
            <p className="text-gray-600">{settings.address}</p>
          )}
          {settings?.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <a href={`tel:${settings.phone}`}>{settings.phone}</a>
            </div>
          )}
          {settings?.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </div>
          )}
        </div>
      </div>

      {/* Agent Details */}
      {settings?.agents && settings.agents.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {settings.agents.map((agent, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h4 className="font-semibold mb-3">{agent.name}</h4>
              <div className="space-y-3">
                {agent.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${agent.phone}`}>{agent.phone}</a>
                  </div>
                )}
                {agent.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${agent.email}`}>{agent.email}</a>
                  </div>
                )}
                {agent.whatsapp && (
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => handleWhatsAppClick(agent.whatsapp)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact via WhatsApp
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Interested in this property?</h3>
        <ContactForm 
          agencyName={settings?.name}
          agencyAddress={settings?.address}
          agencyPhone={settings?.phone}
          agencyEmail={settings?.email}
          secondaryColor={settings?.secondaryColor}
        />
      </div>
    </div>
  );
}
