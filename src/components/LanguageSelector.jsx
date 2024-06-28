import React, { useState } from 'react';
import { LANGUAGE_VERSIONS } from '../constants';

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = 'text-blue-400';

const LanguageSelector = ({ language, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (lang) => {
    onSelect(lang);
    setIsOpen(false);
  };

  return (
    <div className="ml-2 mb-4 relative z-20">
      <p className="mb-2 text-lg">Language:</p>
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={toggleDropdown}
        >
          {language}
        </button>
        {isOpen && (
          <div className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" tabIndex="-1">
            <div className="py-1" role="none">
              {languages.map(([lang, version]) => (
                <button
                  key={lang}
                  className={`block px-4 py-2 text-sm ${lang === language ? `${ACTIVE_COLOR} bg-gray-900` : 'text-gray-300'} hover:${ACTIVE_COLOR} hover:bg-gray-900`}
                  onClick={() => handleSelect(lang)}
                  role="menuitem"
                  tabIndex="-1"
                >
                  {lang}
                  &nbsp;
                  <span className="text-gray-600 text-sm">({version})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
