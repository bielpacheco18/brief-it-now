
import { useState } from 'react';
import { BriefingField } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { BriefingFormField } from './BriefingFormField';

interface FormBuilderProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  fields: BriefingField[];
  setFields: (fields: BriefingField[]) => void;
}

export function FormBuilder({
  title,
  setTitle,
  description,
  setDescription,
  fields,
  setFields,
}: FormBuilderProps) {
  const addField = () => {
    const newField: BriefingField = {
      id: `field-${Date.now()}`,
      label: '',
      type: 'text',
      required: false,
    };
    
    setFields([...fields, newField]);
  };
  
  const updateField = (index: number, updatedField: BriefingField) => {
    const newFields = [...fields];
    newFields[index] = updatedField;
    setFields(newFields);
  };
  
  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };
  
  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...fields];
    const [moved] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, moved);
    setFields(newFields);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="briefing-title" className="text-lg font-medium">
            Título do Briefing
          </Label>
          <Input
            id="briefing-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Briefing para Design de Logo"
            className="text-lg"
          />
        </div>
        
        <div>
          <Label htmlFor="briefing-description" className="text-lg font-medium">
            Descrição
          </Label>
          <Textarea
            id="briefing-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Preencha este formulário para me ajudar a entender melhor o seu projeto."
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Campos do Formulário</h3>
        
        {fields.map((field, index) => (
          <BriefingFormField
            key={field.id}
            field={field}
            onChange={(updatedField) => updateField(index, updatedField)}
            onRemove={() => removeField(index)}
          />
        ))}
        
        <Button
          type="button"
          variant="outline"
          className="gap-2 w-full"
          onClick={addField}
        >
          <Plus size={16} />
          Adicionar Campo
        </Button>
      </div>
    </div>
  );
}
