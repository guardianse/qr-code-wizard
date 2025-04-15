
import Header from '@/components/Header';
import QRCodeGenerator from '@/components/QRCodeGenerator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-qr-light">
      <Header />
      <div className="container px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold mb-2 text-qr-primary">
              Generate QR Codes Instantly
            </h2>
            <p className="text-gray-600">
              Create QR codes for URLs, text messages, or contact information with just a few clicks.
            </p>
          </div>
          
          <QRCodeGenerator />
          
          <div className="mt-12 text-center text-sm text-gray-600">
            <p>
              QR Code Generator powered by Uniaircargo.
              <br />
              Download and use your QR codes for business cards, websites, or marketing materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
