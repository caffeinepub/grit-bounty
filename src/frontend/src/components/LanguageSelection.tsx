import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Language } from '../types';

const languageOptions = [
  { value: Language.English, flag: '🇬🇧', native: 'English', chinese: '英语' },
  { value: Language.SimplifiedChinese, flag: '🇨🇳', native: '简体中文', chinese: '简体中文' },
  { value: Language.TraditionalChinese, flag: '🇹🇼', native: '繁體中文', chinese: '繁体中文' },
];

export default function LanguageSelection() {
  const { setLanguage } = useLanguage();

  const handleLanguageSelect = (lang: Language) => {
    console.log('LanguageSelection: Setting language to', lang);
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Select Your Language / 选择语言
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {languageOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleLanguageSelect(option.value)}
              className="bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-cyan-500 rounded-lg p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="text-5xl mb-3">{option.flag}</div>
              <div className="text-lg font-semibold text-white mb-1">{option.native}</div>
              <div className="text-sm text-gray-400">{option.chinese}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
