
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8e27c923e3bf4785a64cdf27abd61768',
  appName: 'qr-code-wizard',
  webDir: 'dist',
  server: {
    url: 'https://8e27c923-e3bf-4785-a64c-df27abd61768.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: "#FFFFFF",
      androidScaleType: "CENTER_CROP",
      showSpinner: false
    }
  }
};

export default config;
