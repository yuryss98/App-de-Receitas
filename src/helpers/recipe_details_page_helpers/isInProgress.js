// recebe o id do item a ser verificado no local storage e retorna true ou false, caso exita ou não

const isInProgress = (id) => {
  const inProgressStorage = JSON
    .parse(localStorage
      .getItem('inProgressRecipes')) || { meals: { 0: [] }, drinks: { 0: [] } };
  const inProgress = (inProgressStorage.meals
  && Object.keys(inProgressStorage.meals).includes(id))
  || (inProgressStorage.drinks
  && Object.keys(inProgressStorage.drinks).includes(id));

  return inProgress;
};

export default isInProgress;
