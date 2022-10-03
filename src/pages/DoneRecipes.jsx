import React from 'react';
import InProgressFilters from '../components/DoneRecipesFilters';
import DoniedItens from '../components/DoniedItens';
import '../styles/DoneRecipess.css';

function DoneRecipes() {
  return (
    <>
      <InProgressFilters />
      <DoniedItens />
    </>

  );
}

export default DoneRecipes;
