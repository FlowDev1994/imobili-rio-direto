export type LeadSource = 'olx' | 'facebook';
export type LeadType = 'venda' | 'compra' | 'aluguel';
export type LeadStatus = 'novo' | 'contactado' | 'qualificado' | 'negociando';

export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  fonte: LeadSource;
  tipo: LeadType;
  status: LeadStatus;
  imovel: {
    titulo: string;
    tipo: string;
    localizacao: string;
    preco: number;
    area?: number;
    quartos?: number;
  };
  mensagem?: string;
  dataCaptacao: Date;
  ultimaInteracao?: Date;
  urlOriginal?: string;
}
