import React, { useState } from 'react';
import { 
  Plane, Hotel, ShoppingBag, Utensils, Compass, Ship, Train, Car, Plus, Trash2, Clock, MapPin 
} from 'lucide-react';

const iconMap = {
  airport: Plane,
  hotel: Hotel,
  shopping: ShoppingBag,
  restaurant: Utensils,
  sightseeing: Compass,
  ferry: Ship,
  train: Train,
  taxi: Car
};

export default function ItineraryTab({ tripData, setTripData, activeDay, setActiveDay }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSpot, setNewSpot] = useState({
    time: '',
    name: '',
    desc: '',
    iconType: 'sightseeing',
    lat: 33.5900,
    lng: 130.4010
  });

  const dayData = tripData.days.find(d => d.dayNum === activeDay) || tripData.days[0];

  const handleDeleteSpot = (indexToDelete) => {
    const updatedDays = tripData.days.map(day => {
      if (day.dayNum === activeDay) {
        return {
          ...day,
          spots: day.spots.filter((_, idx) => idx !== indexToDelete)
        };
      }
      return day;
    });
    setTripData({ ...tripData, days: updatedDays });
  };

  const handleAddSpot = (e) => {
    e.preventDefault();
    if (!newSpot.name || !newSpot.time) return;

    const updatedDays = tripData.days.map(day => {
      if (day.dayNum === activeDay) {
        // Sort spots after adding by time
        const newSpots = [...day.spots, { ...newSpot, lat: parseFloat(newSpot.lat), lng: parseFloat(newSpot.lng) }];
        newSpots.sort((a, b) => a.time.localeCompare(b.time));
        return {
          ...day,
          spots: newSpots
        };
      }
      return day;
    });

    setTripData({ ...tripData, days: updatedDays });
    setShowAddForm(false);
    setNewSpot({
      time: '',
      name: '',
      desc: '',
      iconType: 'sightseeing',
      lat: 33.5900,
      lng: 130.4010
    });
  };

  return (
    <div className="fade-in" style={{ padding: '16px' }}>
      {/* Day Selector (Horizontal Scroll) */}
      <div style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: '8px', 
        paddingBottom: '12px',
        marginBottom: '16px',
        scrollbarWidth: 'none'
      }}>
        {tripData.days.map((day) => (
          <button
            key={day.dayNum}
            onClick={() => { setActiveDay(day.dayNum); setShowAddForm(false); }}
            style={{
              padding: '10px 16px',
              borderRadius: '20px',
              border: activeDay === day.dayNum ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.06)',
              background: activeDay === day.dayNum ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            Day {day.dayNum} ({day.date.split(' ')[0]})
          </button>
        ))}
      </div>

      {/* Day Title & Hotel Info */}
      <div className="glass-card" style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>
          <span style={{ color: 'var(--primary-light)', marginRight: '8px' }}>Day {dayData.dayNum}</span> 
          {dayData.title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
          <Hotel size={14} style={{ marginRight: '6px' }} />
          <span>住宿點：{dayData.hotel}</span>
        </div>
      </div>

      {/* Spots Timeline */}
      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        {/* Vertical Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '7px',
          top: '8px',
          bottom: '8px',
          width: '2px',
          background: 'linear-gradient(to bottom, var(--primary), var(--secondary))',
          opacity: 0.3
        }} />

        {dayData.spots.length === 0 ? (
          <div style={{ padding: '20px 0', color: 'var(--text-dark)', textAlign: 'center' }}>
            本日無行程，請點擊下方按鈕新增景點。
          </div>
        ) : (
          dayData.spots.map((spot, idx) => {
            const Icon = iconMap[spot.iconType] || Compass;
            return (
              <div key={idx} style={{ position: 'relative', marginBottom: '24px' }}>
                {/* Bullet node on the line */}
                <div style={{
                  position: 'absolute',
                  left: '-24px',
                  top: '4px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--bg-start)',
                  border: '3px solid var(--primary-light)',
                  boxShadow: '0 0 8px var(--primary-glow)',
                  zIndex: 2
                }} />

                {/* Spot Card */}
                <div className="glass-card" style={{ margin: 0, padding: '14px', position: 'relative' }}>
                  {/* Delete button */}
                  <button 
                    onClick={() => handleDeleteSpot(idx)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '12px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-dark)',
                      cursor: 'pointer',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dark)'}
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Header: Time & Spot Name */}
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', paddingRight: '24px' }}>
                    <Icon size={16} style={{ color: 'var(--primary-light)', marginRight: '8px' }} />
                    <span style={{ 
                      fontWeight: 'bold', 
                      fontSize: '15px', 
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span className="badge badge-teal" style={{ fontSize: '11px' }}>
                        <Clock size={10} /> {spot.time}
                      </span>
                      {spot.name}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    {spot.desc}
                  </p>
                  
                  {/* Coordinates Badge */}
                  {spot.lat && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      marginTop: '8px', 
                      fontSize: '10px', 
                      color: 'var(--text-dark)' 
                    }}>
                      <MapPin size={10} />
                      <span>{spot.lat.toFixed(4)}, {spot.lng.toFixed(4)}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Spot Trigger Button */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-secondary"
          style={{ width: '100%', marginTop: '8px', borderRadius: '16px' }}
        >
          <Plus size={16} /> 新增行程景點
        </button>
      ) : (
        <form onSubmit={handleAddSpot} className="glass-card" style={{ marginTop: '16px' }}>
          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'var(--primary-light)' }}>新增行程景點</h3>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>時間 (HH:MM)</label>
              <input
                type="text"
                placeholder="例如 09:30"
                value={newSpot.time}
                onChange={e => setNewSpot({ ...newSpot, time: e.target.value })}
                required
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  padding: '8px',
                  fontSize: '13px'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>類型</label>
              <select
                value={newSpot.iconType}
                onChange={e => setNewSpot({ ...newSpot, iconType: e.target.value })}
                style={{
                  width: '100%',
                  background: '#1e293b',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  padding: '8px',
                  fontSize: '13px'
                }}
              >
                <option value="sightseeing">景點 (Sightseeing)</option>
                <option value="restaurant">餐廳 (Restaurant)</option>
                <option value="hotel">住宿 (Hotel)</option>
                <option value="shopping">購物 (Shopping)</option>
                <option value="airport">機場 (Airport)</option>
                <option value="train">火車/地鐵 (Train)</option>
                <option value="taxi">計程車/巴士 (Taxi/Bus)</option>
                <option value="ferry">渡輪 (Ferry)</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>景點/名稱</label>
            <input
              type="text"
              placeholder="輸入景點或活動名稱"
              value={newSpot.name}
              onChange={e => setNewSpot({ ...newSpot, name: e.target.value })}
              required
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
                padding: '8px',
                fontSize: '13px'
              }}
            />
          </div>

          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>備註說明</label>
            <textarea
              placeholder="活動細節或交通指南"
              value={newSpot.desc}
              onChange={e => setNewSpot({ ...newSpot, desc: e.target.value })}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: 'white',
                padding: '8px',
                fontSize: '13px',
                minHeight: '60px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>緯度 (Lat)</label>
              <input
                type="number"
                step="0.0001"
                value={newSpot.lat}
                onChange={e => setNewSpot({ ...newSpot, lat: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  padding: '8px',
                  fontSize: '13px'
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>經度 (Lng)</label>
              <input
                type="number"
                step="0.0001"
                value={newSpot.lng}
                onChange={e => setNewSpot({ ...newSpot, lng: e.target.value })}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: 'white',
                  padding: '8px',
                  fontSize: '13px'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn-secondary"
              style={{ flex: 1, padding: '10px' }}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1, padding: '10px' }}
            >
              確認新增
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
