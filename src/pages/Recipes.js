import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import useResult from '../effects/AllResults';
import { fetchAllMeals,
  fetchAllMealsCategories, fetchCategoriesMeals } from '../services/Fetch';
import RecipesCard from '../components/RecipesCard';
import CategoryButton from '../components/CategoryButton';
import Footer from '../components/Footer';

const maxResult = 12;
const maxMealsCategory = 5;

function Recipes({ match: { path }, history }) {
  const {
    resultMealsCategory, setResultMealsCategory,
    categoryMeals, setCategoryMeals,
    recipesData, setRecipesData } = useContext(RecipeContext);

  const categoryApiFoods = async (id) => {
    if (categoryMeals.meals) {
      return setCategoryMeals({});
    }
    const resultID = await fetchCategoriesMeals(id);
    setCategoryMeals(resultID);
  };

  // console.log(recipesData);

  useResult(fetchAllMeals, setRecipesData);
  useResult(fetchAllMealsCategories, setResultMealsCategory);

  return (
    <div>
      <button
        type="button"
        onClick={ () => {
          setCategoryMeals({});
        } }
        data-testid="All-category-filter"
      >
        All
      </button>
      {resultMealsCategory.meals && resultMealsCategory.meals.slice(0, maxMealsCategory)
        .map(({ strCategory }) => (
          <CategoryButton
            key={ strCategory }
            strCategory={ strCategory }
            clickMeals={ categoryApiFoods }
          />))}
      { categoryMeals.meals ? categoryMeals.meals
        .slice(0, maxResult).map((meals, categoryIndex) => (
          <RecipesCard
            index={ categoryIndex }
            key={ meals.idMeal }
            name={ meals.strMeal }
            image={ meals.strMealThumb }
            id={ meals.idMeal }
            path={ path }
          />
        )) : recipesData.meals && recipesData.meals
        .slice(0, maxResult).map((meal, index) => (
          <RecipesCard
            index={ index }
            key={ meal.idMeal }
            name={ meal.strMeal }
            image={ meal.strMealThumb }
            id={ meal.idMeal }
            path={ path }
          />
        ))}
      <Footer history={ history } />
    </div>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.string.isRequired,
};

export default Recipes;
