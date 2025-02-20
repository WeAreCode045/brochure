
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiry_type: string;
  property_title: string;
  agent_email: string;
  agent_name: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const submission: ContactSubmission = await req.json();
    
    // EmailEngine API call
    const response = await fetch(`${Deno.env.get("EMAILENGINE_API_URL")}/api/v1/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": Deno.env.get("EMAILENGINE_API_KEY") || "",
      },
      body: JSON.stringify({
        to: submission.agent_email,
        subject: `New inquiry for ${submission.property_title}`,
        html: `
          <h2>New Property Inquiry</h2>
          <p>Dear ${submission.agent_name},</p>
          <p>You have received a new inquiry for property: ${submission.property_title}</p>
          <h3>Contact Details:</h3>
          <ul>
            <li>Name: ${submission.name}</li>
            <li>Email: ${submission.email}</li>
            <li>Phone: ${submission.phone}</li>
            <li>Inquiry Type: ${submission.inquiry_type}</li>
          </ul>
          <h3>Message:</h3>
          <p>${submission.message}</p>
        `,
        from: {
          name: "Property Inquiry",
          address: Deno.env.get("EMAILENGINE_FROM_ADDRESS") || "noreply@yourdomain.com"
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`EmailEngine API error: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
