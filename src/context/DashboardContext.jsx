import { createContext, useState, useContext, useEffect } from 'react';
import { Mockdata } from '../data/Exampledata';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  
  // --- 1. PERSIST TRANSACTIONS ---
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem('dashboard-transactions');
    if (savedData) return JSON.parse(savedData);
    return Mockdata;
  });

  // --- 2. PERSIST ROLE ---
  const [role, setRole] = useState(() => {
    const savedRole = localStorage.getItem('dashboard-role');
    return savedRole ? savedRole : 'Viewer';
  });

  // --- 3. PERSIST THEME (NEW) ---
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('dashboard-theme');
    return savedTheme ? savedTheme : 'light';
  });

  // Effect: Save Transactions
  useEffect(() => {
    localStorage.setItem('dashboard-transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Effect: Save Role
  useEffect(() => {
    localStorage.setItem('dashboard-role', role);
  }, [role]);

  // Effect: Apply and Save Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('dashboard-theme', theme);
  }, [theme]);

  // --- LOGIC FUNCTIONS ---
  const addTransaction = (newTx) => {
    setTransactions([{ ...newTx, id: Date.now() }, ...transactions]);
  };

  const deleteTransaction = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (confirmDelete) {
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    }
  };

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  return (
    <DashboardContext.Provider 
      value={{ 
        transactions, 
        role, 
        setRole, 
        theme, 
        setTheme, 
        addTransaction, 
        deleteTransaction, 
        income, 
        expenses, 
        balance 
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);