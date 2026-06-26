import React, { useState } from 'react';
import { CheckSquare, Square, Plus, Trash2, CheckCircle2 } from 'lucide-react';

const DEFAULT_CHECKLIST = [
  // docs
  { id: 1, text: '護照正本（效期大於6個月）', category: 'docs', checked: false },
  { id: 2, text: 'Visit Japan Web 填寫與登錄', category: 'docs', checked: false },
  { id: 3, text: '投保旅遊平安險（台灣+日本）', category: 'docs', checked: false },
  { id: 4, text: '購買北九州 JR Pass 三日周遊券', category: 'docs', checked: false },
  { id: 5, text: '購買柳川 ➔ 太宰府 觀光套票', category: 'docs', checked: false },
  { id: 6, text: '關門海峽四葉草車票（遊客中心 台幣200元）', category: 'docs', checked: false },
  { id: 7, text: '兌換日圓現金 & 準備信用卡', category: 'docs', checked: false },
  { id: 8, text: '預約/確認台灣計程車（去程與回程）', category: 'docs', checked: false },
  { id: 9, text: '下載與註冊日本計程車 App (如 GO, DiDi)', category: 'docs', checked: false },
  { id: 10, text: '整理日本必買購物清單', category: 'docs', checked: false },
  { id: 11, text: '收集與標記想吃的餐廳 & 美食清單', category: 'docs', checked: false },
  
  // clothes
  { id: 12, text: '向朋友或家人借行李箱', category: 'clothes', checked: false },
  { id: 13, text: '輕便換洗衣物（夏裝）', category: 'clothes', checked: false },
  { id: 14, text: '防風防曬薄外套（登山口與海邊防風）', category: 'clothes', checked: false },
  { id: 15, text: '好走的運動鞋/慢跑鞋（市區散步多）', category: 'clothes', checked: false },
  { id: 16, text: '折疊雨傘 / 輕便雨衣', category: 'clothes', checked: false },
  { id: 17, text: '墨鏡 & 防曬帽（柳川遊船防曝曬）', category: 'clothes', checked: false },

  // electronics
  { id: 18, text: '手機充電線 & 充電頭', category: 'electronics', checked: false },
  { id: 19, text: '行動電源（須攜帶隨身行李）', category: 'electronics', checked: false },

  // medical
  { id: 20, text: '個人常備藥品（感冒、防暈車、止痛藥）', category: 'medical', checked: false },
  { id: 21, text: '高係數防曬乳', category: 'medical', checked: false },
  { id: 22, text: '個人盥洗用品與牙刷牙膏', category: 'medical', checked: false }
];

const CATEGORIES = {
  docs: '證件與重要文件 🎫',
  clothes: '衣物與隨身配備 👕',
  electronics: '3C 與電子產品 🔋',
  medical: '盥洗與常備醫藥 💊'
};

export default function Checklist() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('travel_checklist');
    return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
  });

  const [newItemText, setNewItemText] = useState('');
  const [selectedCat, setSelectedCat] = useState('docs');

  const saveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('travel_checklist', JSON.stringify(newItems));
  };

  const handleToggle = (id) => {
    const updated = items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveItems(updated);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: Date.now(),
      text: newItemText.trim(),
      category: selectedCat,
      checked: false
    };

    saveItems([...items, newItem]);
    setNewItemText('');
  };

  const handleDeleteItem = (id) => {
    saveItems(items.filter(item => item.id !== id));
  };

  // Calculate global completion
  const totalCount = items.length;
  const checkedCount = items.filter(item => item.checked).isActive = items.filter(item => item.checked).length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  return (
    <div className="fade-in" style={{ padding: '16px' }}>
      
      {/* Global Progress Card */}
      <div className="glass-card" style={{ 
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(13, 148, 136, 0.1) 100%)',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <CheckCircle2 size={24} style={{ color: 'var(--success)' }} />
          <h2 style={{ fontSize: '18px' }}>行李整理進度</h2>
        </div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
          {progressPercent}%
          <span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: '8px' }}>
            ({checkedCount} / {totalCount} 項目已打包)
          </span>
        </div>
        
        {/* Progress Bar Container */}
        <div style={{ 
          width: '100%', 
          height: '8px', 
          background: 'rgba(255,255,255,0.06)', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${progressPercent}%`, 
            height: '100%', 
            background: 'var(--success)',
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }} />
        </div>
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="glass-card" style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="新增自訂物品..."
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          required
          style={{
            flex: 2,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white',
            padding: '8px 12px',
            fontSize: '13px'
          }}
        />
        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
          style={{
            flex: 1.2,
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white',
            padding: '8px',
            fontSize: '13px'
          }}
        >
          {Object.entries(CATEGORIES).map(([key, label]) => (
            <option key={key} value={key}>{label.split(' ')[0]}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary" style={{ padding: '8px 12px', borderRadius: '8px' }}>
          <Plus size={16} />
        </button>
      </form>

      {/* List by Categories */}
      {Object.entries(CATEGORIES).map(([catKey, catLabel]) => {
        const catItems = items.filter(item => item.category === catKey);
        const catChecked = catItems.filter(item => item.checked).length;
        const catTotal = catItems.length;

        if (catTotal === 0) return null;

        return (
          <div key={catKey} className="glass-card">
            {/* Category Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              paddingBottom: '8px',
              marginBottom: '10px'
            }}>
              <h3 style={{ fontSize: '14px', color: 'var(--primary-light)' }}>{catLabel}</h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {catChecked} / {catTotal}
              </span>
            </div>

            {/* Category Items */}
            <div>
              {catItems.map(item => (
                <div 
                  key={item.id}
                  onClick={() => handleToggle(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    {item.checked ? (
                      <CheckSquare size={18} style={{ color: 'var(--success)' }} />
                    ) : (
                      <Square size={18} style={{ color: 'var(--text-dark)' }} />
                    )}
                    <span style={{ 
                      fontSize: '13px', 
                      color: item.checked ? 'var(--text-dark)' : 'var(--text-main)',
                      textDecoration: item.checked ? 'line-through' : 'none',
                      transition: 'all 0.2s'
                    }}>
                      {item.text}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Avoid triggering toggle
                      handleDeleteItem(item.id);
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-dark)',
                      cursor: 'pointer',
                      opacity: 0.5
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

    </div>
  );
}
