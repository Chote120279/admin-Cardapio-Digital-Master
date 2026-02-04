export interface AppConfig {
  // Restaurante
  nomeRestaurante: string;
  telefone: string;
  whatsapp: string;
  endereco: string;
  instagram: string;
  horarioFuncionamento: string;
  logo: string; // URL ou emoji
  
  // Operacional
  taxaEntrega: number;
  tempoEntregaMin: number;
  pedidoMinimo: number;
  raioEntrega: number;
  formasPagamento: {
    pix: boolean;
    dinheiro: boolean;
    cartaoDebito: boolean;
    cartaoCredito: boolean;
  };
  
  // Tema
  tema: {
    nome: string; // Nome do tema ou "Personalizado"
    corPrimaria: string;
    corSecundaria: string;
    corDestaque: string;
    corTexto: string;
    corFundo: string;
    corTextoSecundario: string;
  };
  
  // Produtos
  produtos: {
    permiteMeioAMeio: boolean;
    limiteAdicionais: number;
    primeiroAdicionalGratis: boolean;
    exibirTempoPreparo: boolean;
    exibirAvaliacoes: boolean;
  };
  
  // Aparência
  aparencia: {
    layoutCardapio: 'lista' | 'grid' | 'galeria';
    exibirDescricao: boolean;
    exibirMaisVendido: boolean;
    exibirPromocao: boolean;
    animacoes: boolean;
  };
}

export interface Theme {
  nome: string;
  corPrimaria: string;
  corSecundaria: string;
  corDestaque: string;
  corTexto: string;
  corFundo: string;
  corTextoSecundario: string;
}

export const PRE_DEFINED_THEMES: Theme[] = [
  {
    nome: '🔴 Pizzaria Clássica',
    corPrimaria: '#E74C3C',
    corSecundaria: '#F8B500',
    corDestaque: '#2ECC71',
    corTexto: '#111827',
    corFundo: '#F3F4F6',
    corTextoSecundario: '#6B7280'
  },
  {
    nome: '🟢 Hamburgeria Moderna',
    corPrimaria: '#F59E0B',
    corSecundaria: '#10B981',
    corDestaque: '#EF4444',
    corTexto: '#111827',
    corFundo: '#F3F4F6',
    corTextoSecundario: '#6B7280'
  },
  {
    nome: '🔵 Sushi Elegante',
    corPrimaria: '#3B82F6',
    corSecundaria: '#1F2937',
    corDestaque: '#F59E0B',
    corTexto: '#111827',
    corFundo: '#F3F4F6',
    corTextoSecundario: '#6B7280'
  },
  {
    nome: '🟣 Açaí Vibrante',
    corPrimaria: '#8B5CF6',
    corSecundaria: '#EC4899',
    corDestaque: '#10B981',
    corTexto: '#111827',
    corFundo: '#F3F4F6',
    corTextoSecundario: '#6B7280'
  },
  {
    nome: '🟤 Padaria Aconchegante',
    corPrimaria: '#92400E',
    corSecundaria: '#FBBF24',
    corDestaque: '#DC2626',
    corTexto: '#111827',
    corFundo: '#F3F4F6',
    corTextoSecundario: '#6B7280'
  }
];

export const DEFAULT_CONFIG: AppConfig = {
  nomeRestaurante: 'Meu Restaurante',
  telefone: '(00) 0000-0000',
  whatsapp: '00000000000',
  endereco: 'Rua Exemplo, 123 - Cidade/UF',
  instagram: '@meurestaurante',
  horarioFuncionamento: 'Seg-Sex: 11h-23h | Sáb-Dom: 11h-00h',
  logo: '🍽️',
  
  taxaEntrega: 5.00,
  tempoEntregaMin: 30,
  pedidoMinimo: 20.00,
  raioEntrega: 5,
  formasPagamento: {
    pix: true,
    dinheiro: true,
    cartaoDebito: true,
    cartaoCredito: true
  },
  
  tema: {
    nome: 'Padrão',
    corPrimaria: '#667EEA',
    corSecundaria: '#764BA2',
    corDestaque: '#10B981',
    corTexto: '#111827',
    corFundo: '#F3F4F6',
    corTextoSecundario: '#6B7280'
  },
  
  produtos: {
    permiteMeioAMeio: true,
    limiteAdicionais: 10,
    primeiroAdicionalGratis: false,
    exibirTempoPreparo: true,
    exibirAvaliacoes: true
  },
  
  aparencia: {
    layoutCardapio: 'grid',
    exibirDescricao: true,
    exibirMaisVendido: true,
    exibirPromocao: true,
    animacoes: true
  }
};
