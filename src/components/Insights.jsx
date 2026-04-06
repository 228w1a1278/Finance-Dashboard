import { useDashboard } from '../context/DashboardContext';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const Insights = () => {
  const { transactions, expenses, income } = useDashboard();

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const highestExpense = expenseTransactions.length > 0 
    ? [...expenseTransactions].sort((a, b) => b.amount - a.amount)[0] 
    : null;

  const savingsRate = income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0;

  const categoryCounts = expenseTransactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});
  
  const mostFrequentCategory = Object.keys(categoryCounts).length > 0
    ? Object.keys(categoryCounts).reduce((a, b) => categoryCounts[a] > categoryCounts[b] ? a : b)
    : 'None';

  return (
    <div className="mt-8 mb-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <span className="bg-blue-600 w-2 h-6 rounded-full inline-block"></span>
        Smart Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Largest Expense */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-rose-100 dark:border-rose-900/30 hover:shadow-md transition-all group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-rose-50 dark:bg-rose-900/10 rounded-full blur-2xl group-hover:bg-rose-100 dark:group-hover:bg-rose-900/20 transition-colors z-0"></div>
          <div className="relative z-10 flex items-start gap-5">
            <div className="flex-shrink-0 p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-xl border border-rose-100 dark:border-rose-800 shadow-sm">
              <TrendingDown size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Largest Expense</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                {highestExpense 
                  ? <>You spent <span className="text-rose-600 dark:text-rose-400 font-bold">${highestExpense.amount}</span> on {highestExpense.category}.</> 
                  : 'No expenses recorded yet.'}
              </p>
            </div>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-emerald-100 dark:border-emerald-900/30 hover:shadow-md transition-all group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-2xl group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/20 transition-colors z-0"></div>
          <div className="relative z-10 flex items-start gap-5">
            <div className="flex-shrink-0 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-xl border border-emerald-100 dark:border-emerald-800 shadow-sm">
              <TrendingUp size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Savings Rate</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                You are currently saving <span className="text-emerald-600 dark:text-emerald-400 font-bold">{savingsRate}%</span> of your income.
              </p>
            </div>
          </div>
        </div>

        {/* Spending Habit */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-blue-100 dark:border-blue-900/30 hover:shadow-md transition-all group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-2xl group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors z-0"></div>
          <div className="relative z-10 flex items-start gap-5">
            <div className="flex-shrink-0 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm">
              <AlertCircle size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Frequent Spending</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                Your most frequent expense type is <span className="text-blue-600 dark:text-blue-400 font-bold capitalize">{mostFrequentCategory}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;