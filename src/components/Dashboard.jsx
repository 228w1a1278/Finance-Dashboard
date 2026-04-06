import { useDashboard } from '../context/DashboardContext';
import TransactionList from './TransactionList';
import Insights from './Insights';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const Dashboard = () => {
  const { role, income, expenses, balance, transactions, theme } = useDashboard();

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.category);
      if (existing) { existing.value += curr.amount; } 
      else { acc.push({ name: curr.category, value: curr.amount }); }
      return acc;
    }, []);

  const PIE_COLORS = ['#ef4444', '#f97316', '#eab308', '#8b5cf6', '#ec4899'];
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold dark:text-white">Financial Overview</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Currently in <span className="font-semibold text-blue-600 dark:text-blue-400">{role}</span> mode.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 transform hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-sm font-medium text-gray-400">Total Balance</h3>
          <p className="text-3xl font-bold text-white mt-2">${balance.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-400 p-6 rounded-2xl shadow-lg border border-emerald-400 transform hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-sm font-medium text-emerald-50">Total Income</h3>
          <p className="text-3xl font-bold text-white mt-2">${income.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-rose-500 to-red-500 p-6 rounded-2xl shadow-lg border border-rose-400 transform hover:-translate-y-1 transition-transform duration-300">
          <h3 className="text-sm font-medium text-rose-50">Total Expenses</h3>
          <p className="text-3xl font-bold text-white mt-2">${expenses.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Cash Flow Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sortedTransactions}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="date" tick={{fontSize: 12, fill: theme === 'dark' ? '#9ca3af' : '#6b7280'}} stroke={theme === 'dark' ? '#4b5563' : '#6b7280'} />
                <YAxis tick={{fontSize: 12, fill: theme === 'dark' ? '#9ca3af' : '#6b7280'}} stroke={theme === 'dark' ? '#4b5563' : '#6b7280'} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme === 'dark' ? '#1f2937' : 'rgba(255, 255, 255, 0.9)', 
                    backdropFilter: 'blur(8px)', border: 'none', borderRadius: '12px',
                    color: theme === 'dark' ? '#fff' : '#000'
                  }}
                />
                <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-colors">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Expenses by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expensesByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#fff', border: 'none', borderRadius: '8px' }} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Insights />
      <TransactionList />
    </div>
  );
};

export default Dashboard;