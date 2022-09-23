import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

//

function Header() {
  const [search, setSearch] = useState(false);
  //   const [currentPage, setCurrentPage] = useState('');
  const [conditional, setConditional] = useState(false);

  const history = useHistory();
  //   setCurrentPage(history.location.pathname);
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
          >
            <img
              src={ profileIcon }
              alt="Icone de perfil"
              data-testid="profile-top-btn"
            />
          </button>
          {
            !checkForHeaderSearch
        && (
          <button
            type="button"
            onClick={ () => setSearch(!search) }
          >
            <img
              src={ searchIcon }
              alt="Icone de pesquisa"
              data-testid="search-top-btn"
            />
          </button>

        )
          }
          {search && (
            <input data-testid="search-input" placeholder="Aqui ficara o input" />
          )}
        </header>
      )}
    </div>
  );
}

export default Header;
