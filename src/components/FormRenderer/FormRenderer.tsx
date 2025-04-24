
import { useState } from 'react';
import { Briefing, BriefingField } from '@/types';
import { Button } from '@/components/ui/button';
import { FormFieldRenderer } from './FormFieldRenderer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { isValidEmail } from '@/utils/helpers';

interface FormRendererProps {
  briefing: Briefing;
  onSubmit: (answers: Record<string, string>, submittedBy?: string) => void;
  isSubmitting?: boolean;
}

export function FormRenderer({ briefing, onSubmit, isSubmitting = false }: FormRendererProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBy, setSubmittedBy] = useState('');
  
  const handleChange = (fieldId: string, value: string) => {
    setAnswers({ ...answers, [fieldId]: value });
    
    // Clear error for this field if exists
    if (errors[fieldId]) {
      const newErrors = { ...errors };
      delete newErrors[fieldId];
      setErrors(newErrors);
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Check required fields
    briefing.fields.forEach(field => {
      if (field.required && (!answers[field.id] || answers[field.id].trim() === '')) {
        newErrors[field.id] = 'Este campo é obrigatório';
      }
      
      // Check email format
      if (field.type === 'email' && answers[field.id] && !isValidEmail(answers[field.id])) {
        newErrors[field.id] = 'Email inválido';
      }
    });
    
    // Check submitter email if provided
    if (submittedBy && !isValidEmail(submittedBy)) {
      newErrors['submittedBy'] = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(answers, submittedBy || undefined);
    }
  };
  
  return (
    <div className="briefing-form-container">
      <form onSubmit={handleSubmit}>
        {briefing.fields.map((field) => (
          <FormFieldRenderer
            key={field.id}
            field={field}
            value={answers[field.id] || ''}
            onChange={(value) => handleChange(field.id, value)}
            error={errors[field.id]}
          />
        ))}
        
        <div className="mb-6">
          <div className="flex items-center gap-1 mb-1">
            <Label htmlFor="submittedBy">Seu email (opcional)</Label>
          </div>
          <Input
            id="submittedBy"
            type="email"
            placeholder="email@exemplo.com"
            value={submittedBy}
            onChange={(e) => setSubmittedBy(e.target.value)}
            className={errors['submittedBy'] ? 'border-destructive' : ''}
          />
          {errors['submittedBy'] && (
            <p className="text-destructive text-sm mt-1">{errors['submittedBy']}</p>
          )}
          <p className="text-briefme-neutral text-sm mt-1">
            Informe seu email para que o freelancer possa entrar em contato, se necessário.
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full gap-2 bg-briefme-primary hover:bg-briefme-secondary"
          disabled={isSubmitting}
        >
          <Send size={16} />
          {isSubmitting ? 'Enviando...' : 'Enviar Briefing'}
        </Button>
      </form>
    </div>
  );
}
