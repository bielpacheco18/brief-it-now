
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBriefing } from '@/context/BriefingContext';
import MainLayout from '@/components/MainLayout';
import { FormBuilder } from '@/components/FormBuilder/FormBuilder';
import { Button } from '@/components/ui/button';
import { BriefingField } from '@/types';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateBriefing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<BriefingField[]>([
    {
      id: `field-${Date.now()}`,
      label: 'Nome do Projeto',
      type: 'text',
      required: true,
      placeholder: 'Digite o nome do seu projeto',
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { createBriefing } = useBriefing();
  const navigate = useNavigate();
  
  const handleCreateBriefing = async () => {
    if (!title.trim()) {
      toast.error('Por favor, adicione um título para o briefing');
      return;
    }
    
    if (fields.length === 0) {
      toast.error('Adicione pelo menos um campo ao formulário');
      return;
    }
    
    // Check for empty field labels
    const invalidFields = fields.filter(field => !field.label.trim());
    if (invalidFields.length > 0) {
      toast.error('Todos os campos devem ter um título');
      return;
    }
    
    try {
      setIsSubmitting(true);
      const newBriefing = await createBriefing({
        title,
        description,
        fields,
      });
      
      navigate(`/view-briefing/${newBriefing.id}`);
    } catch (error) {
      console.error('Error creating briefing:', error);
      toast.error('Ocorreu um erro ao criar o briefing');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="rounded-full"
            >
              <ArrowLeft size={16} />
            </Button>
            <h1 className="text-2xl font-bold">Criar Novo Briefing</h1>
          </div>
          
          <Button
            onClick={handleCreateBriefing}
            className="gap-2 bg-briefme-primary hover:bg-briefme-secondary"
            disabled={isSubmitting}
          >
            <Save size={16} />
            {isSubmitting ? 'Salvando...' : 'Salvar Briefing'}
          </Button>
        </div>
        
        <div className="bg-white rounded-lg border p-6">
          <FormBuilder
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            fields={fields}
            setFields={setFields}
          />
        </div>
      </div>
    </MainLayout>
  );
}
