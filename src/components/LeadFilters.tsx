import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LeadFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sourceFilter: string;
  onSourceChange: (value: string) => void;
  typeFilter: string;
  onTypeChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function LeadFilters({
  searchTerm,
  onSearchChange,
  sourceFilter,
  onSourceChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
}: LeadFiltersProps) {
  const FilterButton = ({ 
    active, 
    onClick, 
    children 
  }: { 
    active: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "h-8 px-3 text-sm transition-all",
        active 
          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      {children}
    </Button>
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, telefone ou localização..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-secondary border-border/50 focus:border-primary"
        />
      </div>
      
      <div className="flex flex-wrap gap-6">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Fonte</p>
          <div className="flex gap-1">
            <FilterButton active={sourceFilter === 'all'} onClick={() => onSourceChange('all')}>
              Todas
            </FilterButton>
            <FilterButton active={sourceFilter === 'olx'} onClick={() => onSourceChange('olx')}>
              OLX
            </FilterButton>
            <FilterButton active={sourceFilter === 'facebook'} onClick={() => onSourceChange('facebook')}>
              Facebook
            </FilterButton>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Tipo</p>
          <div className="flex gap-1">
            <FilterButton active={typeFilter === 'all'} onClick={() => onTypeChange('all')}>
              Todos
            </FilterButton>
            <FilterButton active={typeFilter === 'venda'} onClick={() => onTypeChange('venda')}>
              Venda
            </FilterButton>
            <FilterButton active={typeFilter === 'compra'} onClick={() => onTypeChange('compra')}>
              Compra
            </FilterButton>
            <FilterButton active={typeFilter === 'aluguel'} onClick={() => onTypeChange('aluguel')}>
              Aluguel
            </FilterButton>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</p>
          <div className="flex gap-1">
            <FilterButton active={statusFilter === 'all'} onClick={() => onStatusChange('all')}>
              Todos
            </FilterButton>
            <FilterButton active={statusFilter === 'novo'} onClick={() => onStatusChange('novo')}>
              Novo
            </FilterButton>
            <FilterButton active={statusFilter === 'contactado'} onClick={() => onStatusChange('contactado')}>
              Contactado
            </FilterButton>
            <FilterButton active={statusFilter === 'qualificado'} onClick={() => onStatusChange('qualificado')}>
              Qualificado
            </FilterButton>
            <FilterButton active={statusFilter === 'negociando'} onClick={() => onStatusChange('negociando')}>
              Negociando
            </FilterButton>
          </div>
        </div>
      </div>
    </div>
  );
}
