import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

//

function Header() {
  const history = useHistory();
  console.log(history);
  const currentPage = history.location.pathname;
  const pageTitle = currentPage.replace('/', '');
  const spacedPageTitle = pageTitle.split('-');

  console.log(spacedPageTitle);

  const checkForHeaderSearch = currentPage === '/profile'
  || currentPage === '/done-recipes'
  || currentPage === '/favorite-recipes';

  const putsBothInCapital = () => {
    const toCapital = spacedPageTitle
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    return `${toCapital[0]} ${toCapital[1]}`;
  };

  return (
    <div>
      {!(currentPage === '/' || currentPage.includes('/', 2)) && (
        <header>
          <h1 data-testid="page-title">
            {
              spacedPageTitle.length === 2
                ? putsBothInCapital()
                : pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)
            }
          </h1>
          <img
            src={ profileIcon }
            alt="Icone de perfil"
            data-testid="profile-top-btn"
          />
          {
            !checkForHeaderSearch
        && (<img
          src={ searchIcon }
          alt="Icone de pesquisa"
          data-testid="search-top-btn"
        />)
          }
        </header>
      )}
    </div>
  );
}

export default Header;
