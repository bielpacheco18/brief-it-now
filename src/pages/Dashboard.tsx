
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBriefing } from '@/context/BriefingContext';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  FileText, 
  Plus, 
  Copy, 
  Trash2, 
  Edit, 
  MessageCircle,
  Search,
} from 'lucide-react';
import { formatDate, copyToClipboard, generateBriefingLink } from '@/utils/helpers';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Dashboard() {
  const { briefings, deleteBriefing } = useBriefing();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter briefings by search term
  const filteredBriefings = briefings.filter(briefing => 
    briefing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleCopyLink = async (id: string) => {
    const link = generateBriefingLink(id);
    const success = await copyToClipboard(link);
    if (success) {
      toast.success('Link copiado para a área de transferência!');
    } else {
      toast.error('Falha ao copiar o link');
    }
  };
  
  const handleDelete = async (id: string) => {
    await deleteBriefing(id);
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Meus Briefings</h1>
            <p className="text-briefme-neutral">
              Gerencie seus formulários de briefing
            </p>
          </div>
          
          <Button asChild className="gap-2 bg-briefme-primary hover:bg-briefme-secondary">
            <Link to="/create-briefing">
              <Plus size={16} />
              Criar Novo Briefing
            </Link>
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-briefme-neutral" size={16} />
          <Input
            placeholder="Buscar briefings..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredBriefings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBriefings.map((briefing) => (
              <Card key={briefing.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <FileText size={18} className="text-briefme-primary" />
                    {briefing.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-briefme-neutral mb-4 line-clamp-3">
                    {briefing.description || 'Sem descrição'}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-briefme-neutral">Campos:</span>
                      <span className="font-medium">{briefing.fields.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-briefme-neutral">Respostas:</span>
                      <span className="font-medium">{briefing.responses.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-briefme-neutral">Criado em:</span>
                      <span className="font-medium">{formatDate(briefing.createdAt)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 w-full gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleCopyLink(briefing.id)}
                    >
                      <Copy size={14} />
                      Copiar Link
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <Link to={`/view-briefing/${briefing.id}`}>
                        <MessageCircle size={14} />
                        Respostas
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 w-full gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <Link to={`/edit-briefing/${briefing.id}`}>
                        <Edit size={14} />
                        Editar
                      </Link>
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="gap-2 text-destructive hover:text-destructive"
                        >
                          <Trash2 size={14} />
                          Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir briefing</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza de que deseja excluir este briefing? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDelete(briefing.id)}
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-briefme-light/50 rounded-lg border border-dashed">
            {searchTerm ? (
              <>
                <FileText size={48} className="mx-auto text-briefme-neutral mb-4" />
                <h3 className="text-xl font-medium mb-2">Nenhum briefing encontrado</h3>
                <p className="text-briefme-neutral mb-4">
                  Não encontramos nenhum briefing com o termo "{searchTerm}"
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm('')}
                >
                  Limpar busca
                </Button>
              </>
            ) : (
              <>
                <FileText size={48} className="mx-auto text-briefme-neutral mb-4" />
                <h3 className="text-xl font-medium mb-2">Nenhum briefing criado</h3>
                <p className="text-briefme-neutral mb-4">
                  Crie seu primeiro briefing para compartilhar com seus clientes
                </p>
                <Button asChild className="gap-2 bg-briefme-primary hover:bg-briefme-secondary">
                  <Link to="/create-briefing">
                    <Plus size={16} />
                    Criar Novo Briefing
                  </Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
