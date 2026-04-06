import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const TransactionList = () => {
  const { transactions, role, addTransaction, deleteTransaction } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: '',
    type: 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category) return;
    addTransaction({ ...formData, amount: Number(formData.amount) });
    setFormData({ date: new Date().toISOString().split('T')[0], amount: '', category: '', type: 'expense' });
    setShowForm(false);
  };

  const filteredTransactions = transactions.filter(t => 
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 mt-6 transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold dark:text-white">Recent Transactions</h3>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {role === 'Admin' && (
            <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              {showForm ? 'Cancel' : '+ Add'}
            </button>
          )}
        </div>
      </div>

      {showForm && role === 'Admin' && (
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl shadow-md mb-6 grid grid-cols-1 sm:grid-cols-5 gap-4 items-end border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Date</label>
            <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-2.5 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Category</label>
            <input type="text" required placeholder="e.g. Rent" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-2.5 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Amount ($)</label>
            <input type="number" required placeholder="0.00" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-2.5 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Type</label>
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-lg p-2.5 outline-none">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold h-[44px] transition-all">Save Entry</button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold text-right">Amount</th>
              {role === 'Admin' && <th className="p-4 font-semibold text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{tx.date}</td>
                <td className="py-4 px-4 font-medium dark:text-gray-200">{tx.category}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${tx.type === 'income' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {tx.type}
                  </span>
                </td>
                <td className={`py-4 px-4 text-right font-bold ${tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                </td>
                {role === 'Admin' && (
                  <td className="py-4 px-4 text-right">
                    <button onClick={() => deleteTransaction(tx.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-semibold transition-colors">Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
