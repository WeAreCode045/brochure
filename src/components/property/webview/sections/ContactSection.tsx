
import { ContactForm } from "../ContactForm";
import { WebViewSectionProps } from "../types";

export function ContactSection({ property, settings }: WebViewSectionProps) {
  return (
    <div className="space-y-6">
      {property.address && settings?.googleMapsApiKey && (
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Location</h3>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={`https://www.google.com/maps/embed/v1/place?key=${settings.googleMapsApiKey}&q=${encodeURIComponent(property.address)}`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      <ContactForm 
        agencyName={settings?.name}
        agencyAddress={settings?.address}
        agencyPhone={settings?.phone}
        agencyEmail={settings?.email}
        secondaryColor={settings?.secondaryColor}
      />
    </div>
  );
}
