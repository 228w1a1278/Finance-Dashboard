import { useDashboard } from '../context/DashboardContext';
import { LayoutDashboard, Sun, Moon } from 'lucide-react';

const RoleSwitcher = () => {
  const { role, setRole } = useDashboard();
  
  return (
    <div className="relative bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex items-center w-40 sm:w-48 shadow-inner border border-gray-200 dark:border-gray-700 transition-colors">
      <div 
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-300 ease-out shadow-sm
          ${role === 'Viewer' 
            ? 'left-1 bg-white dark:bg-gray-600' 
            : 'left-[calc(50%+1px)] bg-gradient-to-r from-indigo-600 to-blue-600'}`}
      />

      <button
        onClick={() => setRole('Viewer')}
        className={`relative z-10 flex-1 py-1.5 text-[10px] sm:text-xs font-bold transition-colors duration-300 
          ${role === 'Viewer' ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
      >
        VIEWER
      </button>

      <button
        onClick={() => setRole('Admin')}
        className={`relative z-10 flex-1 py-1.5 text-[10px] sm:text-xs font-bold transition-colors duration-300 
          ${role === 'Admin' ? 'text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
      >
        ADMIN
      </button>
    </div>
  );
};

const DashboardLayout = ({ children }) => {
  const { theme, setTheme } = useDashboard();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-4 flex justify-between items-center shadow-sm">        
        
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <LayoutDashboard className="text-white" size={20} />
          </div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight hidden sm:block">Finance Dash</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:ring-2 hover:ring-blue-500 transition-all active:scale-95"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium hidden md:block">Viewing as:</span>
            <RoleSwitcher />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
