
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Briefing, BriefingResponse } from '@/types';
import { toast } from 'sonner';
import { useAuth } from './AuthContext';

interface BriefingContextType {
  briefings: Briefing[];
  isLoading: boolean;
  createBriefing: (briefing: Omit<Briefing, 'id' | 'createdAt' | 'createdBy' | 'responses'>) => Promise<Briefing>;
  getBriefing: (id: string) => Briefing | undefined;
  updateBriefing: (id: string, updates: Partial<Briefing>) => Promise<void>;
  deleteBriefing: (id: string) => Promise<void>;
  submitResponse: (briefingId: string, answers: Record<string, string>, submittedBy?: string) => Promise<void>;
}

const BriefingContext = createContext<BriefingContextType | undefined>(undefined);

export function BriefingProvider({ children }: { children: ReactNode }) {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  // Load briefings from localStorage on component mount
  useEffect(() => {
    if (user) {
      const storedBriefings = localStorage.getItem(`briefme_briefings_${user.id}`);
      if (storedBriefings) {
        try {
          setBriefings(JSON.parse(storedBriefings));
        } catch (e) {
          console.error('Error parsing stored briefings:', e);
          localStorage.removeItem(`briefme_briefings_${user.id}`);
        }
      }
    } else {
      setBriefings([]);
    }
    setIsLoading(false);
  }, [user]);

  // Save briefings to localStorage whenever they change
  useEffect(() => {
    if (user && briefings.length > 0) {
      localStorage.setItem(`briefme_briefings_${user.id}`, JSON.stringify(briefings));
    }
  }, [briefings, user]);

  const createBriefing = async (briefingData: Omit<Briefing, 'id' | 'createdAt' | 'createdBy' | 'responses'>) => {
    if (!user) throw new Error('User must be logged in to create a briefing');
    
    const newBriefing: Briefing = {
      ...briefingData,
      id: `briefing_${Date.now()}`,
      createdAt: new Date(),
      createdBy: user.id,
      responses: []
    };
    
    setBriefings(prev => [...prev, newBriefing]);
    toast.success('Briefing criado com sucesso!');
    return newBriefing;
  };

  const getBriefing = (id: string) => {
    return briefings.find(b => b.id === id);
  };

  const updateBriefing = async (id: string, updates: Partial<Briefing>) => {
    setBriefings(prev => 
      prev.map(briefing => 
        briefing.id === id 
          ? { ...briefing, ...updates, updatedAt: new Date() } 
          : briefing
      )
    );
    toast.success('Briefing atualizado com sucesso!');
  };

  const deleteBriefing = async (id: string) => {
    setBriefings(prev => prev.filter(briefing => briefing.id !== id));
    toast.success('Briefing excluído com sucesso!');
  };

  const submitResponse = async (briefingId: string, answers: Record<string, string>, submittedBy?: string) => {
    const response: BriefingResponse = {
      id: `response_${Date.now()}`,
      briefingId,
      answers,
      submittedBy,
      submittedAt: new Date()
    };

    setBriefings(prev => 
      prev.map(briefing => 
        briefing.id === briefingId 
          ? { 
              ...briefing, 
              responses: [...briefing.responses, response] 
            } 
          : briefing
      )
    );
    
    toast.success('Resposta enviada com sucesso!');
  };

  return (
    <BriefingContext.Provider 
      value={{ 
        briefings, 
        isLoading, 
        createBriefing, 
        getBriefing, 
        updateBriefing, 
        deleteBriefing, 
        submitResponse 
      }}
    >
      {children}
    </BriefingContext.Provider>
  );
}

export function useBriefing() {
  const context = useContext(BriefingContext);
  if (context === undefined) {
    throw new Error('useBriefing must be used within a BriefingProvider');
  }
  return context;
}
