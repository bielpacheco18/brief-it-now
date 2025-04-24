
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBriefing } from '@/context/BriefingContext';
import MainLayout from '@/components/MainLayout';
import { FormBuilder } from '@/components/FormBuilder/FormBuilder';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import { BriefingField } from '@/types';

export default function EditBriefing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fields, setFields] = useState<BriefingField[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const { getBriefing, updateBriefing } = useBriefing();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (id) {
      const briefing = getBriefing(id);
      if (briefing) {
        setTitle(briefing.title);
        setDescription(briefing.description || '');
        setFields(briefing.fields);
      } else {
        toast.error('Briefing não encontrado');
        navigate('/dashboard');
      }
    }
    setIsLoading(false);
  }, [id, getBriefing, navigate]);
  
  const handleUpdateBriefing = async () => {
    if (!id) return;
    
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
      await updateBriefing(id, {
        title,
        description,
        fields,
      });
      
      navigate(`/view-briefing/${id}`);
    } catch (error) {
      console.error('Error updating briefing:', error);
      toast.error('Ocorreu um erro ao atualizar o briefing');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="h-10 w-10 border-4 border-t-briefme-primary border-r-transparent border-b-briefme-primary border-l-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }
  
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
            <h1 className="text-2xl font-bold">Editar Briefing</h1>
          </div>
          
          <Button
            onClick={handleUpdateBriefing}
            className="gap-2 bg-briefme-primary hover:bg-briefme-secondary"
            disabled={isSubmitting}
          >
            <Save size={16} />
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
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
