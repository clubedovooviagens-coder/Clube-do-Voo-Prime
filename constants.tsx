
import React from 'react';
import { User, Tier, Reward, Transaction, TransactionType, Profile } from './types';

export const COLORS = {
  primary: '#00569e',
  secondary: '#0a73b0',
  support: '#3871c1',
  white: '#ffffff',
  bg: '#f7f9fc',
  border: '#e2e8f0',
  textPrimary: '#475569',
  textSecondary: '#64748b',
  accent: '#fbbf24',
  success: '#22c55e',
  warning: '#facc15',
  error: '#ef4444',
  info: '#0ea5e9',
};

export const MOCK_USER: User = {
  name: 'Ana Silva',
  points: 8750,
  tier: Tier.Prata,
  tierProgress: 75,
  nextTier: Tier.Ouro,
  avatarUrl: 'https://picsum.photos/100/100',
};

export const MOCK_REWARDS: Reward[] = [
  {
    id: 1,
    title: 'Desconto de R$ 50',
    category: 'Descontos',
    points: 1000,
    imageUrl: 'https://picsum.photos/400/300?random=1',
    description: 'Use seus pontos para ganhar um desconto de R$ 50 na sua próxima viagem.',
    terms: 'Válido para qualquer pacote de viagem. Não cumulativo com outras promoções.',
    availability: null,
  },
  {
    id: 2,
    title: 'Acesso a Sala VIP Nacional',
    category: 'Experiências',
    points: 2500,
    imageUrl: 'https://picsum.photos/400/300?random=2',
    description: 'Relaxe antes do seu voo em uma de nossas salas VIP parceiras em aeroportos nacionais.',
    terms: 'Acesso individual válido por 3 horas. Sujeito à disponibilidade da sala.',
    availability: 50,
  },
  {
    id: 3,
    title: 'Seguro Viagem Gratuito',
    category: 'Serviços',
    points: 3500,
    imageUrl: 'https://picsum.photos/400/300?random=3',
    description: 'Viaje com tranquilidade com um seguro viagem gratuito que cobre até 15 dias.',
    terms: 'Cobertura básica para despesas médicas e extravio de bagagem.',
    availability: null,
  },
  {
    id: 4,
    title: 'Upgrade de Hospedagem',
    category: 'Experiências',
    points: 2000,
    imageUrl: 'https://picsum.photos/400/300?random=4',
    description: 'Receba um upgrade para uma categoria de quarto superior em hotéis parceiros.',
    terms: 'Sujeito à disponibilidade no momento do check-in. Válido para estadias de até 5 noites.',
    availability: 100,
  },
  {
    id: 5,
    title: 'Crédito de R$ 200 (Corporativo)',
    category: 'Corporativo',
    points: 5000,
    imageUrl: 'https://picsum.photos/400/300?random=5',
    description: 'Crédito de R$ 200 para usar em futuras viagens corporativas.',
    terms: 'Válido apenas para contas corporativas. Reversível em consumo futuro.',
    availability: null,
  },
  {
    id: 6,
    title: 'Passagem Nacional (sem taxas)',
    category: 'Viagens',
    points: 10000,
    imageUrl: 'https://picsum.photos/400/300?random=6',
    description: 'Resgate uma passagem aérea para qualquer destino nacional.',
    terms: 'Não inclui taxas de embarque. Não válido em feriados e alta temporada.',
    availability: 20,
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 1, description: 'Compra Pacote Búzios', points: 1250, type: TransactionType.Earn, date: '2024-07-15' },
    { id: 2, description: 'Resgate Desconto R$ 50', points: -1000, type: TransactionType.Redeem, date: '2024-07-10' },
    { id: 3, description: 'Bônus Aniversário', points: 300, type: TransactionType.Earn, date: '2024-06-22' },
    { id: 4, description: 'Avaliação Viagem Gramado', points: 100, type: TransactionType.Earn, date: '2024-06-05' },
    { id: 5, description: 'Pendente - Viagem a Foz', points: 2100, type: TransactionType.Pending, date: '2024-08-20' },
    { id: 6, description: 'Indicação de amigo', points: 500, type: TransactionType.Earn, date: '2024-05-18' },
];

export const MOCK_PROFILE: Profile = {
    email: 'ana.silva@example.com',
    phone: '+55 (11) 98765-4321',
    birthdate: '1990-06-22',
    preferences: {
        language: 'pt-BR',
        currency: 'BRL',
        travelInterests: ['Praia', 'Cultura', 'Aventura'],
    },
    redemptionHistory: MOCK_TRANSACTIONS.filter(t => t.type === TransactionType.Redeem)
};
