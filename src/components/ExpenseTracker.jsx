import React, { useState } from 'react';
import { Coins, Plus, Trash2, TrendingUp, RefreshCw, Users } from 'lucide-react';

const CATEGORIES = {
  food: { name: '餐飲', color: '#10b981' },
  transport: { name: '交通', color: '#0ea5e9' },
  ticket: { name: '門票', color: '#f59e0b' },
  hotel: { name: '住宿', color: '#8b5cf6' },
  shopping: { name: '購物', color: '#ec4899' },
  other: { name: '其他', color: '#64748b' }
};

export default function ExpenseTracker({ members = ['自己', '旅伴A', '旅伴B', '旅伴C'] }) {
  // Local storage for expenses
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('travel_expenses');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'JR Pass 3日券', amount: 12000, currency: 'JPY', category: 'transport', paidBy: '自己' },
      { id: 2, text: '第一晚居酒屋', amount: 8400, currency: 'JPY', category: 'food', paidBy: '旅伴A' },
      { id: 3, text: 'Amistad 飯店房費', amount: 45000, currency: 'JPY', category: 'hotel', paidBy: '旅伴B' },
      { id: 4, text: '熊本熊廣場公仔', amount: 3200, currency: 'JPY', category: 'shopping', paidBy: '旅伴C' }
    ];
  });

  const [rate, setRate] = useState(0.21); // 1 JPY = 0.21 TWD
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('JPY');
  const [category, setCategory] = useState('food');
  const [paidBy, setPaidBy] = useState('自己');

  // Save to localStorage helper
  const saveExpenses = (newExpenses) => {
    setExpenses(newExpenses);
    localStorage.setItem('travel_expenses', JSON.stringify(newExpenses));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    const newExpense = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
      currency,
      category,
      paidBy
    };

    saveExpenses([...expenses, newExpense]);
    setText('');
    setAmount('');
  };

  const handleDeleteExpense = (id) => {
    saveExpenses(expenses.filter(exp => exp.id !== id));
  };

  // Convert amount to TWD
  const getTwdValue = (exp) => {
    return exp.currency === 'TWD' ? exp.amount : exp.amount * rate;
  };

  // Calculate totals
  const totalTwd = expenses.reduce((sum, exp) => sum + getTwdValue(exp), 0);
  const costPerPerson = totalTwd / members.length;

  // Calculate how much each person paid
  const paidAmounts = members.reduce((acc, member) => {
    acc[member] = expenses
      .filter(exp => exp.paidBy === member)
      .reduce((sum, exp) => sum + getTwdValue(exp), 0);
    return acc;
  }, {});

  // Greedy Debt Settlement Algorithm
  const calculateSettlements = () => {
    // balance = paid - share
    const balances = members.map(member => ({
      member,
      balance: paidAmounts[member] - costPerPerson
    }));

    const debtors = balances.filter(b => b.balance < -0.1).sort((a, b) => a.balance - b.balance); // Needs to pay
    const creditors = balances.filter(b => b.balance > 0.1).sort((a, b) => b.balance - a.balance); // Needs to get

    const settlements = [];
    let debtorIdx = 0;
    let creditorIdx = 0;

    // Deep copy balances to modify them
    const tempDebtors = debtors.map(d => ({ ...d }));
    const tempCreditors = creditors.map(c => ({ ...c }));

    while (debtorIdx < tempDebtors.length && creditorIdx < tempCreditors.length) {
      const debtor = tempDebtors[debtorIdx];
      const creditor = tempCreditors[creditorIdx];

      const debtAmount = Math.abs(debtor.balance);
      const creditAmount = creditor.balance;

      const settledValue = Math.min(debtAmount, creditAmount);
      
      settlements.push({
        from: debtor.member,
        to: creditor.member,
        amount: settledValue
      });

      debtor.balance += settledValue;
      creditor.balance -= settledValue;

      if (Math.abs(debtor.balance) < 0.1) {
        debtorIdx++;
      }
      if (Math.abs(creditor.balance) < 0.1) {
        creditorIdx++;
      }
    }

    return settlements;
  };

  const settlements = calculateSettlements();

  return (
    <div className="fade-in" style={{ padding: '16px' }}>
      
      {/* Exchange Rate Card */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RefreshCw size={16} style={{ color: 'var(--secondary)' }} />
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>即時參考匯率</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px' }}>1 JPY =</span>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
            step="0.001"
            style={{
              width: '60px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              color: 'white',
              padding: '2px 6px',
              fontSize: '13px',
              textAlign: 'center'
            }}
          />
          <span style={{ fontSize: '13px' }}>TWD</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="glass-card" style={{ 
        background: 'linear-gradient(135deg, rgba(13, 148, 136, 0.2) 0%, rgba(14, 165, 233, 0.1) 100%)',
        textAlign: 'center',
        padding: '20px'
      }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>累積總花費</span>
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '4px' }} className="gradient-text">
          NT$ {totalTwd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--text-dark)' }}>
          約 ¥ {(totalTwd / (rate || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })} JPY
        </span>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          marginTop: '16px', 
          paddingTop: '16px', 
          borderTop: '1px solid rgba(255,255,255,0.06)' 
        }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>旅伴人數</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{members.length} 人</span>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.06)' }} />
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>人均分攤</span>
            <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--secondary)' }}>
              NT$ {costPerPerson.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>

      {/* Add Expense Form */}
      <form onSubmit={handleAddExpense} className="glass-card">
        <h3 style={{ fontSize: '15px', marginBottom: '12px', color: 'var(--primary-light)' }}>新增花費項目</h3>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            type="text"
            placeholder="項目名稱 (例如：午餐拉麵)"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          <input
            type="number"
            placeholder="金額"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'white',
              padding: '8px',
              fontSize: '13px'
            }}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              background: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'white',
              padding: '8px',
              fontSize: '13px'
            }}
          >
            <option value="JPY">JPY ¥</option>
            <option value="TWD">TWD $</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              flex: 1,
              background: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'white',
              padding: '8px',
              fontSize: '13px'
            }}
          >
            <option value="food">餐飲 🍔</option>
            <option value="transport">交通 🚇</option>
            <option value="ticket">門票 🎟️</option>
            <option value="hotel">住宿 🏨</option>
            <option value="shopping">購物 🛍️</option>
            <option value="other">其他 ⚙️</option>
          </select>

          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            style={{
              flex: 1,
              background: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'white',
              padding: '8px',
              fontSize: '13px'
            }}
          >
            {members.map(m => (
              <option key={m} value={m}>付款人：{m}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '10px' }}>
          <Plus size={16} /> 新增花費
        </button>
      </form>

      {/* Expense List */}
      <div className="glass-card">
        <h3 style={{ fontSize: '15px', marginBottom: '12px' }}>明細列表 ({expenses.length})</h3>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {expenses.map((exp) => {
            const cat = CATEGORIES[exp.category] || CATEGORIES.other;
            return (
              <div 
                key={exp.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span 
                    style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: cat.color 
                    }} 
                  />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>{exp.text}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-dark)', display: 'block' }}>
                      {exp.paidBy} 支付 • {cat.name}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                      {exp.currency === 'JPY' ? '¥' : '$'} {exp.amount.toLocaleString()}
                    </span>
                    {exp.currency === 'JPY' && (
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>
                        NT$ {getTwdValue(exp).toFixed(0)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteExpense(exp.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-dark)', cursor: 'pointer' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Debt Settlement Panel */}
      <div className="glass-card">
        <h3 style={{ fontSize: '15px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={16} style={{ color: 'var(--primary-light)' }} />
          <span>簡化分帳對策</span>
        </h3>
        
        {/* Paid amounts breakdown */}
        <div style={{ marginBottom: '16px', fontSize: '12px' }}>
          {members.map(m => {
            const bal = paidAmounts[m] - costPerPerson;
            return (
              <div key={m} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ color: 'var(--text-muted)' }}>{m} (付 NT$ {paidAmounts[m].toFixed(0)})</span>
                <span style={{ 
                  color: bal >= 0 ? 'var(--success)' : 'var(--accent)', 
                  fontWeight: 'bold' 
                }}>
                  {bal >= 0 ? '+' : ''}NT$ {bal.toFixed(0)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Actionable Transfers */}
        <div style={{ 
          background: 'rgba(255,255,255,0.03)', 
          borderRadius: '12px', 
          padding: '12px', 
          border: '1px solid rgba(255,255,255,0.04)' 
        }}>
          <span style={{ fontSize: '11px', color: 'var(--text-dark)', display: 'block', marginBottom: '8px' }}>最省事結帳路徑</span>
          {settlements.length === 0 ? (
            <div style={{ fontSize: '12px', color: 'var(--success)', textAlign: 'center', padding: '6px' }}>
              🎉 帳目完全平衡，不需找零分帳！
            </div>
          ) : (
            settlements.map((set, idx) => (
              <div key={idx} style={{ 
                fontSize: '13px', 
                padding: '6px 0', 
                borderBottom: idx < settlements.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>
                  <strong style={{ color: 'var(--text-main)' }}>{set.from}</strong> 
                  <span style={{ color: 'var(--text-muted)', margin: '0 6px' }}>👉 應給</span> 
                  <strong style={{ color: 'var(--text-main)' }}>{set.to}</strong>
                </span>
                <span style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
                  NT$ {set.amount.toFixed(0)} 元
                </span>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
