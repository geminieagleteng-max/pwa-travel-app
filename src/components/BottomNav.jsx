import React from 'react';
import { Calendar, Map, Coins, CheckSquare, MoreHorizontal } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'itinerary', label: '行程', icon: Calendar },
    { id: 'map', label: '地圖', icon: Map },
    { id: 'expenses', label: '記帳', icon: Coins },
    { id: 'checklist', label: '行李', icon: CheckSquare },
    { id: 'info', label: '更多', icon: MoreHorizontal }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
          >
            <IconComponent size={20} className="nav-icon" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
