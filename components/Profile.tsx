
import React from 'react';
import { User, Transaction, TransactionType } from '../types';
import { MOCK_PROFILE, MOCK_TRANSACTIONS, COLORS } from '../constants';
import { Card } from './common/Card';
import { Icon } from './common/Icon';
import { TierBadge } from './common/TierBadge';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {

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

  const InfoField: React.FC<{ label: string; value: string; icon: string }> = ({ label, value, icon }) => (
    <div>
      <label className="text-xs text-[#64748b] flex items-center">
        <Icon name={icon} className="w-4 h-4 mr-2"/>
        {label}
      </label>
      <p className="font-medium text-[#475569]">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#475569]">Meu Perfil</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="text-center">
            <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg -mt-16" />
            <h3 className="text-xl font-bold mt-4">{user.name}</h3>
            <div className="mt-2">
                <TierBadge tier={user.tier} />
            </div>
            <p className="text-sm text-[#64748b] mt-2">Membro desde 2022</p>
          </Card>
          <Card>
            <h4 className="font-bold text-lg mb-4">Informações Pessoais</h4>
            <div className="space-y-4">
              <InfoField label="E-mail" value={MOCK_PROFILE.email} icon="email" />
              <InfoField label="Telefone" value={MOCK_PROFILE.phone} icon="phone" />
              <InfoField label="Aniversário" value={MOCK_PROFILE.birthdate} icon="cake" />
            </div>
          </Card>
           <Card>
            <h4 className="font-bold text-lg mb-4">Preferências</h4>
             <div className="flex flex-wrap gap-2">
                {MOCK_PROFILE.preferences.travelInterests.map(interest => (
                    <span key={interest} className="text-xs font-medium bg-[#e2e8f0] text-[#475569] px-2.5 py-1 rounded-full">{interest}</span>
                ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <h4 className="font-bold text-lg mb-4">Histórico Completo de Pontos</h4>
             <ul className="space-y-4">
            {MOCK_TRANSACTIONS.map((tx) => {
              const { icon, color } = getTransactionIcon(tx.type);
              return (
                <li key={tx.id} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <div className="rounded-full p-2 mr-4" style={{ backgroundColor: `${color}1A` }}>
                    <Icon name={icon} className="w-5 h-5" style={{ color }} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-[#64748b]">{tx.date} {tx.type === TransactionType.Pending && '(Pendente)'}</p>
                  </div>
                  <span className={`font-semibold ${tx.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.points > 0 ? `+${tx.points.toLocaleString('pt-BR')}` : tx.points.toLocaleString('pt-BR')}
                  </span>
                </li>
              );
            })}
          </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
