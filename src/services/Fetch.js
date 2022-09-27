const allMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const allMealsCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const allDrinksCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const fetchAllMeals = async () => {
  const result = fetch(allMeals)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchAllDrinks = async () => {
  const result = fetch(allDrinks)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchAllMealsCategories = async () => {
  const result = fetch(allMealsCategories)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchAllDrinksCategories = async () => {
  const result = fetch(allDrinksCategories)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchCategoriesMeals = async (meals) => {
  const result = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meals}`)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

export const fetchCategoriesDrinks = async (drinks) => {
  const result = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${drinks}`)
    .then((response) => response.json().then((data) => data))
    .catch((error) => error);
  return result;
};

// export const searchApi = async (search) => {
//   const URL = `https://www.themealdb.com/api/json/v1/1/${search}`;
//   const response = await fetch(URL);

export const searchApi = async (search, route) => {
  const MEALS_URL = `https://www.themealdb.com/api/json/v1/1/${search}`;
  const DRINKS_URL = `https://www.thecocktaildb.com/api/json/v1/1/${search}`;

  console.log(MEALS_URL);

  if (route === '/meals') {
    const response = await fetch(MEALS_URL);
    const data = await response.json();

    return data;
  }

  const response = await fetch(DRINKS_URL);
  const data = await response.json();

  return data;
};
