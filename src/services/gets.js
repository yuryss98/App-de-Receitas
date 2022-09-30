export const getDoneRecipes = () => {
  try { return JSON.parse(localStorage.getItem('doneRecipes')); } catch (e) { return []; }
};

export const addDoneRecipes = (recipe) => {
  const beforeDoniedRecipes = getDoneRecipes();
  localStorage.setItem('doneRecipes', JSON.stringify([...beforeDoniedRecipes, recipe]));
};
