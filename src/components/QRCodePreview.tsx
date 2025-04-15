
import { Skeleton } from '@/components/ui/skeleton';
import { QrCode } from 'lucide-react';

interface QRCodePreviewProps {
  imageUrl: string | null;
  isLoading: boolean;
  isEmpty: boolean;
}

export const QRCodePreview = ({ imageUrl, isLoading, isEmpty }: QRCodePreviewProps) => {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-[300px] aspect-square rounded-lg overflow-hidden flex items-center justify-center bg-white">
        {isLoading ? (
          <Skeleton className="w-full h-full" />
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <QrCode size={64} className="mb-2 text-qr-primary/50" />
            <p className="text-sm">Enter data to generate QR code</p>
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated QR Code"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <QrCode size={64} className="mb-2 text-gray-300" />
            <p className="text-sm">No QR code available</p>
          </div>
        )}
      </div>
    </div>
  );
};
