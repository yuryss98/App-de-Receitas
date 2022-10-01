// recebe como parametro o ID do item a ser exibido
// procura no localstorage a chave 'doneRecipes'
// verifica se o ID esta nesse local storage

// retorna true ou false

const doneRecipe = (id) => {
  const doneRecipes = localStorage.getItem('doneRecipes');

  const receitaFeita = JSON.parse(doneRecipes);

  const abc = receitaFeita && receitaFeita.some((item) => item.id === id);

  return abc;
};

export default doneRecipe;
