const doneRecipe = (id) => {
  const doneRecipes = localStorage.getItem('doneRecipes');

  const receitaFeita = JSON.parse(doneRecipes);

  const abc = receitaFeita && receitaFeita.some((item) => item.id === id);

  return abc;
};

export default doneRecipe;
