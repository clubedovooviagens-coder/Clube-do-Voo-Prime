
import React, { useState } from 'react';
import { User, Reward } from '../types';
import { MOCK_REWARDS, COLORS } from '../constants';
import { Card } from './common/Card';
import { Icon } from './common/Icon';

interface RewardsProps {
  user: User;
}

const RewardCard: React.FC<{ reward: Reward; onSelect: (reward: Reward) => void }> = ({ reward, onSelect }) => (
  <Card className="flex flex-col overflow-hidden h-full">
    <img src={reward.imageUrl} alt={reward.title} className="w-full h-40 object-cover" />
    <div className="p-4 flex flex-col flex-grow">
      <p className="text-sm text-[#64748b]">{reward.category}</p>
      <h4 className="font-bold text-lg mt-1 flex-grow">{reward.title}</h4>
      <div className="flex items-center text-[#00569e] font-bold text-xl mt-4">
        <Icon name="star" className="w-5 h-5 text-[#fbbf24] mr-2" />
        <span>{reward.points.toLocaleString('pt-BR')}</span>
      </div>
      <button 
        onClick={() => onSelect(reward)}
        className="mt-4 w-full bg-[#0a73b0] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#00569e] transition-colors"
      >
        Ver Detalhes
      </button>
    </div>
  </Card>
);

const RewardModal: React.FC<{ reward: Reward; onClose: () => void; userPoints: number }> = ({ reward, onClose, userPoints }) => {
  const canRedeem = userPoints >= reward.points;
  const redeemUrl = `https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER&text=Olá! Gostaria de resgatar meus pontos para: ${encodeURIComponent(reward.title)}.`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <Card className="relative w-full max-w-lg bg-white max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#64748b] hover:text-[#475569]">
          <Icon name="close" className="w-6 h-6" />
        </button>
        <img src={reward.imageUrl} alt={reward.title} className="w-full h-48 object-cover rounded-t-xl"/>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#00569e]">{reward.title}</h3>
          <p className="text-sm text-[#64748b] mt-1">{reward.category}</p>
          <div className="flex items-center text-[#00569e] font-bold text-2xl my-4">
            <Icon name="star" className="w-6 h-6 text-[#fbbf24] mr-2" />
            <span>{reward.points.toLocaleString('pt-BR')} pontos</span>
          </div>
          {reward.availability !== null && (
            <p className="text-sm font-medium text-[#facc15] bg-yellow-50 px-2 py-1 rounded-md inline-block">
              Restam apenas {reward.availability} unidades!
            </p>
          )}
          <div className="mt-4 space-y-2 text-sm text-[#475569]">
            <p className="font-semibold">Descrição:</p>
            <p>{reward.description}</p>
          </div>
          <div className="mt-4 space-y-2 text-xs text-[#64748b]">
            <p className="font-semibold">Termos e Condições:</p>
            <p>{reward.terms}</p>
          </div>

          <a
            href={canRedeem ? redeemUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => !canRedeem && e.preventDefault()}
            className={`mt-6 w-full flex items-center justify-center text-center font-bold py-3 px-4 rounded-lg transition-colors ${
              canRedeem 
                ? 'bg-[#fbbf24] text-white hover:opacity-90' 
                : 'bg-[#e2e8f0] text-[#64748b] cursor-not-allowed'
            }`}
          >
            {canRedeem ? 'Resgatar Agora' : 'Pontos Insuficientes'}
          </a>
        </div>
      </Card>
    </div>
  );
};

const Rewards: React.FC<RewardsProps> = ({ user }) => {
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#475569]">Catálogo de Recompensas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_REWARDS.map((reward) => (
          <RewardCard key={reward.id} reward={reward} onSelect={setSelectedReward} />
        ))}
      </div>
      {selectedReward && <RewardModal reward={selectedReward} onClose={() => setSelectedReward(null)} userPoints={user.points} />}
    </div>
  );
};

export default Rewards;
