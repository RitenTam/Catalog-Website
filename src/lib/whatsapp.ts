import { CONTACT_PHONE_NUMBER, WHATSAPP_WEB_BASE_URL } from '@/lib/contact';

const MOBILE_USER_AGENT_PATTERN = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function isMobileUserAgent(userAgent: string) {
  return MOBILE_USER_AGENT_PATTERN.test(userAgent);
}

export function buildWhatsAppWebUrl(message: string, phoneNumber = CONTACT_PHONE_NUMBER) {
  return `${WHATSAPP_WEB_BASE_URL}/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppSmartUrl(
  message: string,
  userAgent = navigator.userAgent,
  phoneNumber = CONTACT_PHONE_NUMBER
) {
  const encodedMessage = encodeURIComponent(message);

  if (isMobileUserAgent(userAgent)) {
    return `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
  }

  return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
}
