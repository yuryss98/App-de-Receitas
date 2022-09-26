import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchApi from '../services/Fetch';
import RecipeContext from '../context/RecipeContext';

function SearchBar({ inputSearch }) {
  const [searchRadio, setSearchRadio] = useState('');
  const history = useHistory();
  const { setRecipesData } = useContext(RecipeContext);

  const handleChange = ({ target }) => {
    const { value } = target;

    setSearchRadio(value);
  };

  const returnedData = (data) => {
    const currentPage = history.location.pathname;
    const pageTitle = currentPage.replace('/', '');
    if (data[pageTitle].length === 1) {
      if (currentPage === '/meals') {
        const id = data.meals[0].idMeal;
        const redirection = `${currentPage}/${id}`;
        history.push(redirection);
      } else {
        const id = data.drinks[0].idDrink;
        const redirection = `${currentPage}/${id}`;
        history.push(redirection);
      }
    }

    if (data[pageTitle].length > 1) {
      if (currentPage === '/meals') {
        setRecipesData(data.meals);
      } else {
        setRecipesData(data.drinks);
      }
    }
  };

  const handleSearch = async (route) => {
    let data;
    switch (searchRadio) {
    case 'Ingredient':
      data = await searchApi(`filter.php?i=${inputSearch}`, route);
      returnedData(data);
      break;

    case 'Name':
      data = await searchApi(`search.php?s=${inputSearch}`, route);
      returnedData(data);
      break;

    default:
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        data = await searchApi(`search.php?f=${inputSearch}`, route);
        returnedData(data);
      }
      break;
    }
  };

  return (
    <form>
      <label htmlFor="Ingredient">
        Ingrediente
        <input
          type="radio"
          name="searchRadio"
          id="Ingredient"
          value="Ingredient"
          onChange={ handleChange }
          data-testid="ingredient-search-radio"
        />
      </label>

      <label htmlFor="Name">
        Nome
        <input
          type="radio"
          name="searchRadio"
          id="Name"
          value="Name"
          onChange={ handleChange }
          data-testid="name-search-radio"
        />
      </label>

      <label htmlFor="First letter">
        Primeira letra
        <input
          type="radio"
          name="searchRadio"
          id="First letter"
          value="First letter"
          onChange={ handleChange }
          data-testid="first-letter-search-radio"
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch(history.location.pathname) }
      >
        Buscar

      </button>
    </form>
  );
}

SearchBar.propTypes = {
  inputSearch: PropTypes.string.isRequired,
};

export default SearchBar;
