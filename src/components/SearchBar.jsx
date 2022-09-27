import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { searchApi } from '../services/Fetch';
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

    if (data.meals === null || data.drinks === null || !data) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (data[pageTitle].length > 1) {
      return setRecipesData(data);
    }

    if (currentPage === '/meals') {
      const id = data.meals[0].idMeal;
      const newRota = `${currentPage}/${id}`;
      history.push(newRota);
    } else {
      const id = data.drinks[0].idDrink;
      const newRota = `${currentPage}/${id}`;
      history.push(newRota);
    }
  };

  const handleSearch = async (route) => {
    let data;

    if (searchRadio === 'Ingredient') {
      data = await searchApi(`filter.php?i=${inputSearch}`, route);
    }

    if (searchRadio === 'Name') {
      data = await searchApi(`search.php?s=${inputSearch}`, route);
    }

    if (searchRadio === 'First letter') {
      if (inputSearch.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }

      data = await searchApi(`search.php?f=${inputSearch}`, route);
    }

    returnedData(data);
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
