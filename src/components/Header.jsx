import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import iconePerfil from '../images/iconePerfil.svg';
import iconePesquiar from '../images/iconePesquiar.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import iconeRecipesApp from '../images/iconeRecipesApp.svg';
import logoRecipesApp from '../images/logoRecipesApp.svg';
import iconeDrink from '../images/iconeDrink.svg';
import iconePrato from '../images/iconePrato.svg';

function Header() {
  const [search, setSearch] = useState(false);
  const [conditional, setConditional] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const location = useLocation();

  useEffect(() => {

  }, [location]);

  const history = useHistory();
  const currentPage = history.location.pathname;
  const pageTitle = currentPage.replace('/', '');
  const spacedPageTitle = pageTitle.split('-');

  const checkForHeaderSearch = currentPage === '/profile'
  || currentPage === '/done-recipes'
  || currentPage === '/favorite-recipes';

  const putsBothInCapital = () => {
    const toCapital = spacedPageTitle
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    return `${toCapital[0]} ${toCapital[1]}`;
  };

  const processedTitle = spacedPageTitle.length === 2
    ? putsBothInCapital()
    : pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  const handleProfileClick = () => {
    history.push('/profile');
    setConditional(true);
    return conditional;
  };

  return (
    <div>
      {!(currentPage === '/' || currentPage.includes('/', 2)) && (
        <header>
          <div className="upHeaderPart">
            <img src={ iconeRecipesApp } alt="Ícone Recipes App" />
            <img
              src={ logoRecipesApp }
              alt="Logo Recipes App"
              className="logoRecipesApp"
            />
            <div className="buttonsDisplay">
              {
                !checkForHeaderSearch
        && (
          <button
            type="button"
            onClick={ () => setSearch(!search) }
            className="buttonHeader"
          >
            <img
              src={ iconePesquiar }
              alt="Icone de pesquisa"
              data-testid="search-top-btn"
            />
          </button>

        )
              }
              {search && (
                <section>
                  <SearchBar inputSearch={ inputSearch } />
                  <input
                    data-testid="search-input"
                    placeholder="digite aqui"
                    value={ inputSearch }
                    onChange={ ({ target }) => setInputSearch(target.value) }
                  />
                </section>
              )}
              <button
                type="button"
                onClick={ handleProfileClick }
                className="buttonHeader"
              >
                <img
                  src={ iconePerfil }
                  alt="Icone de perfil"
                  data-testid="profile-top-btn"
                />
              </button>
            </div>
          </div>
          <div className="bottomPart">
            <div>
              {
                pageTitle === 'drinks'
            && <img src={ iconeDrink } alt="Icone Prato" className="imgDrinkOrMeal" />
              }
              {
                pageTitle === 'meals'
              && <img src={ iconePrato } alt="Icone Drink" className="imgDrinkOrMeal" />
              }
            </div>
            <h1
              data-testid="page-title"
              className="pageTitleHeader"
            >
              {processedTitle}

            </h1>

          </div>
        </header>
      )}
    </div>
  );
}

export default Header;
