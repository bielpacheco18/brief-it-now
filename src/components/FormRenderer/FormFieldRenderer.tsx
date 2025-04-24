
import { useState } from 'react';
import { BriefingField } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
} from '@/components/ui/select';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface FormFieldRendererProps {
  field: BriefingField;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function FormFieldRenderer({ field, value, onChange, error }: FormFieldRendererProps) {
  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <Input
            id={`field-${field.id}`}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
        );
        
      case 'textarea':
        return (
          <Textarea
            id={`field-${field.id}`}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`min-h-[120px] ${error ? 'border-destructive' : ''}`}
          />
        );
        
      case 'dropdown':
        return (
          <Select 
            value={value} 
            onValueChange={onChange}
          >
            <SelectTrigger className={error ? 'border-destructive' : ''}>
              <SelectValue placeholder={field.placeholder || 'Selecione uma opção'} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
        
      case 'number':
        return (
          <Input
            id={`field-${field.id}`}
            type="number"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
        );
        
      case 'date':
        return (
          <Input
            id={`field-${field.id}`}
            type="date"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
        );
        
      case 'email':
        return (
          <Input
            id={`field-${field.id}`}
            type="email"
            placeholder={field.placeholder || 'email@exemplo.com'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-1 mb-1">
        <Label htmlFor={`field-${field.id}`} className="font-medium">
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        
        {field.tip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={14} className="text-briefme-primary cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[250px] text-sm">{field.tip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      
      {renderField()}
      
      {error && <p className="text-destructive text-sm mt-1">{error}</p>}
    </div>
  );
}
