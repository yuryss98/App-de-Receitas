import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function DoneRecipesFilters() {
  const { setDoneRecipesFilter } = useContext(RecipeContext);
  const handleFilter = ({ target }) => {
    setDoneRecipesFilter(target.name);
  };

  return (
    <>
      <button
        name="all"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilter }
      >
        All

      </button>
      <button
        name="meals"
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleFilter }
      >
        Meals

      </button>
      <button
        name="drinks"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilter }
      >
        Drinks

      </button>
    </>
  );
}

export default DoneRecipesFilters;
