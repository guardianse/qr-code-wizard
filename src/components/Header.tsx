
import { QrCode } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 mb-6 bg-qr-primary">
      <div className="container flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <img 
            src="https://www.uniaircargo.co.id/assets/images/logo.png" 
            alt="Uniaircargo Logo" 
            className="h-8 w-auto"
          />
          <div className="flex items-center space-x-2">
            <QrCode size={32} className="text-white" />
            <h1 className="text-3xl font-bold text-white">
              QR Code Generator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
