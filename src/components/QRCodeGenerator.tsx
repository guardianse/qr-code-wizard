
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { QRCodePreview } from './QRCodePreview';
import QRCodeAdvancedOptions from './QRCodeAdvancedOptions';
import { QRCodeOptions, generateQRCode, downloadQRCode, formatContactInfo } from '@/utils/qrCodeService';
import { QrCode, Link, Text, Phone, Download, Droplet, Share2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useIsMobile } from '@/hooks/use-mobile';

const QRCodeGenerator = () => {
  const [activeTab, setActiveTab] = useState('url');
  const [qrData, setQrData] = useState('https://');
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qrSize, setQrSize] = useState(300);
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [previewBackground, setPreviewBackground] = useState<'white' | 'dark' | 'pattern'>('white');
  const [qrOptions, setQrOptions] = useState<QRCodeOptions>({
    errorCorrectionLevel: 'M',
    width: 300,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const isMobile = useIsMobile();

  const { toast } = useToast();

  useEffect(() => {
    const handleBackgroundChange = (event: CustomEvent) => {
      setPreviewBackground(event.detail);
    };

    window.addEventListener('changePreviewBackground', handleBackgroundChange as EventListener);
    return () => {
      window.removeEventListener('changePreviewBackground', handleBackgroundChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const generateCode = async () => {
      if (!qrData) return;
      
      setIsLoading(true);
      try {
        let dataToEncode = qrData;
        
        if (activeTab === 'contact' && (name || phone || email)) {
          dataToEncode = formatContactInfo(name, phone, email, company);
        }
        
        const qrCodeDataUrl = await generateQRCode(dataToEncode, {
          ...qrOptions,
          width: qrSize,
          errorCorrectionLevel: errorLevel
        });
        setQrImageUrl(qrCodeDataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
        toast({
          title: 'Error',
          description: 'Failed to generate QR code',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(generateCode, 500);
    return () => clearTimeout(timeoutId);
  }, [qrData, qrOptions, activeTab, name, phone, email, company, toast, qrSize, errorLevel]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'url') {
      setQrData('https://');
    } else if (value === 'text') {
      setQrData('');
    } else if (value === 'contact') {
      setQrData('');
    }
  };

  const handleDownload = () => {
    if (!qrImageUrl) return;
    
    let fileName = 'qrcode';
    if (activeTab === 'url') {
      fileName = 'url-qrcode';
    } else if (activeTab === 'text') {
      fileName = 'text-qrcode';
    } else if (activeTab === 'contact') {
      fileName = `contact-${name.replace(/\s+/g, '-').toLowerCase()}`;
    }
    
    downloadQRCode(qrImageUrl, fileName);
    
    toast({
      title: 'QR Code Downloaded',
      description: 'Your QR code has been downloaded successfully.',
    });
  };

  const handleShare = async () => {
    if (!qrImageUrl || !navigator.share) return;

    try {
      // Convert data URL to Blob
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      
      // Create file from blob
      const fileName = activeTab === 'url' ? 'url-qrcode.png' : 
                      activeTab === 'text' ? 'text-qrcode.png' : 
                      `contact-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
      
      const file = new File([blob], fileName, { type: 'image/png' });

      await navigator.share({
        title: 'QR Code',
        text: 'Check out my QR code',
        files: [file]
      });

      toast({
        title: 'QR Code Shared',
        description: 'Your QR code has been shared successfully.',
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
      toast({
        title: 'Error',
        description: 'Failed to share QR code',
        variant: 'destructive',
      });
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrOptions({
      ...qrOptions,
      color: {
        ...qrOptions.color,
        dark: e.target.value
      }
    });
  };

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'flex-col lg:flex-row'} w-full gap-6 animate-fade-in`}>
      <Card className="flex-1 border-2 border-qr-light">
        <CardContent className="p-4 sm:p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="url" className="flex gap-2 items-center">
                <Link size={isMobile ? 14 : 16} /> URL
              </TabsTrigger>
              <TabsTrigger value="text" className="flex gap-2 items-center">
                <Text size={isMobile ? 14 : 16} /> Text
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex gap-2 items-center">
                <Phone size={isMobile ? 14 : 16} /> Contact
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Plain Text</Label>
                <Textarea
                  id="text"
                  placeholder="Enter any text you want to encode"
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                  rows={4}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+1 555 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <QRCodeAdvancedOptions
            size={qrSize}
            onSizeChange={setQrSize}
            errorLevel={errorLevel}
            onErrorLevelChange={setErrorLevel}
          />

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>QR Code Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-fit flex items-center gap-2"
                    >
                      <Droplet className="h-4 w-4" style={{ color: qrOptions.color.dark }} />
                      <div 
                        className="h-4 w-4 rounded-full border"
                        style={{ backgroundColor: qrOptions.color.dark }}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit p-3">
                    <Input
                      type="color"
                      value={qrOptions.color.dark}
                      onChange={handleColorChange}
                      className="w-32 h-32 p-1 cursor-pointer"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="flex-1 border-2 border-qr-light">
        <CardContent className="p-4 sm:p-6 flex flex-col items-center justify-between h-full">
          <QRCodePreview
            imageUrl={qrImageUrl}
            isLoading={isLoading}
            isEmpty={!qrData && activeTab !== 'contact' || (activeTab === 'contact' && !name && !phone && !email)}
            previewBackground={previewBackground}
          />
          
          <div className="w-full flex flex-col sm:flex-row gap-3 mt-6">
            <Button
              className="flex-1 bg-qr-primary hover:bg-qr-primary/90"
              disabled={!qrImageUrl || isLoading}
              onClick={handleDownload}
            >
              <Download size={isMobile ? 14 : 16} className="mr-2" /> Download
            </Button>
            
            {navigator.share && (
              <Button
                className="flex-1 bg-qr-secondary hover:bg-qr-secondary/90"
                disabled={!qrImageUrl || isLoading}
                onClick={handleShare}
              >
                <Share2 size={isMobile ? 14 : 16} className="mr-2" /> Share
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
