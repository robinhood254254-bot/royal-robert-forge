export const WHATSAPP_NUMBER = "+254 710 837 083";
export const WHATSAPP_LINK = "https://wa.me/254710837083";
export const SECONDARY_NUMBER = "+254 792 645 485";
export const SECONDARY_TEL = "tel:+254792645485";
export const EMAIL = "info@royalrobert.co.ke";
export const SITE_URL = "https://royal-robert-forge.lovable.app";

export function waLink(message: string) {
  return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
}

export const BRAND = "Royal Robert Digital Solutions";
