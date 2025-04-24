
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBriefing } from '@/context/BriefingContext';
import { FormRenderer } from '@/components/FormRenderer/FormRenderer';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

export default function BriefingForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBriefing, submitResponse } = useBriefing();
  
  const [briefing, setBriefing] = useState(id ? getBriefing(id) : undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    if (!briefing) {
      toast.error('Briefing não encontrado');
      navigate('/');
    }
  }, [briefing, navigate]);
  
  const handleSubmit = async (answers: Record<string, string>, submittedBy?: string) => {
    if (!id) return;
    
    try {
      setIsSubmitting(true);
      await submitResponse(id, answers, submittedBy);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting response:', error);
      toast.error('Ocorreu um erro ao enviar o briefing');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-briefme-light">
      <header className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <Logo />
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {briefing && (
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="bg-white rounded-lg border p-8 text-center">
                <div className="w-16 h-16 bg-briefme-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-briefme-primary" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Briefing enviado com sucesso!</h1>
                <p className="text-briefme-neutral mb-6">
                  Obrigado por enviar suas respostas. O freelancer irá analisá-las e entrar em contato se necessário.
                </p>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-briefme-primary hover:bg-briefme-secondary"
                >
                  Voltar para o início
                </Button>
              </div>
            ) : (
              <div>
                <div className="bg-white rounded-t-lg border border-b-0 p-6">
                  <h1 className="text-2xl font-bold mb-2">{briefing.title}</h1>
                  {briefing.description && (
                    <p className="text-briefme-neutral">
                      {briefing.description}
                    </p>
                  )}
                </div>
                
                <div className="bg-white rounded-b-lg border p-6">
                  <FormRenderer 
                    briefing={briefing} 
                    onSubmit={handleSubmit} 
                    isSubmitting={isSubmitting}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      
      <footer className="py-4 bg-white border-t mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-briefme-neutral">
            Formulário criado com <span className="text-briefme-primary font-medium">BriefMe</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
