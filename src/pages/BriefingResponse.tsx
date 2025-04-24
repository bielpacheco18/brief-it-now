
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBriefing } from '@/context/BriefingContext';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { formatDate } from '@/utils/helpers';

export default function BriefingResponse() {
  const { briefingId, responseId } = useParams<{ briefingId: string; responseId: string }>();
  const navigate = useNavigate();
  const { getBriefing } = useBriefing();
  
  const briefing = briefingId ? getBriefing(briefingId) : undefined;
  const response = briefing?.responses.find(r => r.id === responseId);
  
  useEffect(() => {
    if (!briefing) {
      toast.error('Briefing não encontrado');
      navigate('/dashboard');
      return;
    }
    
    if (!response) {
      toast.error('Resposta não encontrada');
      navigate(`/view-briefing/${briefingId}`);
    }
  }, [briefing, response, briefingId, navigate]);
  
  if (!briefing || !response) {
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
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(`/view-briefing/${briefingId}`)}
              className="rounded-full"
            >
              <ArrowLeft size={16} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{briefing.title}</h1>
              <p className="text-sm text-briefme-neutral">
                Resposta de: {response.submittedBy || 'Anônimo'} • {formatDate(response.submittedAt)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg p-6">
          <div className="space-y-6">
            {briefing.fields.map((field) => (
              <div key={field.id} className="border rounded-lg p-4">
                <h3 className="font-medium mb-1">{field.label}</h3>
                <div className="prose max-w-none mt-2">
                  {field.type === 'textarea' ? (
                    <pre className="bg-briefme-light p-4 rounded-lg whitespace-pre-wrap">
                      {response.answers[field.id] || '-'}
                    </pre>
                  ) : (
                    <p>{response.answers[field.id] || '-'}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/view-briefing/${briefingId}`)}
            >
              Voltar para o briefing
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
