
import QRCode from 'qrcode';

export type QRCodeFormat = 'url' | 'text' | 'contact';

export interface QRCodeOptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

const DEFAULT_OPTIONS: QRCodeOptions = {
  errorCorrectionLevel: 'M',
  width: 300,
  margin: 1,
  color: {
    dark: '#000000',
    light: '#ffffff'
  }
};

export async function generateQRCode(
  data: string,
  options: QRCodeOptions = DEFAULT_OPTIONS
): Promise<string> {
  try {
    return await QRCode.toDataURL(data, {
      errorCorrectionLevel: options.errorCorrectionLevel || 'M',
      width: options.width || 300,
      margin: options.margin || 1,
      color: {
        dark: options.color?.dark || '#000000',
        light: options.color?.light || '#ffffff'
      }
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

export function formatContactInfo(
  name: string,
  phone: string,
  email: string,
  company: string = '',
  title: string = '',
  website: string = ''
): string {
  let vCard = 'BEGIN:VCARD\nVERSION:3.0\n';
  vCard += `N:${name};;;\n`;
  vCard += `FN:${name}\n`;
  if (company) vCard += `ORG:${company}\n`;
  if (title) vCard += `TITLE:${title}\n`;
  if (phone) vCard += `TEL;TYPE=CELL:${phone}\n`;
  if (email) vCard += `EMAIL:${email}\n`;
  if (website) vCard += `URL:${website}\n`;
  vCard += 'END:VCARD';
  return vCard;
}

export function downloadQRCode(dataUrl: string, fileName: string = 'qrcode'): void {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `${fileName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
