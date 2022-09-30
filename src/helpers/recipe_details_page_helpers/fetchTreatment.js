// recebe como parametro o json de um fetch feito para

// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id-do-item}

// ou

// https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i={id-do-item}

// e retorna um objeto com as chaves iguais para os dois casos com ingredients e measures em arrays

const fetchTreatment = (param) => {
  const type = param.meals ? 'meal' : 'drink';
  const data = param.meals || param.drinks;
  const result = data[0];
  const ingredients = Object.keys(result)
    .filter((item) => item.includes('strIngredient'))
    .map((ing) => result[ing])
    .filter((item) => item !== '' && item !== null && item !== ' ');
  const measures = Object.keys(result)
    .filter((item) => item.includes('strMeasure'))
    .map((ing) => result[ing])
    .filter((item) => item !== '' && item !== null && item !== ' ');
  const filteredResultKeys = Object.keys(result)
    .filter((item) => {
      if (item.includes('strMeasure')) return true;
      return item.includes('strIngredient');
    });
  const obj = {
    ...result,
    id: result.idDrink || result.idMeal,
    name: result.strDrink || result.strMeal,
    thumb: result.strDrinkThumb || result.strMealThumb,
    type,
    ingredients,
    measures,
  };
  filteredResultKeys.forEach((item) => delete obj[item]);
  delete obj.idDrink;
  delete obj.strDrink;
  delete obj.strDrinkThumb;
  delete obj.idMeal;
  delete obj.strMeal;
  delete obj.strMealThumb;
  return obj;
};

export default fetchTreatment;
