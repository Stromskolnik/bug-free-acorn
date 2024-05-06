// App.js
import React, { useState } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';
import './App.css';

function App() {
  const { language } = useLanguage();
  const [pokemon, setPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [theme, setTheme] = useState('light'); // Light theme as default

  const getRandomPokemon = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
      const data = response.data;
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomPokemonUrl = data.results[randomIndex].url;
      const pokemonResponse = await axios.get(randomPokemonUrl);
      const pokemonData = pokemonResponse.data;
      setPokemon(pokemonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const data = response.data;
      setFilteredPokemon([data]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFilteredPokemon([]);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <div className="search-bar">
        <input
          type="text"
          placeholder={language === 'en' ? 'Search Pokémon' : language === 'fr' ? 'Rechercher des Pokémon' : 'Vyhledat Pokémona'}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>{language === 'en' ? 'Search' : language === 'fr' ? 'Chercher' : 'Hledat'}</button>
        <LanguageSwitcher />
        <button className="theme-toggle" onClick={toggleTheme}>{language === 'en' ? 'Toggle Theme' : language === 'fr' ? 'Changer de thème' : 'Přepnout téma'}</button>
      </div>
      <button onClick={getRandomPokemon}>{language === 'en' ? 'Random Pokémon' : language === 'fr' ? 'Pokémon Aléatoire' : 'Náhodný Pokémon'}</button>
      {pokemon && <Pokemon pokemon={pokemon} />}
      {filteredPokemon.length > 0 && filteredPokemon.map((p, index) => (
        <Pokemon key={index} pokemon={p} />
      ))}
    </div>
  );
}

export default App;
