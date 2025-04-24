
import { useState } from 'react';
import { BriefingField } from '@/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { FieldTypeSelector } from './FieldTypeSelector';
import { Trash2, GripVertical, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface BriefingFormFieldProps {
  field: BriefingField;
  onChange: (field: BriefingField) => void;
  onRemove: () => void;
  isDragging?: boolean;
}

export function BriefingFormField({ field, onChange, onRemove, isDragging }: BriefingFormFieldProps) {
  const [showOptions, setShowOptions] = useState(field.type === 'dropdown');
  
  const handleTypeChange = (type: 'text' | 'textarea' | 'dropdown' | 'number' | 'date' | 'email') => {
    setShowOptions(type === 'dropdown');
    onChange({
      ...field,
      type,
      options: type === 'dropdown' ? field.options || [''] : undefined,
    });
  };
  
  const handleOptionsChange = (options: string[]) => {
    onChange({
      ...field,
      options,
    });
  };
  
  const addOption = () => {
    const currentOptions = field.options || [];
    handleOptionsChange([...currentOptions, '']);
  };
  
  const updateOption = (index: number, value: string) => {
    if (field.options) {
      const newOptions = [...field.options];
      newOptions[index] = value;
      handleOptionsChange(newOptions);
    }
  };
  
  const removeOption = (index: number) => {
    if (field.options && field.options.length > 1) {
      const newOptions = field.options.filter((_, i) => i !== index);
      handleOptionsChange(newOptions);
    }
  };
  
  return (
    <div className={cn(
      "border rounded-lg p-4 mb-4 bg-white", 
      isDragging ? "opacity-50" : "",
      "hover:border-briefme-primary/50 transition-colors"
    )}>
      <div className="flex items-center gap-2 mb-4">
        <div className="cursor-move">
          <GripVertical className="text-briefme-neutral" size={18} />
        </div>
        <Input
          value={field.label}
          onChange={(e) => onChange({ ...field, label: e.target.value })}
          placeholder="Título do campo"
          className="font-medium"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
        >
          <Trash2 size={16} className="text-destructive" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`field-${field.id}-type`}>Tipo de campo</Label>
          <FieldTypeSelector
            value={field.type}
            onChange={handleTypeChange}
          />
        </div>
        
        <div>
          <Label htmlFor={`field-${field.id}-placeholder`}>Texto de exemplo</Label>
          <Input
            id={`field-${field.id}-placeholder`}
            value={field.placeholder || ''}
            onChange={(e) => onChange({ ...field, placeholder: e.target.value })}
            placeholder="Ex: Digite seu nome"
          />
        </div>
      </div>
      
      {showOptions && (
        <div className="mt-4">
          <Label className="mb-2 inline-block">Opções da lista</Label>
          {field.options?.map((option, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Opção ${index + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeOption(index)}
                disabled={field.options && field.options.length <= 1}
              >
                <Trash2 size={16} className="text-destructive" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addOption}
            className="mt-1"
          >
            Adicionar opção
          </Button>
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            id={`field-${field.id}-required`}
            checked={field.required}
            onCheckedChange={(checked) => onChange({ ...field, required: checked })}
          />
          <Label htmlFor={`field-${field.id}-required`}>Campo obrigatório</Label>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Label htmlFor={`field-${field.id}-tip`}>Dica para o cliente</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="text-briefme-neutral cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">
                    Adicione uma dica para ajudar o cliente a preencher este campo corretamente.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Textarea
            id={`field-${field.id}-tip`}
            value={field.tip || ''}
            onChange={(e) => onChange({ ...field, tip: e.target.value })}
            placeholder="Ex: Descreva o público-alvo do seu negócio em detalhes."
            className="h-[80px]"
          />
        </div>
      </div>
    </div>
  );
}
