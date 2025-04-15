
import { QrCode } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-6 mb-6">
      <div className="container flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <QrCode size={32} className="text-qr-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-qr-primary to-qr-secondary bg-clip-text text-transparent">
            QR Code Wizard
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
