export type LeadSource = 'olx' | 'facebook';
export type LeadType = 'venda' | 'compra' | 'aluguel';
export type PropertyType = 'casa' | 'apartamento' | 'terreno' | 'comercial';
export type LeadStatus = 'novo' | 'contactado' | 'qualificado' | 'negociando' | 'fechado' | 'perdido';

export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  fonte: LeadSource;
  tipo: LeadType;
  tipoImovel: PropertyType;
  status: LeadStatus;
  imovel: {
    titulo: string;
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
