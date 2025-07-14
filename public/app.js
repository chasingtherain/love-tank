// Love Tank - Static React Application
// This is a standalone React application that can be deployed to any static hosting service

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Love Tank Component
const LoveTank = ({ score }) => {
  const fillPercentage = Math.max(0, Math.min(100, score));
  
  return (
    <div className="love-tank">
      <div className="tank-container">
        <div 
          className="tank-fill"
          style={{ height: `${fillPercentage}%` }}
        />
        <div className="tank-score">{score}</div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(70);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [transactions, setTransactions] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('loveTankUser');
    const savedScore = localStorage.getItem('loveTankScore');
    const savedTransactions = localStorage.getItem('loveTankTransactions');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save data to localStorage
  const saveToStorage = (userData, userScore, userTransactions) => {
    localStorage.setItem('loveTankUser', JSON.stringify(userData));
    localStorage.setItem('loveTankScore', userScore.toString());
    localStorage.setItem('loveTankTransactions', JSON.stringify(userTransactions));
  };

  // Create account
  const createAccount = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    
    const newUser = { name, email };
    setUser(newUser);
    saveToStorage(newUser, score, transactions);
  };

  // Make deposit
  const makeDeposit = () => {
    const newScore = score + 1;
    const newTransaction = {
      id: Date.now(),
      type: 'deposit',
      amount: 1,
      date: new Date().toISOString(),
      comment: 'Positive relationship moment'
    };
    
    const newTransactions = [...transactions, newTransaction];
    setScore(newScore);
    setTransactions(newTransactions);
    saveToStorage(user, newScore, newTransactions);
  };

  // Make withdrawal
  const makeWithdrawal = () => {
    const newScore = score - 5;
    const newTransaction = {
      id: Date.now(),
      type: 'withdrawal',
      amount: -5,
      date: new Date().toISOString(),
      comment: 'Relationship challenge'
    };
    
    const newTransactions = [...transactions, newTransaction];
    setScore(newScore);
    setTransactions(newTransactions);
    saveToStorage(user, newScore, newTransactions);
  };

  // Get relationship status
  const getRelationshipStatus = () => {
    if (score >= 80) return { text: 'Thriving', color: '#10b981' };
    if (score >= 60) return { text: 'Healthy', color: '#3b82f6' };
    if (score >= 40) return { text: 'Needs Attention', color: '#f59e0b' };
    return { text: 'Critical', color: '#ef4444' };
  };

  const status = getRelationshipStatus();

  if (!user) {
    return (
      <div className="container">
        <div className="header">
          <h1>Measure the moments. Fill the love</h1>
          <p>A simple, visual way to measure and reflect on your relationship's emotional strength through daily actions based on the five love languages.</p>
        </div>
        
        <div className="card">
          <h2>Get Started</h2>
          <form onSubmit={createAccount}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Welcome, {user.name}!</h1>
        <p>Your Love Tank Status: <span style={{ color: status.color, fontWeight: 'bold' }}>{status.text}</span></p>
      </div>

      <LoveTank score={score} />

      <div className="actions">
        <button onClick={makeDeposit} className="btn btn-primary">
          Make Deposit (+1)
        </button>
        <button onClick={makeWithdrawal} className="btn btn-secondary">
          Make Withdrawal (-5)
        </button>
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        <div className="transaction-list">
          {transactions.slice(-5).reverse().map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <span className={`transaction-type ${transaction.type}`}>
                {transaction.type === 'deposit' ? '+1' : '-5'}
              </span>
              <span className="transaction-date">
                {new Date(transaction.date).toLocaleDateString()}
              </span>
              <span className="transaction-comment">{transaction.comment}</span>
            </div>
          ))}
          {transactions.length === 0 && (
            <p className="no-transactions">No transactions yet. Start by making your first deposit!</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Initialize app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);