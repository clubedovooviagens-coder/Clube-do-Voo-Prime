
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { User, Transaction, TransactionType } from '../types';
import { MOCK_TRANSACTIONS, COLORS } from '../constants';
import { Card } from './common/Card';
import { Icon } from './common/Icon';
import { TierBadge } from './common/TierBadge';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {

  const chartData = [
    { name: 'Mar', pontos: 1200 },
    { name: 'Abr', pontos: 2100 },
    { name: 'Mai', pontos: 800 },
    { name: 'Jun', pontos: 1600 },
    { name: 'Jul', pontos: 900 },
    { name: 'Ago', pontos: 1700 },
  ];

  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.Earn:
        return { icon: 'plus', color: COLORS.success };
      case TransactionType.Redeem:
        return { icon: 'minus', color: COLORS.error };
      case TransactionType.Pending:
        return { icon: 'clock', color: COLORS.warning };
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#475569]">Olá, {user.name}!</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Saldo de Pontos</h3>
            <Icon name="star" className="w-6 h-6 text-[#fbbf24]" />
          </div>
          <p className="text-4xl font-bold text-[#00569e] mt-2">{user.points.toLocaleString('pt-BR')}</p>
          <p className="text-sm text-[#64748b] mt-1">Pontos disponíveis para resgate</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Nível de Fidelidade</h3>
            <TierBadge tier={user.tier} />
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm font-medium text-[#64748b] mb-1">
              <span>{user.tier}</span>
              {user.nextTier && <span>{user.nextTier}</span>}
            </div>
            <div className="w-full bg-[#e2e8f0] rounded-full h-2.5">
              <div className="bg-[#0a73b0] h-2.5 rounded-full" style={{ width: `${user.tierProgress}%` }}></div>
            </div>
            <p className="text-xs text-center text-[#64748b] mt-2">
              Você está a {10000 - user.points} pontos do nível {user.nextTier}!
            </p>
          </div>
        </Card>

        <Card className="lg:col-span-1 md:col-span-2">
           <h3 className="font-bold text-lg mb-2">Ações Rápidas</h3>
           <div className="flex flex-col space-y-3 mt-4">
                <button className="flex items-center text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <Icon name="gift" className="w-6 h-6 text-[#00569e] mr-3" />
                    <span>Ver Recompensas</span>
                </button>
                <button className="flex items-center text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <Icon name="plane" className="w-6 h-6 text-[#00569e] mr-3" />
                    <span>Minhas Viagens</span>
                </button>
                <button className="flex items-center text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <Icon name="users" className="w-6 h-6 text-[#00569e] mr-3" />
                    <span>Indicar um Amigo</span>
                </button>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <h3 className="font-bold text-lg mb-4">Histórico de Pontos</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="name" stroke={COLORS.textSecondary} />
                <YAxis stroke={COLORS.textSecondary} />
                <Tooltip cursor={{fill: '#f7f9fc'}}/>
                <Bar dataKey="pontos" fill={COLORS.secondary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-bold text-lg mb-4">Atividade Recente</h3>
          <ul className="space-y-4">
            {MOCK_TRANSACTIONS.slice(0, 5).map((tx) => {
              const { icon, color } = getTransactionIcon(tx.type);
              return (
                <li key={tx.id} className="flex items-center">
                  <div className="rounded-full p-2 mr-4" style={{ backgroundColor: `${color}1A` }}>
                    <Icon name={icon} className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-[#64748b]">{tx.date}</p>
                  </div>
                  <span className={`font-semibold ${tx.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.points > 0 ? `+${tx.points}` : tx.points}
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
