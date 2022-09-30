import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FavoriteCard from '../components/FavoriteCard';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const storageRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [favorites, setFavorites] = useState();
  const history = useHistory();

  useEffect(() => {
    const saveFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavorites(saveFavorites);
  }, []);

  const handleCategoryClick = (param) => {
    if (param === 'all') {
      return setFavorites(storageRecipes);
    }
    return setFavorites(storageRecipes.filter((recipe) => recipe.type === param));
  };

  const handleClickRemove = (paramId) => {
    const updatedStore = storageRecipes.filter((element) => element.id !== paramId);
    setFavorites((prevState) => prevState
      .filter((element) => element.id !== paramId));
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedStore));
  };

  // useEffect(() => {
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  // }, [favorites]);

  return (
    <div>
      <button
        type="button"
        onClick={ () => handleCategoryClick('meal') }
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        onClick={ () => handleCategoryClick('drink') }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <button
        type="button"
        onClick={ () => handleCategoryClick('all') }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <br />
      { favorites && favorites.map((recipe, index) => (
        <FavoriteCard
          index={ index }
          key={ recipe.id }
          name={ recipe.name }
          image={ recipe.image }
          id={ recipe.id }
          category={ recipe.category }
          nationality={ recipe.nationality }
          alcoholicOrNot={ recipe.alcoholicOrNot }
          path={ recipe.type }
          handleClickRemove={ () => handleClickRemove(recipe.id) }
        />
      ))}
      <br />
      <Footer history={ history } />
    </div>
  );
}

export default FavoriteRecipes;
