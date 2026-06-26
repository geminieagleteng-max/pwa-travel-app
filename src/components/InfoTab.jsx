import React, { useState, useEffect } from 'react';
import { Info, AlertTriangle, ExternalLink, Minimize2, Languages, Map as MapIcon, Train, ZoomIn, ChevronLeft, Compass, Utensils, Coins, Sun, PhoneCall } from 'lucide-react';

const TRANSLATIONS = [
  { jp: 'これ、免税になりますか？', ro: 'Kore, menzei ni narimasu ka?', tw: '這可以免稅嗎？' },
  { jp: 'お会計をお願いします。', ro: 'O-kaikei o onegai shimasu.', tw: '請幫我結帳。' },
  { jp: 'クレジットカードは使えますか？', ro: 'Kurejitto kādo wa tsukaemasu ka?', tw: '可以使用信用卡嗎？' },
  { jp: '英語のメニューはありますか？', ro: 'Eigo no menyū wa arimasu ka?', tw: '有英文或中文菜單嗎？' },
  { jp: 'ピーナッツアレルギーがあります。', ro: 'Pīnattsu arerugī ga arimasu.', tw: '我有花生過敏。' },
  { jp: 'すみません、写真を撮っていただけますか？', ro: 'Sumimasen, shashin o totte itadakemasu ka?', tw: '不好意思，可以幫我們拍張照嗎？' },
  { jp: 'ここはどこですか？', ro: 'Koko wa doko desu ka?', tw: '請問這裡是什麼地方？' }
];

const GOURMET_LIST = [
  {
    name: '博多純情拉麵 一雙',
    category: '🍜 豚骨拉麵',
    desc: '號稱「豚骨卡布奇諾」的極濃郁起泡湯頭，與細麵完美結合。福岡排隊第一名的超人氣名店！',
    dayMatch: 'Day 4 / Day 7 購物衝刺推薦',
    query: '博多一雙+博多駅東本店',
    color: '#0ea5e9'
  },
  {
    name: '中洲屋台街 - 一口餃子與烤雞串',
    category: '🏮 在地大排檔',
    desc: '那珂川沿岸的夜間限定屋台，體驗福岡獨特的夜市文化。推薦金黃酥脆的博多一口餃子、炭香撲鼻的烤雞肉串。',
    dayMatch: 'Day 5 晚上福岡塔夜景後宵夜',
    query: '中洲屋台',
    color: '#fb7185'
  },
  {
    name: '柳川 若松屋 - 蒸籠鰻魚飯',
    category: '🛶 百年鰻魚老店',
    desc: '將蒲燒鰻魚鋪在錦絲蛋皮與浸透醬汁的米飯上，放入竹蒸籠炊蒸，鰻魚油脂滲入米飯，入口即化。',
    dayMatch: 'Day 6 柳川遊船上岸後午餐',
    query: '柳川+若松屋',
    color: '#2dd4bf'
  },
  {
    name: '熊本 黑亭拉麵',
    category: '🐻 熊本黑麻油拉麵',
    desc: '特製濃郁豚骨湯頭中加入「焦香蒜油（麻油）」與烘烤蒜碎，搭配生蛋黃，風味極具深度。',
    dayMatch: 'Day 3 參觀熊本城後午餐',
    query: '熊本+黑亭拉麵+本店',
    color: '#f59e0b'
  },
  {
    name: '博多名物元祖 肥腸鍋 おおやま',
    category: '🍲 經典肥腸鍋',
    desc: '福岡代表性鄉土料理。以特製味噌或醬油湯頭為底，加入肥美彈牙的牛大腸、滿滿的韭菜與高麗菜炊煮。',
    dayMatch: 'Day 4 / Day 6 晚餐最佳選擇',
    query: 'もつ鍋+おおやま+博多デイトス',
    color: '#a855f7'
  },
  {
    name: '太宰府 表參道 - 現烤梅枝餅',
    category: '🌸 傳統日式點心',
    desc: '太宰府天滿宮的名產。軟糯的烤年糕外皮印有梅花圖案，內餡包裹香甜紅豆沙，現烤出爐外酥內軟。',
    dayMatch: 'Day 6 太宰府天滿宮參道必吃',
    query: '太宰府+梅枝餅',
    color: '#10b981'
  }
];

const WEATHER_GUIDE_DATA = [
  { day: 'Day 1', date: '6/27 (六)', spot: '博多車站與採購', tips: '夏裝短袖即可。博多車站及商圈冷氣較強，建議攜帶薄外套防冷氣。', min: 26, max: 33, emoji: '🌤️' },
  { day: 'Day 2', date: '6/28 (日)', spot: '門司港、小倉城', tips: '門司港與關門海峽海風大，若前往皿倉山看夜景海拔高，務必攜帶薄外套與防風帽。', min: 25, max: 31, emoji: '☁️' },
  { day: 'Day 3', date: '6/29 (一)', spot: '歷史熊本城', tips: '熊本城天守閣與櫻之馬場戶外空曠炎熱，紫外線強，需著防曬衣物並補充水分。', min: 27, max: 34, emoji: '☀️' },
  { day: 'Day 4', date: '6/30 (二)', spot: '長崎與稻佐山夜景', tips: '長崎為山城步行多。晚上登稻佐山看夜景風大氣溫低，建議攜帶防風外套防寒。', min: 22, max: 29, emoji: '🌤️' },
  { day: 'Day 5', date: '7/1 (三)', spot: '櫛田神社、福岡塔', tips: '市區歷史散步路程較多，穿著好走運動鞋，福岡塔海濱風稍大可帶輕薄外套。', min: 24, max: 30, emoji: '🌧️' },
  { day: 'Day 6', date: '7/2 (四)', spot: '柳川遊船、太宰府', tips: '⚠️柳川遊船無遮雨棚，烈日曝曬嚴重，必備遮陽帽、抗UV傘與墨鏡防曬。', min: 27, max: 34, emoji: '☀️' },
  { day: 'Day 7', date: '7/3 (五)', spot: '天神爆買、返台', tips: '輕便夏裝為主，便於最後的行李整理、搬運與登機安檢。', min: 26, max: 33, emoji: '☁️' }
];

const getWeatherAnimClass = (emoji) => {
  if (emoji === '☀️') return 'weather-anim-sun';
  if (['🌤️', '☁️', '🌫️'].includes(emoji)) return 'weather-anim-cloud';
  if (['🌧️', '🌦️'].includes(emoji)) return 'weather-anim-rain';
  if (emoji === '⛈️') return 'weather-anim-thunder';
  if (emoji === '❄️') return 'weather-anim-snow';
  return '';
};

export default function InfoTab() {
  const [activeJpCard, setActiveJpCard] = useState(null);
  const [activeMap, setActiveMap] = useState(null);
  const [activeSection, setActiveSection] = useState(null); // null | 'warnings' | 'maps' | 'links' | 'translator' | 'gourmet' | 'currency' | 'weather' | 'emergency'

  // Currency Converter states
  const [jpyInput, setJpyInput] = useState('');
  const [twdInput, setTwdInput] = useState('');
  const [rate, setRate] = useState('0.21');

  // Weather states
  const [selectedCity, setSelectedCity] = useState('fukuoka');
  const [expandedWeatherDay, setExpandedWeatherDay] = useState(1);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  // Fetch real-time weather from Open-Meteo
  useEffect(() => {
    if (activeSection !== 'weather') return;
    
    setWeatherLoading(true);
    setWeatherError(null);
    
    const urls = {
      fukuoka: 'https://api.open-meteo.com/v1/forecast?latitude=33.59&longitude=130.40&current=temperature_2m,weather_code',
      kitakyushu: 'https://api.open-meteo.com/v1/forecast?latitude=33.88&longitude=130.88&current=temperature_2m,weather_code',
      kumamoto: 'https://api.open-meteo.com/v1/forecast?latitude=32.78&longitude=130.73&current=temperature_2m,weather_code'
    };

    Promise.all(
      Object.entries(urls).map(([key, url]) => 
        fetch(url)
          .then(res => {
            if (!res.ok) throw new Error();
            return res.json();
          })
          .then(data => [key, {
            temp: data.current.temperature_2m,
            code: data.current.weather_code
          }])
      )
    )
    .then(results => {
      setWeatherData(Object.fromEntries(results));
      setWeatherLoading(false);
    })
    .catch(err => {
      setWeatherError('無法取得即時天氣，已自動啟用離線穿搭指南模式');
      setWeatherLoading(false);
    });
  }, [activeSection]);

  const getWeatherDesc = (code) => {
    if (code === 0) return { desc: '晴朗', emoji: '☀️' };
    if ([1, 2, 3].includes(code)) return { desc: '多雲時晴', emoji: '🌤️' };
    if ([45, 48].includes(code)) return { desc: '有霧', emoji: '🌫️' };
    if ([51, 53, 55, 56, 57].includes(code)) return { desc: '毛毛雨', emoji: '🌦️' };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { desc: '有雨', emoji: '🌧️' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { desc: '下雪', emoji: '❄️' };
    if ([95, 96, 99].includes(code)) return { desc: '雷陣雨', emoji: '⛈️' };
    return { desc: '陰天', emoji: '☁️' };
  };

  // Handle JPY double-binding inputs
  const handleJpyChange = (val) => {
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    setJpyInput(val);
    if (val === '') {
      setTwdInput('');
      return;
    }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const r = parseFloat(rate) || 0.21;
    setTwdInput((num * r).toFixed(1));
  };

  // Handle TWD double-binding inputs
  const handleTwdChange = (val) => {
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    setTwdInput(val);
    if (val === '') {
      setJpyInput('');
      return;
    }
    const num = parseFloat(val);
    if (isNaN(num)) return;
    const r = parseFloat(rate) || 0.21;
    setJpyInput((num / r).toFixed(0));
  };

  // Handle rate inputs update
  const handleRateChange = (val) => {
    if (val !== '' && !/^\d*\.?\d*$/.test(val)) return;
    setRate(val);
    const r = parseFloat(val);
    if (isNaN(r) || r <= 0) return;
    
    const jpyNum = parseFloat(jpyInput);
    if (!isNaN(jpyNum)) {
      setTwdInput((jpyNum * r).toFixed(1));
    }
  };

  // Quick JPY additions
  const quickAddJpy = (amount) => {
    const currentJpy = parseFloat(jpyInput) || 0;
    const newJpy = currentJpy + amount;
    handleJpyChange(newJpy.toString());
  };

  // Clear converter fields
  const clearCurrency = () => {
    setJpyInput('');
    setTwdInput('');
  };

  // Render navigation header for sub-sections
  const renderSubHeader = (title) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
      <button 
        onClick={() => setActiveSection(null)} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: '36px', 
          height: '36px', 
          background: 'rgba(255,255,255,0.04)', 
          border: '1px solid rgba(255,255,255,0.06)', 
          borderRadius: '50%', 
          color: 'var(--text-main)', 
          cursor: 'pointer', 
          transition: 'all 0.2s ease',
          outline: 'none'
        }} 
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        }} 
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        }}
      >
        <ChevronLeft size={20} />
      </button>
      <span style={{ fontSize: '16px', fontWeight: '700', color: 'white' }}>{title}</span>
    </div>
  );

  return (
    <div className="fade-in" style={{ padding: '16px', position: 'relative', minHeight: 'calc(100vh - 150px)', paddingBottom: '80px' }}>
      
      {/* Active Translation Modal (Fullscreen overlay for showing to shopkeepers) */}
      {activeJpCard && (
        <div 
          onClick={() => setActiveJpCard(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#0b0f19',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          <div style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <Minimize2 size={32} />
          </div>
          <span style={{ fontSize: '18px', color: 'var(--primary-light)', marginBottom: '16px' }}>
            {activeJpCard.tw}
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: 'white', lineHeight: '1.4', marginBottom: '16px' }}>
            {activeJpCard.jp}
          </h1>
          <span style={{ fontSize: '18px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            "{activeJpCard.ro}"
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-dark)', marginTop: '40px' }}>
            （點擊螢幕任何地方即可關閉返回）
          </span>
        </div>
      )}

      {/* Active Map Modal (Fullscreen zoomable/scrollable modal) */}
      {activeMap && (
        <div 
          onClick={() => setActiveMap(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#0b0f19',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px',
            textAlign: 'center'
          }}
        >
          <div style={{ position: 'absolute', top: '24px', right: '24px', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <Minimize2 size={32} />
          </div>
          <span style={{ fontSize: '16px', color: 'var(--primary-light)', marginBottom: '16px', fontWeight: 'bold' }}>
            {activeMap.title}
          </span>
          <div 
            style={{ 
              width: '100%', 
              maxHeight: '70vh', 
              overflow: 'auto', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              background: '#101524',
              borderRadius: '12px',
              padding: '8px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activeMap.src} 
              alt={activeMap.title} 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '65vh', 
                objectFit: 'contain',
                cursor: 'zoom-in',
                transition: 'transform 0.2s ease'
              }} 
              onClick={(e) => {
                const img = e.currentTarget;
                if (img.style.transform === 'scale(1.8)') {
                  img.style.transform = 'scale(1)';
                  img.style.maxHeight = '65vh';
                  img.style.maxWidth = '100%';
                } else {
                  img.style.transform = 'scale(1.8)';
                  img.style.maxHeight = 'none';
                  img.style.maxWidth = 'none';
                }
              }}
            />
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-dark)', marginTop: '24px' }}>
            （點擊圖片可放大/縮小，點擊背景或右上角關閉）
          </span>
        </div>
      )}

      {/* Main Dashboard Menu */}
      {activeSection === null && (
        <div className="fade-in">
          <div style={{ marginBottom: '20px', textAlign: 'center', padding: '8px 0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '6px' }} className="gradient-text">更多實用工具與指南</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>請點選下方圖標，開啟詳細旅行小幫手功能</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {/* Warnings Button */}
            <div 
              onClick={() => setActiveSection('warnings')}
              className="glass-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '24px 12px', 
                margin: 0,
                cursor: 'pointer', 
                textAlign: 'center' 
              }}
            >
              <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '12px', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={24} style={{ color: '#fbbf24' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>飯店警告</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>入住與行李對策</span>
            </div>

            {/* Transit Maps Button */}
            <div 
              onClick={() => setActiveSection('maps')}
              className="glass-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '24px 12px', 
                margin: 0,
                cursor: 'pointer', 
                textAlign: 'center' 
              }}
            >
              <div style={{ background: 'rgba(14, 165, 233, 0.1)', padding: '12px', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapIcon size={24} style={{ color: '#38bdf8' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>交通地圖</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>JR與地鐵路線指引</span>
            </div>

            {/* Quick Links Button */}
            <div 
              onClick={() => setActiveSection('links')}
              className="glass-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '24px 12px', 
                margin: 0,
                cursor: 'pointer', 
                textAlign: 'center' 
              }}
            >
              <div style={{ background: 'rgba(13, 148, 136, 0.1)', padding: '12px', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={24} style={{ color: '#2dd4bf' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>行前指南</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>入境登記與實用連結</span>
            </div>

            {/* Translator Button */}
            <div 
              onClick={() => setActiveSection('translator')}
              className="glass-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '24px 12px', 
                margin: 0,
                cursor: 'pointer', 
                textAlign: 'center' 
              }}
            >
              <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '12px', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Languages size={24} style={{ color: '#fb7185' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>急用翻譯</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>日本求助急用字卡</span>
            </div>

            {/* Gourmet Button */}
            <div 
              onClick={() => setActiveSection('gourmet')}
              className="glass-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '24px 12px', 
                margin: 0,
                cursor: 'pointer', 
                textAlign: 'center' 
              }}
            >
              <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '12px', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Utensils size={24} style={{ color: '#eab308' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>福岡美食</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>推薦美食與地圖導航</span>
            </div>

            {/* Currency Button */}
            <div 
              onClick={() => setActiveSection('currency')}
              className="glass-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '24px 12px', 
                margin: 0,
                cursor: 'pointer', 
                textAlign: 'center' 
              }}
            >
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '12px', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Coins size={24} style={{ color: '#c084fc' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>匯率換算</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>日圓台幣即時雙向計算</span>
            </div>

            {/* Weather Button */}
            <div 
              onClick={() => setActiveSection('weather')}
              className="glass-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '24px 12px', 
                margin: 0,
                cursor: 'pointer', 
                textAlign: 'center' 
              }}
            >
              <div style={{ background: 'rgba(250, 204, 21, 0.1)', padding: '12px', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sun size={24} style={{ color: '#facc15' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>天氣穿搭</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>即時預報與防曬建議</span>
            </div>

            {/* Emergency Button */}
            <div 
              onClick={() => setActiveSection('emergency')}
              className="glass-card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '24px 12px', 
                margin: 0,
                cursor: 'pointer', 
                textAlign: 'center' 
              }}
            >
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PhoneCall size={24} style={{ color: '#f87171' }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white', marginBottom: '4px' }}>緊急聯絡</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>日本急難與海外直撥</span>
            </div>
          </div>
        </div>
      )}

      {/* Warnings & Notices Detail Page */}
      {activeSection === 'warnings' && (
        <div className="fade-in">
          {renderSubHeader('飯店入住與行李保管建議')}
          <div className="glass-card" style={{ borderLeft: '4px solid var(--warning)', margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <AlertTriangle size={18} style={{ color: 'var(--warning)' }} />
              <h3 style={{ fontSize: '14px', color: 'white' }}>飯店入住與退房時間提醒</h3>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 12px 0' }}>
              <strong>Amistad Hotel Fukuoka (D1-D5)</strong>：辦理入住時間為 <strong>15:00</strong> 起，退房時間為 <strong>10:00</strong> 前。
            </p>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              <strong>Richmond Hotel Fukuoka Tenjin (D5-D7)</strong>：辦理入住時間為 <strong>14:00</strong> 起，退房時間為 <strong>11:00</strong> 前。
            </p>
          </div>
          
          <div className="glass-card" style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Info size={16} style={{ color: 'var(--secondary)' }} />
              <h3 style={{ fontSize: '14px', color: 'white' }}>🎒 行李寄放策略建議</h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 8px 0' }}>
              為確保 4 位大人在更換飯店當天不需拖著行李奔波，請遵守以下策略：
            </p>
            <ul style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><strong>Day 5 (Amistad ➔ Richmond)</strong>：早上 9:00 由 Amistad Hotel 退房後，直接坐地鐵將行李拉至 <strong>Richmond Hotel Fukuoka Tenjin</strong> 免費寄放，隨後即可輕裝前往櫛田神社與天神商圈市區一日遊，晚上累了再回 Richmond 辦理入住。</li>
              <li><strong>Day 7 (Richmond ➔ 返台)</strong>：早上 9:30 退房後將行李寄存在 Richmond 櫃檯，即可進行天神/博多最後購物衝刺，下午 16:00 回飯店取行李搭計程車前往機場。</li>
            </ul>
          </div>
        </div>
      )}

      {/* Transit Maps Detail Page */}
      {activeSection === 'maps' && (
        <div className="fade-in">
          {renderSubHeader('實用交通地圖 & 路線指引')}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* JR Map Card */}
            <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', overflow: 'hidden' }}>
              <div 
                style={{ position: 'relative', height: '140px', background: '#0a0d16', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setActiveMap({ title: '北九州 JR 鐵路路線圖', src: '/images/jr_map.png' })}
              >
                <img src="/images/jr_map.png" alt="北九州 JR 鐵路路線圖" style={{ maxHeight: '95%', maxWidth: '95%', objectFit: 'contain' }} />
                <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.65)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', color: 'white' }}>
                  <ZoomIn size={12} /> 點擊放大
                </div>
              </div>
              <div style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '13px', color: 'white', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Train size={14} style={{ color: 'var(--secondary)' }} />
                  <span>北九州 JR 鐵路路線圖</span>
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 6px 0' }}>
                  <strong>適用票券</strong>：北九州 JR Pass (3日/5日券)
                </p>
                <ul style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 8px 0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                  <li><strong>博多 ↔ 小倉/門司港</strong>：Day 2 搭特急「音速號 (Sonic)」主要幹道。</li>
                  <li><strong>博多 ↔ 熊本</strong>：Day 3 搭「九州新幹線（瑞穗號/櫻花號）」直達熊本（最快只需 32-38 分）。</li>
                  <li><strong>香椎線</strong>：Day 4 往返海之中道海洋世界.</li>
                </ul>
                <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#fbbf24', lineHeight: '1.4', marginTop: '8px' }}>
                  ⚠️ <strong>乘車提醒</strong>：北九州 JR Pass <strong>不包含</strong>「博多 ↔ 小倉」區間的<strong>山陽新幹線</strong>。往返小倉請務必搭乘 JR 九州的「特急音速號 (Sonic)」，約 40-50 分鐘即可抵達。
                </div>
              </div>
            </div>

            {/* Subway Map Card */}
            <div style={{ background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px', overflow: 'hidden' }}>
              <div 
                style={{ position: 'relative', height: '140px', background: '#0a0d16', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setActiveMap({ title: '福岡市地下鐵路線圖', src: '/images/subway_map.jpg' })}
              >
                <img src="/images/subway_map.jpg" alt="福岡市地下鐵路線圖" style={{ maxHeight: '95%', maxWidth: '95%', objectFit: 'contain' }} />
                <div style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.65)', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px', color: 'white' }}>
                  <ZoomIn size={12} /> 點擊放大
                </div>
              </div>
              <div style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '13px', color: 'white', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Train size={14} style={{ color: 'var(--primary-light)' }} />
                  <span>福岡市地下鐵路線圖</span>
                </h4>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 6px 0' }}>
                  <strong>適用票券</strong>：福岡市地下鐵一日券 (640 日圓)
                </p>
                <ul style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '0 0 8px 0', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.4' }}>
                  <li><strong>機場線 (橙色)</strong>：Day 1 機場直達博多/天神。也是 Day 5 往返博多與天神商圈、櫛田神社的主要路線。</li>
                  <li><strong>七隈線 (綠色)</strong>：新延伸線開通，從天神南直達博多站極為快速。</li>
                  <li><strong>箱崎線 (藍色)</strong>：可連接至貝塚站。</li>
                </ul>
                <div style={{ background: 'rgba(13, 148, 136, 0.08)', border: '1px solid rgba(13, 148, 136, 0.2)', borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: '#2dd4bf', lineHeight: '1.4', marginTop: '8px' }}>
                  💡 <strong>省錢妙招</strong>：Day 5 安排了市區行程，若預計搭乘地下鐵 3 次以上，強烈建議在售票機購買「地下鐵一日券」，非常超值！
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links Detail Page */}
      {activeSection === 'links' && (
        <div className="fade-in">
          {renderSubHeader('行前重要指南與連結')}
          <div className="glass-card" style={{ margin: 0 }}>
            <h3 style={{ fontSize: '14px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} style={{ color: 'var(--secondary)' }} />
              <span>線上申請及申辦連結</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a 
                href="https://www.vjw.digital.go.jp/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  fontSize: '13px', 
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <span>🇯🇵 Visit Japan Web (入境登錄)</span>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
              </a>

              <a 
                href="https://www.fubon.com/insurance/b2c/content/prod_travel/index.html" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  fontSize: '13px', 
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <span>✈️ 富邦旅遊平安險申辦</span>
                <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
              </a>
            </div>
          </div>

          <div className="glass-card" style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '8px', color: 'white' }}>💡 行前必看小提醒</h3>
            <ul style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.5' }}>
              <li><strong>Visit Japan Web 填寫</strong>：建議在出發前 3 天完成線上登錄，並下載 QR Code 截圖，通關更為迅速。</li>
              <li><strong>福岡塔避開公休</strong>：福岡塔於 6/29-6/30 公休，本行程已將參觀排在 7/1 (三) 晚上，可正常登塔。</li>
            </ul>
          </div>
        </div>
      )}

      {/* Survival Japanese Translator Detail Page */}
      {activeSection === 'translator' && (
        <div className="fade-in">
          {renderSubHeader('日本求助急用字卡')}
          <div className="glass-card" style={{ margin: 0 }}>
            <span style={{ fontSize: '11px', color: 'var(--text-dark)', display: 'block', marginBottom: '12px' }}>
              點擊下方字卡，即可展示「超大字體滿版畫面」方便給店員出示：
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {TRANSLATIONS.map((t, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveJpCard(t)}
                  style={{
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: 'white' }}>{t.tw}</span>
                    <span style={{ fontSize: '11px', color: 'var(--primary-light)' }}>點擊放大 🔍</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.jp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gourmet Detail Page */}
      {activeSection === 'gourmet' && (
        <div className="fade-in">
          {renderSubHeader('福岡必吃美食清單 & 導航')}
          
          {/* Gourmet Banner */}
          <div style={{ width: '100%', height: '140px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', position: 'relative', border: '1px solid rgba(255,255,255,0.06)' }}>
            <img src="/images/gourmet_banner.png" alt="福岡美食" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(11, 15, 25, 0.2), rgba(11, 15, 25, 0.8))', display: 'flex', alignItems: 'flex-end', padding: '12px 16px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: '600', color: '#eab308', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fukuoka Gourmet</span>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginTop: '2px' }}>九州極致美味指南</h3>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {GOURMET_LIST.map((food, idx) => (
              <div 
                key={idx}
                className="glass-card" 
                style={{ 
                  margin: 0, 
                  background: 'rgba(22, 28, 45, 0.65)', 
                  borderLeft: `4px solid ${food.color}`,
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: 'white' }}>{food.name}</h4>
                  <span style={{ fontSize: '9.5px', color: food.color, background: `${food.color}15`, padding: '2px 8px', borderRadius: '12px', fontWeight: '600', border: `1px solid ${food.color}30` }}>
                    {food.category}
                  </span>
                </div>
                
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 10px 0' }}>
                  {food.desc}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-dark)' }}>
                    📍 {food.dayMatch}
                  </span>
                  <a 
                    href={`https://maps.google.com/?q=${food.query}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '11px', 
                      color: food.color, 
                      textDecoration: 'none', 
                      fontWeight: '600'
                    }}
                  >
                    地圖導航 ➔
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Currency Converter Detail Page */}
      {activeSection === 'currency' && (
        <div className="fade-in">
          {renderSubHeader('旅日即時匯率換算')}
          
          <div className="glass-card" style={{ margin: 0, padding: '20px 16px' }}>
            {/* Rate Settings */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>自訂參考匯率 (1 JPY = ? TWD)</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input 
                  type="text" 
                  value={rate}
                  onChange={(e) => handleRateChange(e.target.value)}
                  style={{ 
                    width: '60px', 
                    background: 'rgba(255,255,255,0.05)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '6px', 
                    color: 'white', 
                    padding: '4px 6px', 
                    fontSize: '13px', 
                    textAlign: 'center',
                    outline: 'none'
                  }}
                />
                <span style={{ fontSize: '12px', color: 'var(--text-dark)' }}>TWD</span>
              </div>
            </div>

            {/* Input fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* JPY Input */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#c084fc', fontWeight: '600' }}>日圓 (JPY)</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-dark)' }}>¥</span>
                </div>
                <input 
                  type="text"
                  placeholder="0"
                  value={jpyInput}
                  onChange={(e) => handleJpyChange(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '28px',
                    fontWeight: '700',
                    outline: 'none',
                    padding: 0
                  }}
                />
              </div>

              {/* TWD Input */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--primary-light)', fontWeight: '600' }}>台幣 (TWD)</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-dark)' }}>NT$</span>
                </div>
                <input 
                  type="text"
                  placeholder="0"
                  value={twdInput}
                  onChange={(e) => handleTwdChange(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '28px',
                    fontWeight: '700',
                    outline: 'none',
                    padding: 0
                  }}
                />
              </div>
            </div>

            {/* Quick JPY buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
              <button 
                onClick={() => quickAddJpy(1000)} 
                className="btn-secondary" 
                style={{ padding: '8px 12px', fontSize: '11px', flex: 1, borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
              >
                + ¥1,000
              </button>
              <button 
                onClick={() => quickAddJpy(5000)} 
                className="btn-secondary" 
                style={{ padding: '8px 12px', fontSize: '11px', flex: 1, borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
              >
                + ¥5,000
              </button>
              <button 
                onClick={() => quickAddJpy(10000)} 
                className="btn-secondary" 
                style={{ padding: '8px 12px', fontSize: '11px', flex: 1, borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
              >
                + ¥10,000
              </button>
              <button 
                onClick={clearCurrency} 
                className="btn-secondary" 
                style={{ 
                  padding: '8px 12px', 
                  fontSize: '11px', 
                  background: 'rgba(244, 63, 94, 0.08)', 
                  borderColor: 'rgba(244, 63, 94, 0.15)', 
                  color: '#fb7185', 
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                清除
              </button>
            </div>
          </div>
          
          <div className="glass-card" style={{ marginTop: '16px' }}>
            <h3 style={{ fontSize: '13px', color: 'white', marginBottom: '6px' }}>💡 購物小常識</h3>
            <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
              在日本購物標價一般分為「稅込 (含稅)」與「稅拔 (不含稅)」。在日本免稅店購物滿 5,000 日圓以上（未稅），即可出示護照享受 10% 的退稅服務喔！
            </p>
          </div>
        </div>
      )}

      {/* Weather Detail Page (MIUI/iOS Weather App Style) */}
      {activeSection === 'weather' && (
        <div className="fade-in" style={{ background: 'linear-gradient(to bottom, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.9))', margin: '-16px', padding: '16px', minHeight: 'calc(100vh - 118px)' }}>
          {renderSubHeader('天氣預報 & 穿搭指南')}

          {/* Symmetrical Segmented City Picker */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '3px', marginBottom: '24px' }}>
            {[
              { id: 'fukuoka', name: '福岡' },
              { id: 'kitakyushu', name: '北九州' },
              { id: 'kumamoto', name: '熊本' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCity(c.id)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  background: selectedCity === c.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: selectedCity === c.id ? 'white' : 'var(--text-muted)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Giant Current Weather Display (System Weather Style) */}
          {(() => {
            const cityNames = { fukuoka: '福岡市', kitakyushu: '北九州 / 門司港', kumamoto: '熊本市' };
            const currentTemp = weatherData ? Math.round(weatherData[selectedCity]?.temp) : '--';
            const currentCode = weatherData ? weatherData[selectedCity]?.code : 0;
            const weatherDesc = getWeatherDesc(currentCode);
            
            // Connected outfit pills
            const outfitPills = {
              fukuoka: '👕 夏裝短袖 · 建議帶傘',
              kitakyushu: '🧥 臨海風強 · 備薄外套',
              kumamoto: '🕶 陽光曝曬 · 加強防曬'
            };

            const tempRanges = { fukuoka: '33° / 26°', kitakyushu: '31° / 25°', kumamoto: '34° / 27°' };

            return (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px', padding: '10px 0' }} className="fade-in">
                <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                  {cityNames[selectedCity]}
                </span>
                
                {weatherLoading ? (
                  <h1 style={{ fontSize: '72px', fontWeight: '100', color: 'rgba(255,255,255,0.3)', margin: '16px 0' }}>--</h1>
                ) : (
                  <h1 style={{ fontSize: '92px', fontWeight: '100', color: 'white', margin: '0', padding: '0', lineHeight: 1.1, position: 'relative', left: '10px', letterSpacing: '-0.03em' }}>
                    {currentTemp}
                    <span style={{ fontSize: '48px', fontWeight: '100', position: 'absolute', top: '8px' }}>°</span>
                  </h1>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '13.5px', color: 'white', fontWeight: '500' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className={getWeatherAnimClass(weatherDesc.emoji)} style={{ display: 'inline-block' }}>{weatherDesc.emoji}</span>
                    <span>{weatherLoading ? '讀取中' : weatherDesc.desc}</span>
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    預報 {tempRanges[selectedCity]}
                  </span>
                </div>

                {/* Outfit Advice Pill (MIUI AQI badge style) */}
                <div 
                  style={{ 
                    marginTop: '16px', 
                    background: 'rgba(255, 255, 255, 0.05)', 
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '20px', 
                    padding: '5px 12px', 
                    fontSize: '11.5px', 
                    color: 'white', 
                    fontWeight: '600',
                    letterSpacing: '0.02em',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}
                >
                  {outfitPills[selectedCity]}
                </div>
              </div>
            );
          })()}

          {/* 7-Day Forecast Card (Xiaomi Weather Style) */}
          <div className="glass-card" style={{ margin: 0, padding: '16px 14px', background: 'rgba(22, 28, 45, 0.5)', backdropFilter: 'blur(20px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '10px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🗓️ 旅程 7 天預報
              </span>
              <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                點擊查看穿搭指南 ➔
              </span>
            </div>

            {/* Forecast Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {WEATHER_GUIDE_DATA.map((w, idx) => {
                const dayNum = idx + 1;
                const isExpanded = expandedWeatherDay === dayNum;
                
                // Temp spread bar calculations
                // Overall bounds: min 22, max 36. diff = 14
                const boundsMin = 22;
                const boundsMax = 36;
                const boundsDiff = boundsMax - boundsMin;
                
                const leftPercent = ((w.min - boundsMin) / boundsDiff) * 100;
                const widthPercent = ((w.max - w.min) / boundsDiff) * 100;

                // Day Labels mapping
                const dayLabels = {
                  1: '今天',
                  2: '明天',
                  3: '週一',
                  4: '週二',
                  5: '週三',
                  6: '週四',
                  7: '週五'
                };

                return (
                  <div key={idx} style={{ borderBottom: idx !== WEATHER_GUIDE_DATA.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', padding: '10px 0' }}>
                    {/* Row Main Header */}
                    <div 
                      onClick={() => setExpandedWeatherDay(isExpanded ? null : dayNum)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', height: '24px' }}
                    >
                      {/* Left: Day & Weekday */}
                      <span style={{ width: '60px', fontSize: '13px', color: 'white', fontWeight: isExpanded ? '700' : '500' }}>
                        {dayLabels[dayNum]}
                      </span>

                      {/* Center: Emoji Icon */}
                      <span style={{ width: '40px', fontSize: '16px', textAlign: 'center' }}>
                        <span className={getWeatherAnimClass(w.emoji)} style={{ display: 'inline-block' }}>
                          {w.emoji}
                        </span>
                      </span>

                      {/* Right: Temp spread bar display */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'flex-end' }}>
                        {/* Min Temp */}
                        <span style={{ width: '28px', fontSize: '12.5px', color: 'var(--text-muted)', textAlign: 'right' }}>
                          {w.min}°
                        </span>
                        
                        {/* Thermal Spread Bar */}
                        <div style={{ flex: 1, maxWidth: '80px', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
                          <span 
                            style={{ 
                              position: 'absolute', 
                              left: `${leftPercent}%`, 
                              width: `${widthPercent}%`, 
                              height: '100%', 
                              background: 'linear-gradient(to right, #facc15, #f97316)', 
                              borderRadius: '2px' 
                            }} 
                          />
                        </div>
                        
                        {/* Max Temp */}
                        <span style={{ width: '28px', fontSize: '12.5px', color: 'white', fontWeight: '600', textAlign: 'left' }}>
                          {w.max}°
                        </span>
                      </div>
                    </div>

                    {/* Expandable Travel Tips Section */}
                    {isExpanded && (
                      <div style={{ marginTop: '10px', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', animation: 'fadeIn 0.2s ease-out' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--primary-light)', fontWeight: '700', marginBottom: '4px' }}>
                          <span>📍 預計景點：{w.spot}</span>
                        </div>
                        <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                          {w.tips}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Emergency Detail Page */}
      {activeSection === 'emergency' && (
        <div className="fade-in">
          {renderSubHeader('旅日緊急求助與海外直撥')}
          
          <div className="glass-card" style={{ borderLeft: '4px solid #ef4444', margin: '0 0 16px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <AlertTriangle size={18} style={{ color: '#f87171' }} />
              <h3 style={{ fontSize: '14px', color: 'white' }}>⚠️ 安全撥號須知</h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
              本頁面整合的電話均已綁定撥號協定，在日本當地時直接點選按鈕即可自動喚起手機通話鍵進行直撥，無需重複輸入。
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Japan Emergency Calls */}
            <div className="glass-card" style={{ margin: 0 }}>
              <h3 style={{ fontSize: '13px', color: 'white', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                🚒 日本急難救援通報 (免費直撥)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a 
                  href="tel:119"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px 14px', borderRadius: '10px', textDecoration: 'none', color: '#f87171' }}
                >
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>🚑 重病・受傷・火災救助</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <PhoneCall size={14} /> 119
                  </span>
                </a>
                <a 
                  href="tel:110"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '10px 14px', borderRadius: '10px', textDecoration: 'none', color: '#38bdf8' }}
                >
                  <span style={{ fontSize: '13px', fontWeight: '700' }}>👮 警察局急報 (車禍/失竊/求助)</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <PhoneCall size={14} /> 110
                  </span>
                </a>
              </div>
            </div>

            {/* Taiwan Diplomatic Office */}
            <div className="glass-card" style={{ margin: 0 }}>
              <h3 style={{ fontSize: '13px', color: 'white', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                🇹🇼 駐日館處：台北駐大阪辦事處福岡分處
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a 
                  href="tel:0927347810"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '10px', textDecoration: 'none', color: 'white' }}
                >
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '700', display: 'block' }}>辦事處代表號 (工作時間)</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>護照遺失諮詢等業務</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <PhoneCall size={12} /> 092-734-7810
                  </span>
                </a>
                <a 
                  href="tel:09087653410"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '10px 14px', borderRadius: '10px', textDecoration: 'none', color: '#fbbf24' }}
                >
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '700', display: 'block' }}>急難救助專線 (24H 限緊急危難)</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>車禍住院、重大急難用，非關護照</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <PhoneCall size={12} /> 090-8765-3410
                  </span>
                </a>
              </div>
            </div>

            {/* Travel Insurance */}
            <div className="glass-card" style={{ margin: 0 }}>
              <h3 style={{ fontSize: '13px', color: 'white', marginBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '8px' }}>
                ✈️ 富邦旅遊險海外緊急支援 (台語/中文服務)
              </h3>
              <a 
                href="tel:+88629113566"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '10px', textDecoration: 'none', color: 'white' }}
              >
                <span style={{ fontSize: '13px', fontWeight: '700' }}>富邦保險海外急難救助專線</span>
                <span style={{ fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <PhoneCall size={12} /> +886-2-911-3566
                </span>
              </a>
            </div>

            {/* Credit Card Lost Hotline */}
            <div className="glass-card" style={{ margin: 0 }}>
              <h3 style={{ fontSize: '13px', color: 'white', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                💳 常用信用卡海外掛失 (日本免付費直撥)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Visa 日本客服專線</span>
                  <a href="tel:00531111553" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: '600' }}>00531-11-1553 📞</a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>Mastercard 日本客服專線</span>
                  <a href="tel:00531113886" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: '600' }}>00531-11-3886 📞</a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span>JCB 免付費報失專線</span>
                  <a href="tel:0120796999" style={{ color: 'var(--secondary)', textDecoration: 'none', fontWeight: '600' }}>0120-796-999 📞</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
