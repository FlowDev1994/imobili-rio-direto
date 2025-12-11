import { Lead } from '@/types/lead';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Home, 
  Calendar, 
  ExternalLink,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface LeadDetailModalProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function LeadDetailModal({ lead, open, onOpenChange }: LeadDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  if (!lead) return null;

  const formatPrice = (price: number, tipo: Lead['tipo']) => {
    if (tipo === 'aluguel') {
      return `R$ ${price.toLocaleString('pt-BR')}/mês`;
    }
    return `R$ ${price.toLocaleString('pt-BR')}`;
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(lead.telefone.replace(/\D/g, ''));
    setCopied(true);
    toast({
      title: "Telefone copiado!",
      description: "O número foi copiado para a área de transferência.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = () => {
    const phone = lead.telefone.replace(/\D/g, '');
    const message = encodeURIComponent(
      `Olá ${lead.nome}! Vi seu anúncio sobre "${lead.imovel.titulo}" e gostaria de mais informações.`
    );
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
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
          <DialogTitle className="text-xl font-display">{lead.nome}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Contato */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contato</h4>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-medium">{lead.telefone}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={copyPhone} className="h-8 px-2">
                  {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                </Button>
                <Button size="sm" onClick={openWhatsApp} className="h-8 gap-1 bg-success hover:bg-success/90">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
            {lead.email && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{lead.email}</span>
              </div>
            )}
          </div>
          
          {/* Imóvel */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Imóvel</h4>
            <div className="p-4 rounded-lg bg-secondary/50 space-y-3">
              <div className="flex items-start gap-2">
                <Home className="w-4 h-4 text-primary mt-1" />
                <div>
                  <p className="font-medium">{lead.imovel.titulo}</p>
                  <p className="text-sm text-muted-foreground">{lead.imovel.tipo}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{lead.imovel.localizacao}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  {lead.imovel.area && <span>{lead.imovel.area}m²</span>}
                  {lead.imovel.quartos && <span>{lead.imovel.quartos} quartos</span>}
                </div>
                <p className="font-bold text-lg text-primary">
                  {formatPrice(lead.imovel.preco, lead.tipo)}
                </p>
              </div>
            </div>
          </div>
          
          {/* Mensagem */}
          {lead.mensagem && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Mensagem do Anúncio</h4>
              <p className="text-sm text-foreground/80 p-3 rounded-lg bg-secondary/30 border border-border/50">
                "{lead.mensagem}"
              </p>
            </div>
          )}
          
          {/* Datas */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Captado: {format(lead.dataCaptacao, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            {lead.urlOriginal && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-xs gap-1"
                onClick={() => window.open(lead.urlOriginal, '_blank')}
              >
                <ExternalLink className="w-3 h-3" />
                Ver anúncio original
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
