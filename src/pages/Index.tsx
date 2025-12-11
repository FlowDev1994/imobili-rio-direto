import { useState, useMemo } from 'react';
import { Users, TrendingUp, Home, Target } from 'lucide-react';
import { mockLeads } from '@/data/mockLeads';
import { Lead } from '@/types/lead';
import { Header } from '@/components/Header';
import { StatCard } from '@/components/StatCard';
import { LeadFilters } from '@/components/LeadFilters';
import { LeadCard } from '@/components/LeadCard';
import { LeadDetailModal } from '@/components/LeadDetailModal';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [leads] = useState<Lead[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.telefone.includes(searchTerm) ||
        lead.imovel.localizacao.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSource = sourceFilter === 'all' || lead.fonte === sourceFilter;
      const matchesType = typeFilter === 'all' || lead.tipo === typeFilter;
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      
      return matchesSearch && matchesSource && matchesType && matchesStatus;
    });
  }, [leads, searchTerm, sourceFilter, typeFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = leads.length;
    const novos = leads.filter((l) => l.status === 'novo').length;
    const qualificados = leads.filter((l) => l.status === 'qualificado').length;
    const negociando = leads.filter((l) => l.status === 'negociando').length;
    
    return { total, novos, qualificados, negociando };
  }, [leads]);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };

  const handleRefresh = () => {
    toast({
      title: "Buscando novos leads...",
      description: "Verificando OLX e Facebook Marketplace.",
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      {/* Background Glow Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <Header onRefresh={handleRefresh} />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total de Leads"
            value={stats.total}
            icon={Users}
            trend={{ value: 12, positive: true }}
            delay={100}
          />
          <StatCard
            title="Leads Novos"
            value={stats.novos}
            icon={TrendingUp}
            trend={{ value: 8, positive: true }}
            delay={200}
          />
          <StatCard
            title="Qualificados"
            value={stats.qualificados}
            icon={Target}
            delay={300}
          />
          <StatCard
            title="Em Negociação"
            value={stats.negociando}
            icon={Home}
            delay={400}
          />
        </div>
        
        {/* Main Content */}
        <div className="glass-card p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">Leads Captados</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredLeads.length} leads encontrados
              </p>
            </div>
          </div>
          
          <LeadFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sourceFilter={sourceFilter}
            onSourceChange={setSourceFilter}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
          
          <div className="grid gap-4 mt-6 md:grid-cols-2">
            {filteredLeads.map((lead, index) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onClick={handleLeadClick}
                delay={400 + index * 50}
              />
            ))}
          </div>
          
          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum lead encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
        
        <LeadDetailModal
          lead={selectedLead}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </div>
  );
};

export default Index;
