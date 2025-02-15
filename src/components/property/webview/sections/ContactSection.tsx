
import { ContactForm } from "../ContactForm";
import { WebViewSectionProps } from "../types";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Building2 } from "lucide-react";

export function ContactSection({ property, settings }: WebViewSectionProps) {
  const handleWhatsAppClick = (whatsapp: string) => {
    const phone = whatsapp.replace(/\D/g, '');
    window.open(`https://wa.me/${phone}`, '_blank');
  };

  return (
    <div className="space-y-8 p-6 bg-gray-50">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Agency Contact Details */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-gray-600" />
            <h3 className="text-2xl font-semibold">Contact Agency</h3>
          </div>
          <div className="space-y-4">
            {settings?.name && (
              <p className="font-medium text-lg text-gray-900">{settings.name}</p>
            )}
            {settings?.address && (
              <p className="text-gray-600 leading-relaxed">{settings.address}</p>
            )}
            <div className="flex flex-col gap-3 mt-4">
              {settings?.phone && (
                <a 
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>{settings.phone}</span>
                </a>
              )}
              {settings?.email && (
                <a 
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>{settings.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Agent Details */}
        {settings?.agents && settings.agents.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h4 className="text-2xl font-semibold mb-6">Contact Agent</h4>
            <div className="space-y-4">
              {settings.agents.map((agent, index) => (
                <div key={index} className="space-y-4">
                  <p className="font-medium text-lg text-gray-900">{agent.name}</p>
                  {agent.phone && (
                    <a 
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{agent.phone}</span>
                    </a>
                  )}
                  {agent.email && (
                    <a 
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{agent.email}</span>
                    </a>
                  )}
                  {agent.whatsapp && (
                    <Button 
                      variant="outline"
                      className="w-full mt-2 border-2 hover:bg-green-50 hover:text-green-600 hover:border-green-600 transition-colors"
                      onClick={() => handleWhatsAppClick(agent.whatsapp)}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Contact via WhatsApp
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h3 className="text-2xl font-semibold mb-6">Interested in this property?</h3>
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
