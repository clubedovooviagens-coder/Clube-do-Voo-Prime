
import React from 'react';
import { Tier } from '../../types';

interface TierBadgeProps {
  tier: Tier;
}

export const TierBadge: React.FC<TierBadgeProps> = ({ tier }) => {
  const tierStyles: { [key in Tier]: { bg: string; text: string; border: string } } = {
    [Tier.Bronze]: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
    [Tier.Prata]: { bg: 'bg-gray-200', text: 'text-gray-800', border: 'border-gray-300' },
    [Tier.Ouro]: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  };

  const style = tierStyles[tier];

  return (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${style.bg} ${style.text} ${style.border}`}>
      {tier}
    </span>
  );
};
