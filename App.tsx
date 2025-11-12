
import React, { useState } from 'react';
import { Page, User } from './types';
import Dashboard from './components/Dashboard';
import Rewards from './components/Rewards';
import Profile from './components/Profile';
import { MOCK_USER } from './constants';
import { Icon } from './components/common/Icon';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [user] = useState<User>(MOCK_USER);

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'rewards':
        return <Rewards user={user} />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };
  
  const NavItem: React.FC<{ page: Page; label: string; iconName: string }> = ({ page, label, iconName }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex-1 flex flex-col items-center justify-center p-2 text-sm transition-colors duration-200 ${
        currentPage === page ? 'text-[#00569e]' : 'text-[#64748b] hover:text-[#00569e]'
      }`}
    >
      <Icon name={iconName} className="w-6 h-6 mb-1" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f7f9fc] font-sans text-[#475569]">
      <header className="sticky top-0 z-10 bg-[#00569e] text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Clube do Voo Prime</h1>
        <div className="flex items-center space-x-2">
          <Icon name="star" className="w-5 h-5 text-[#fbbf24]"/>
          <span className="font-semibold">{user.points.toLocaleString('pt-BR')} pts</span>
          <img src={user.avatarUrl} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-white"/>
        </div>
      </header>

      <main className="p-4 pb-20">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] flex md:hidden">
         <NavItem page="dashboard" label="Painel" iconName="dashboard" />
         <NavItem page="rewards" label="Recompensas" iconName="gift" />
         <NavItem page="profile" label="Perfil" iconName="user" />
      </nav>
      
      {/* Sidebar for larger screens */}
      <div className="fixed top-0 left-0 h-full bg-white shadow-lg hidden md:flex flex-col w-64">
          <div className="p-5 bg-[#00569e] text-white text-2xl font-bold">
            Clube do Voo Prime
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            <SideNavItem page="dashboard" label="Painel" iconName="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <SideNavItem page="rewards" label="Recompensas" iconName="gift" currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <SideNavItem page="profile" label="Perfil" iconName="user" currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </nav>
      </div>
      
      <div className="md:pl-64">
          <main className="p-4 md:p-8">
            {renderContent()}
          </main>
      </div>
    </div>
  );
};

interface SideNavItemProps {
  page: Page;
  label: string;
  iconName: string;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const SideNavItem: React.FC<SideNavItemProps> = ({ page, label, iconName, currentPage, setCurrentPage }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex items-center p-3 rounded-lg text-left transition-all duration-200 ${
        currentPage === page
          ? 'bg-[#e2e8f0] text-[#00569e] font-bold'
          : 'text-[#475569] hover:bg-gray-100'
      }`}
    >
      <Icon name={iconName} className="w-6 h-6 mr-3" />
      <span>{label}</span>
    </button>
);


export default App;
