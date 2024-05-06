// LanguageSwitcher.js
import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher = () => {
  const { setLanguage } = useLanguage();

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fr')}>French</button>
      <button onClick={() => changeLanguage('cs')}>Czech</button>
    </div>
  );
};

export default LanguageSwitcher;
