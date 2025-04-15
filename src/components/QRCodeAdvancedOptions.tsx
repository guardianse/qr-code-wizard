
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QRCodeAdvancedOptionsProps {
  size: number;
  onSizeChange: (value: number) => void;
  errorLevel: 'L' | 'M' | 'Q' | 'H';
  onErrorLevelChange: (value: 'L' | 'M' | 'Q' | 'H') => void;
}

const QRCodeAdvancedOptions = ({
  size,
  onSizeChange,
  errorLevel,
  onErrorLevelChange
}: QRCodeAdvancedOptionsProps) => {
  return (
    <div className="space-y-4 mt-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>QR Code Size</Label>
          <span className="text-sm text-gray-500">{size}px</span>
        </div>
        <Slider
          value={[size]}
          onValueChange={(value) => onSizeChange(value[0])}
          min={100}
          max={500}
          step={10}
        />
      </div>

      <div className="space-y-2">
        <Label>Error Correction Level</Label>
        <Select value={errorLevel} onValueChange={onErrorLevelChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Low (7%)</SelectItem>
            <SelectItem value="M">Medium (15%)</SelectItem>
            <SelectItem value="Q">Quartile (25%)</SelectItem>
            <SelectItem value="H">High (30%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default QRCodeAdvancedOptions;
