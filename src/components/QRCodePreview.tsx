
import { Skeleton } from '@/components/ui/skeleton';
import { QrCode } from 'lucide-react';

interface QRCodePreviewProps {
  imageUrl: string | null;
  isLoading: boolean;
  isEmpty: boolean;
  previewBackground?: 'white' | 'dark' | 'pattern';
}

export const QRCodePreview = ({ imageUrl, isLoading, isEmpty, previewBackground = 'white' }: QRCodePreviewProps) => {
  const getBackgroundClass = () => {
    switch (previewBackground) {
      case 'dark':
        return 'bg-gray-800';
      case 'pattern':
        return 'bg-[url("/grid-pattern.png")] bg-repeat';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 space-y-4">
      <div className={`w-full max-w-[300px] aspect-square rounded-lg overflow-hidden flex items-center justify-center ${getBackgroundClass()}`}>
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
      
      <div className="flex gap-2">
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('changePreviewBackground', { detail: 'white' }))}
          className="w-8 h-8 rounded-full bg-white border border-gray-300"
          aria-label="White background"
        />
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('changePreviewBackground', { detail: 'dark' }))}
          className="w-8 h-8 rounded-full bg-gray-800 border border-gray-300"
          aria-label="Dark background"
        />
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('changePreviewBackground', { detail: 'pattern' }))}
          className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 overflow-hidden"
          aria-label="Pattern background"
        >
          <div className="w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-50" />
        </button>
      </div>
    </div>
  );
};
