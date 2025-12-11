import { Lead } from '@/types/lead';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MapPin, Home, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LeadCardProps {
  lead: Lead;
  onClick: (lead: Lead) => void;
  delay?: number;
}

const statusLabels: Record<Lead['status'], string> = {
  novo: 'Novo',
  contactado: 'Contactado',
  qualificado: 'Qualificado',
  negociando: 'Negociando',
};

const tipoLabels: Record<Lead['tipo'], string> = {
  venda: 'Venda',
  compra: 'Compra',
  aluguel: 'Aluguel',
};

export function LeadCard({ lead, onClick, delay = 0 }: LeadCardProps) {
  const formatPrice = (price: number, tipo: Lead['tipo']) => {
    if (tipo === 'aluguel') {
      return `R$ ${price.toLocaleString('pt-BR')}/mês`;
    }
    return `R$ ${price.toLocaleString('pt-BR')}`;
  };

  return (
    <div 
      className="lead-card animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => onClick(lead)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              className={cn(
                "text-xs px-2 py-0.5",
                lead.fonte === 'olx' ? 'source-badge-olx' : 'source-badge-facebook'
              )}
            >
              {lead.fonte === 'olx' ? 'OLX' : 'Facebook'}
            </Badge>
            <Badge className={cn("text-xs px-2 py-0.5", `status-badge-${lead.status}`)}>
              {statusLabels[lead.status]}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-0.5 border-muted-foreground/30 text-muted-foreground">
              {tipoLabels[lead.tipo]}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-foreground truncate">{lead.nome}</h3>
          
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              {lead.telefone}
            </span>
            {lead.email && (
              <span className="flex items-center gap-1 truncate">
                <Mail className="w-3.5 h-3.5" />
                {lead.email}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 rounded-lg bg-secondary/50">
        <div className="flex items-start gap-2">
          <Home className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground text-sm truncate">{lead.imovel.titulo}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {lead.imovel.localizacao}
            </p>
          </div>
          <p className="font-semibold text-primary text-sm whitespace-nowrap">
            {formatPrice(lead.imovel.preco, lead.tipo)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Captado em {format(lead.dataCaptacao, "dd/MM/yyyy", { locale: ptBR })}
        </span>
        {lead.ultimaInteracao && (
          <span>Última interação: {format(lead.ultimaInteracao, "dd/MM", { locale: ptBR })}</span>
        )}
      </div>
    </div>
  );
}
