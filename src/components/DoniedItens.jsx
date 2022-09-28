import React, { useContext } from 'react';
import { getDoneRecipes } from '../services/gets';
import DoniedItem from './DoniedItem';
import RecipeContext from '../context/RecipeContext';

function DoniedItens() {
  const items = getDoneRecipes();
  const { DoneRecipesFilter } = useContext(RecipeContext);
  const showedItems = items
    .filter((item) => (DoneRecipesFilter === 'all') || (DoneRecipesFilter === item.type));
  return (
    <>
      {showedItems.map((item, index) => (
        <DoniedItem key={ item.name } item={ item } index={ index } />
      ))}
    </>
  );
}

export default DoniedItens;
