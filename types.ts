
export enum Tier {
  Bronze = 'Bronze',
  Prata = 'Prata',
  Ouro = 'Ouro',
}

export interface User {
  name: string;
  points: number;
  tier: Tier;
  tierProgress: number; // percentage
  nextTier: Tier | null;
  avatarUrl: string;
}

export interface Reward {
  id: number;
  title: string;
  category: string;
  points: number;
  imageUrl: string;
  description: string;
  terms: string;
  availability: number | null; // null for unlimited
}

export enum TransactionType {
  Earn = 'earn',
  Redeem = 'redeem',
  Pending = 'pending',
}

export interface Transaction {
  id: number;
  description: string;
  points: number;
  type: TransactionType;
  date: string;
}

export interface Profile {
  email: string;
  phone: string;
  birthdate: string;
  preferences: {
    language: string;
    currency: string;
    travelInterests: string[];
  };
  redemptionHistory: Transaction[];
}

export type Page = 'dashboard' | 'rewards' | 'profile';
