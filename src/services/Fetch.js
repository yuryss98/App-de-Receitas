const allMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const allMealsCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const allDrinksCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const fetchAllRecipes = async (route) => {
  if (route === '/meals') {
    const result = fetch(allMeals)
      .then((response) => response.json().then((data) => data))
      .catch((error) => error);
    return result;
  }
  const result = fetch(allDrinks)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchAllCategories = async (route) => {
  if (route === '/meals') {
    const result = fetch(allMealsCategories)
      .then((response) => response.json().then((data) => data))
      .catch((error) => error.message);
    return result;
  }
  const result = fetch(allDrinksCategories)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchCategories = async (id, route) => {
  const CATEGORY_MEALS_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;
  const CATEGORY_DRINKS_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`;

  if (route === '/meals') {
    const result = fetch(CATEGORY_MEALS_URL)
      .then((response) => response.json().then((data) => data))
      .catch((error) => error);
    return result;
  }
  const result = fetch(CATEGORY_DRINKS_URL)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const searchApi = async (search, route) => {
  const MEALS_URL = `https://www.themealdb.com/api/json/v1/1/${search}`;
  const DRINKS_URL = `https://www.thecocktaildb.com/api/json/v1/1/${search}`;

  console.log(MEALS_URL);

  if (route === '/meals') {
    try {
      const response = await fetch(MEALS_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      return false;
    }
  }

  try {
    const response = await fetch(DRINKS_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};
