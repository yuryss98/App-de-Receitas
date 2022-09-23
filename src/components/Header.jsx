import React from 'react';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  console.log(history);
  const currentPage = history.location.pathname;
  const pageTitle = currentPage === '/' ? '' : currentPage.replace('/', '');

  return (
    <header>
      <h1 data-testid="page-title">
        {
          pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)
        }
      </h1>
      <img
        src="src/images/profileIcon.svg"
        alt="Icone de perfil"
        data-testid="profile-top-btn"
      />
      <img
        src="src/images/searchIcon.svg"
        alt="Icone de pesquisa"
        data-testid="search-top-btn"
      />
    </header>
  );
}

export default Header;
