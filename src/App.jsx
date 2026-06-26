import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import ItineraryTab from './components/ItineraryTab';
import MapView from './components/MapView';
import ExpenseTracker from './components/ExpenseTracker';
import Checklist from './components/Checklist';
import InfoTab from './components/InfoTab';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fukuokaTripData } from './db/mockData';
import { Wifi, WifiOff, Compass } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [activeDay, setActiveDay] = useState(1);
  const [tripData, setTripData] = useLocalStorage('travel_trip_data_v2', fukuokaTripData);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Render components based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'itinerary':
        return (
          <ItineraryTab 
            tripData={tripData} 
            setTripData={setTripData} 
            activeDay={activeDay}
            setActiveDay={setActiveDay}
          />
        );
      case 'map':
        return (
          <MapView 
            tripData={tripData} 
            activeDay={activeDay} 
            setActiveDay={setActiveDay} 
          />
        );
      case 'expenses':
        return (
          <ExpenseTracker members={tripData.members} />
        );
      case 'checklist':
        return (
          <Checklist />
        );
      case 'info':
        return (
          <InfoTab />
        );
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="app-container">
      {/* App Top Header */}
      <header style={{
        padding: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(11, 15, 25, 0.85)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={22} style={{ color: 'var(--primary-light)' }} />
          <div>
            <h1 style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }} className="gradient-text">
              {tripData.title.split(' ')[2] || 'Travel Go'}
            </h1>
            <span style={{ fontSize: '10px', color: 'var(--text-dark)' }}>{tripData.dates}</span>
          </div>
        </div>

        {/* Network Status Badge */}
        <div>
          {isOnline ? (
            <span className="badge badge-teal" style={{ padding: '3px 8px', fontSize: '10px', display: 'flex', gap: '4px' }}>
              <Wifi size={10} /> 連線中
            </span>
          ) : (
            <span className="badge badge-rose" style={{ padding: '3px 8px', fontSize: '10px', display: 'flex', gap: '4px' }}>
              <WifiOff size={10} /> 離線模式
            </span>
          )}
        </div>
      </header>

      {/* Main Page Content Body */}
      <main style={{ 
        flex: 1, 
        overflowY: activeTab === 'map' ? 'hidden' : 'auto', 
        display: activeTab === 'map' ? 'flex' : 'block',
        flexDirection: activeTab === 'map' ? 'column' : 'initial',
        paddingBottom: activeTab === 'map' ? '0' : '90px'
      }}>
        {renderContent()}
      </main>

      {/* Bottom Floating Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
