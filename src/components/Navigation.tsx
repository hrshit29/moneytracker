import '../App.css';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../img/avatar.jpg';
import { signout, sun, moon } from '../help/icons';
import { menuItems } from '../help/menuitems';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  active: number;
  setActive: (id: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ active, setActive }) => {
  const { signOut } = useContext(AuthContext) as unknown as { signOut: () => void };
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleSignOut = () => {
    signOut();
    navigate('/login');
    setShowMenu(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav
        className="hidden md:flex flex-col justify-between gap-6 p-6 w-[280px] h-full
          bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900
          border border-gray-700/50 backdrop-blur-lg rounded-3xl shadow-xl transition-colors"
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover bg-gray-700 border border-gray-600 shadow-inner"
          />
          <div>
            <h2 className="text-gray-100 font-semibold text-lg">Hey</h2>
            <p className="text-gray-400 text-sm">Welcome back</p>
          </div>
        </div>

        <ul className="flex flex-col flex-1 gap-1">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 cursor-pointer py-2 px-3 rounded-xl relative 
                transition-all duration-200 ease-in-out hover:bg-gray-700/40 dark:hover:bg-gray-600/40 hover:scale-[1.02]
                ${active === item.id
                  ? 'bg-gray-700 dark:bg-gray-600 text-pink-400 shadow before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-pink-500 before:rounded-r'
                  : 'text-gray-400 dark:text-gray-300'}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.title}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleTheme}
          className="flex items-center justify-center gap-2 bg-gray-700/40 dark:bg-gray-600/40 rounded-xl px-3 py-2 mb-2
            text-gray-200 dark:text-gray-100 hover:bg-gray-600/50 dark:hover:bg-gray-500/50 transition-colors"
        >
          <span>{theme === 'light' ? moon : sun}</span>
          <span className="text-sm">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        <div className="flex justify-center">
          <button
            onClick={handleSignOut}
            className="flex items-center bg-pink-600 text-white rounded-xl px-4 py-2 text-base font-medium
              hover:bg-pink-700 active:bg-pink-800 active:scale-95 transition-transform"
          >
            <span className="mr-2">{signout}</span> Log Out
          </button>
        </div>
      </nav>

      <div className="md:hidden fixed top-4 left-4 z-50">
        <img
          src={avatar}
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover bg-gray-700 border border-gray-600 shadow cursor-pointer
            active:scale-95 transition duration-200"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800
          dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 backdrop-blur-lg border-r border-gray-700 shadow-2xl z-40
          flex flex-col justify-between p-6 transform transition-transform duration-300 ease-in-out
          ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-4 mb-6">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-14 h-14 rounded-full object-cover bg-gray-700 border border-gray-600 shadow-inner"
          />
          <div>
            <h2 className="text-gray-100 font-semibold">Hey</h2>
            <p className="text-gray-400 text-xs">Welcome back</p>
          </div>
        </div>

        <ul className="flex flex-col flex-1 gap-1 mb-6">
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setShowMenu(false);
              }}
              className={`flex items-center gap-3 cursor-pointer py-2 px-3 rounded-xl relative
                transition-all duration-200 ease-in-out hover:bg-gray-700/40 dark:hover:bg-gray-600/40 hover:scale-[1.02]
                ${active === item.id
                  ? 'bg-gray-700 dark:bg-gray-600 text-pink-400 shadow before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-pink-500 before:rounded-r'
                  : 'text-gray-400 dark:text-gray-300'}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="truncate">{item.title}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleTheme}
          className="flex items-center justify-center gap-2 bg-gray-700/40 dark:bg-gray-600/40 rounded-xl px-3 py-2 mb-4
            text-gray-200 dark:text-gray-100 hover:bg-gray-600/50 dark:hover:bg-gray-500/50 transition-colors"
        >
          <span>{theme === 'light' ? moon : sun}</span>
          <span className="text-sm">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>

        <div className="flex justify-center">
          <button
            onClick={handleSignOut}
            className="flex items-center bg-pink-600 text-white rounded-xl px-4 py-2 text-base font-medium
              hover:bg-pink-700 active:bg-pink-800 active:scale-95 transition-transform"
          >
            <span className="mr-2">{signout}</span> Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
