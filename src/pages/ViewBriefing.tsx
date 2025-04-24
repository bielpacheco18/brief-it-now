
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBriefing } from '@/context/BriefingContext';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Copy, 
  Edit, 
  FileText, 
  ExternalLink, 
  MessageCircle, 
  Clock,
  Check,
  Calendar,
} from 'lucide-react';
import { formatDate, copyToClipboard, generateBriefingLink } from '@/utils/helpers';

export default function ViewBriefing() {
  const [tab, setTab] = useState('details');
  const [isCopying, setIsCopying] = useState(false);
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBriefing } = useBriefing();
  
  const briefing = id ? getBriefing(id) : undefined;
  
  useEffect(() => {
    if (!briefing) {
      toast.error('Briefing não encontrado');
      navigate('/dashboard');
    }
  }, [briefing, navigate]);
  
  const handleCopyLink = async () => {
    if (!id) return;
    
    setIsCopying(true);
    
    try {
      const link = generateBriefingLink(id);
      const success = await copyToClipboard(link);
      
      if (success) {
        toast.success('Link copiado para a área de transferência!');
      } else {
        toast.error('Erro ao copiar o link');
      }
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error('Erro ao copiar o link');
    } finally {
      setIsCopying(false);
    }
  };
  
  if (!briefing) {
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
              onClick={() => navigate('/dashboard')}
              className="rounded-full"
            >
              <ArrowLeft size={16} />
            </Button>
            <h1 className="text-2xl font-bold">{briefing.title}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleCopyLink}
              disabled={isCopying}
            >
              {isCopying ? <Clock size={16} /> : <Copy size={16} />}
              {isCopying ? 'Copiando...' : 'Copiar Link'}
            </Button>
            
            <Button
              className="gap-2"
              asChild
            >
              <Link to={`/edit-briefing/${briefing.id}`}>
                <Edit size={16} />
                Editar
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg">
          <Tabs value={tab} onValueChange={setTab}>
            <div className="border-b px-4">
              <TabsList className="h-12">
                <TabsTrigger value="details" className="gap-2">
                  <FileText size={16} />
                  Detalhes
                </TabsTrigger>
                <TabsTrigger value="responses" className="gap-2">
                  <MessageCircle size={16} />
                  Respostas ({briefing.responses.length})
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="details" className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Informações do Briefing</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-briefme-neutral mb-1">Criado em</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar size={16} className="text-briefme-primary" />
                        {formatDate(briefing.createdAt)}
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-briefme-neutral mb-1">Link para compartilhar</p>
                      <div className="flex items-center gap-2">
                        <a 
                          href={generateBriefingLink(briefing.id)} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-briefme-primary hover:underline font-medium flex items-center gap-1"
                        >
                          Abrir formulário
                          <ExternalLink size={14} />
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCopyLink}
                          disabled={isCopying}
                        >
                          <Copy size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Descrição</h3>
                  <p className="text-briefme-neutral border rounded-lg p-4">
                    {briefing.description || 'Sem descrição'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Campos do Formulário</h3>
                  <div className="space-y-2">
                    {briefing.fields.map((field) => (
                      <div key={field.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{field.label}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-0.5 bg-briefme-light rounded">
                              {field.type === 'text' && 'Texto curto'}
                              {field.type === 'textarea' && 'Texto longo'}
                              {field.type === 'dropdown' && 'Lista suspensa'}
                              {field.type === 'number' && 'Número'}
                              {field.type === 'date' && 'Data'}
                              {field.type === 'email' && 'Email'}
                            </span>
                            
                            {field.required && (
                              <span className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded">
                                Obrigatório
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {field.placeholder && (
                          <p className="text-sm text-briefme-neutral">
                            <span className="font-medium">Placeholder:</span> {field.placeholder}
                          </p>
                        )}
                        
                        {field.tip && (
                          <p className="text-sm text-briefme-neutral">
                            <span className="font-medium">Dica:</span> {field.tip}
                          </p>
                        )}
                        
                        {field.type === 'dropdown' && field.options && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">Opções:</p>
                            <ul className="text-sm text-briefme-neutral mt-1">
                              {field.options.map((option, index) => (
                                <li key={index} className="flex items-center gap-1">
                                  <Check size={12} className="text-briefme-primary" />
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="responses" className="p-6">
              {briefing.responses.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {briefing.responses.map((response) => (
                    <Card key={response.id} className="hover:shadow-sm transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {response.submittedBy || 'Anônimo'}
                            </CardTitle>
                            <CardDescription>
                              Enviado em {formatDate(response.submittedAt)}
                            </CardDescription>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                          >
                            <Link to={`/response/${briefing.id}/${response.id}`}>
                              Ver Detalhes
                            </Link>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {briefing.fields.slice(0, 2).map((field) => (
                            <div key={field.id}>
                              <p className="text-sm font-medium">{field.label}</p>
                              <p className="text-briefme-neutral truncate">
                                {response.answers[field.id] || '-'}
                              </p>
                            </div>
                          ))}
                        </div>
                        {briefing.fields.length > 2 && (
                          <p className="text-sm text-briefme-primary mt-2">
                            + {briefing.fields.length - 2} campos adicionais
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-briefme-light/50 rounded-lg border border-dashed">
                  <MessageCircle size={48} className="mx-auto text-briefme-neutral mb-4" />
                  <h3 className="text-xl font-medium mb-2">Nenhuma resposta ainda</h3>
                  <p className="text-briefme-neutral mb-4">
                    Compartilhe o link do briefing com seus clientes para começar a receber respostas.
                  </p>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={handleCopyLink}
                  >
                    <Copy size={16} />
                    Copiar Link
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
