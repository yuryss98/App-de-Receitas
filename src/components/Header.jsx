import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

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
          <h1 data-testid="page-title">{processedTitle}</h1>
          <button
            type="button"
            onClick={ handleProfileClick }
            data-testid="profile-top-btn"
          >
            <img
              src={ profileIcon }
              alt="Icone de perfil"
            />
          </button>
          {
            !checkForHeaderSearch
        && (
          <button
            type="button"
            onClick={ () => setSearch(!search) }
            data-testid="search-top-btn"
          >
            <img
              src={ searchIcon }
              alt="Icone de pesquisa"
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
        </header>
      )}
    </div>
  );
}

export default Header;
