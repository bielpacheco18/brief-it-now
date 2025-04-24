
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/components/MainLayout';
import { Logo } from '@/components/Logo';
import { FileText, CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCTAClick = () => {
    if (user) {
      navigate('/create-briefing');
    } else {
      navigate('/signup');
    }
  };

  return (
    <MainLayout>
      <div className="py-12 md:py-20">
        {/* Hero section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-briefme-dark">
            Briefings profissionais para <span className="text-briefme-primary">freelancers</span>
          </h1>
          <p className="text-xl text-briefme-neutral mb-8 max-w-2xl">
            Crie formulários de briefing interativos e personalizados para seus clientes.
            Obtenha todas as informações necessárias para entregar projetos excepcionais.
          </p>
          <Button 
            onClick={handleCTAClick} 
            size="lg"
            className="gap-2 bg-briefme-primary hover:bg-briefme-secondary"
          >
            {user ? 'Criar meu primeiro briefing' : 'Começar gratuitamente'}
            <ArrowRight size={18} />
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
            <div className="flex flex-col items-center p-6 border rounded-lg hover-scale">
              <div className="w-12 h-12 rounded-full bg-briefme-primary/20 flex items-center justify-center mb-4">
                <FileText size={24} className="text-briefme-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Formulários Personalizados</h3>
              <p className="text-briefme-neutral text-center">
                Crie formulários com campos personalizados para qualquer tipo de projeto.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 border rounded-lg hover-scale">
              <div className="w-12 h-12 rounded-full bg-briefme-primary/20 flex items-center justify-center mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-briefme-primary"
                >
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Experiência Agradável</h3>
              <p className="text-briefme-neutral text-center">
                Interface amigável e intuitiva para você e seus clientes.
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 border rounded-lg hover-scale">
              <div className="w-12 h-12 rounded-full bg-briefme-primary/20 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-briefme-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Respostas Organizadas</h3>
              <p className="text-briefme-neutral text-center">
                Receba e gerencie todas as respostas em um só lugar.
              </p>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Projetado para <span className="text-briefme-primary">freelancers</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-briefme-light p-8 rounded-lg border shadow-sm">
                <h3 className="font-semibold text-xl mb-4">Formulário de Briefing</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border">
                    <label className="block text-sm font-medium mb-1">Nome do Projeto</label>
                    <div className="h-8 bg-gray-100 rounded"></div>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <label className="block text-sm font-medium mb-1">Objetivo</label>
                    <div className="h-16 bg-gray-100 rounded"></div>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <label className="block text-sm font-medium mb-1">Público-alvo</label>
                    <div className="h-8 bg-gray-100 rounded"></div>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-24 h-10 bg-briefme-primary rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Capture informações essenciais</h3>
              <p className="text-briefme-neutral mb-6">
                Com o BriefMe, você pode criar formulários personalizados que capturam exatamente as informações que você precisa para cada tipo de projeto.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-briefme-primary mt-1 flex-shrink-0" />
                  <span>Escolha entre diferentes tipos de campo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-briefme-primary mt-1 flex-shrink-0" />
                  <span>Adicione campos personalizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-briefme-primary mt-1 flex-shrink-0" />
                  <span>Defina campos obrigatórios</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={20} className="text-briefme-primary mt-1 flex-shrink-0" />
                  <span>Inclua dicas para orientar seus clientes</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Button 
              onClick={handleCTAClick} 
              size="lg"
              className="gap-2 bg-briefme-primary hover:bg-briefme-secondary"
            >
              {user ? 'Criar meu primeiro briefing' : 'Começar gratuitamente'}
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
