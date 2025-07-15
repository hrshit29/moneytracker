import React, { useMemo } from 'react';
import type { ReactNode } from 'react';
import Orb from './Orb';
import '../App.css';
// import Navigation from './Navigation';

interface MainLayoutProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  children: ReactNode;
}

export const MainLayout = ({ active, setActive, children }: MainLayoutProps) => {
  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <div
      className="
        relative flex flex-col h-full max-h-screen overflow-x-hidden 
        rounded-[28px] border border-gray-200 dark:border-gray-700 
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-[6px]
        shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out
        mx-auto my-4 max-w-7xl px-4 md:px-6 lg:px-8
      "
    >
      {/* Orb background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {orbMemo}
      </div>

      {/* Optional Navigation */}
      {/* <Navigation active={active} setActive={setActive} /> */}

      {/* Main content */}
      <main
        className="
          relative z-10 flex-1 overflow-y-auto scrollbar-hide 
           md:py-8 flex flex-col gap-6
        "
      >
        {children}

        {/* Example editable div replacing input */}
        <div
          contentEditable
          suppressContentEditableWarning
          className="
            rounded-xl border border-gray-300 dark:border-gray-600
            bg-white/70 dark:bg-gray-700/50 backdrop-blur-md 
            px-4 py-3 text-gray-800 dark:text-gray-200 
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-pink-400 
            transition duration-300
          "
        >
          Type here...
        </div>
      </main>
    </div>
  );
};
