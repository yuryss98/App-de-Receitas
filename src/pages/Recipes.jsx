import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import { fetchAllRecipes,
  fetchAllCategories, fetchCategories } from '../services/Fetch';
import RecipeCard from '../components/RecipeCard';
import CategoryButton from '../components/CategoryButton';
import Footer from '../components/Footer';

const maxResult = 12;
const maxCategory = 5;

function Recipes() {
  const {
    resultCategory, setResultCategory,
    allCategories, setAllCategories,
    recipesData, setRecipesData } = useContext(RecipeContext);

  const history = useHistory();
  const currentPage = history.location.pathname;
  const currentPageKey = currentPage.replace('/', '');
  const currentPageKeyCaps = currentPageKey
    .charAt(0).toUpperCase() + currentPageKey.slice(1);

  useEffect(() => {
    const getFetch = async () => {
      const allRecipes = await fetchAllRecipes(currentPage);
      setRecipesData(allRecipes);

      const allCategory = await fetchAllCategories(currentPage);
      setResultCategory(allCategory);
    };
    getFetch();
  }, [currentPage]); // eslint-disable-line

  const categoryApi = async (id) => {
    if (allCategories[currentPageKey]) {
      const resultDefault = await fetchAllRecipes(currentPage);
      setAllCategories({});
      return setRecipesData(resultDefault);
    }
    const resultID = await fetchCategories(id, currentPage);
    setRecipesData(resultID);
    setAllCategories(resultID);
  };

  const handleAllCategoryClick = async () => {
    const resultDefault = await fetchAllRecipes(currentPage);
    setAllCategories({});
    return setRecipesData(resultDefault);
  };

  const idKey = `id${currentPageKeyCaps.substring(0, currentPageKeyCaps.length - 1)}`;

  const strKey = `str${currentPageKeyCaps.substring(0, currentPageKeyCaps.length - 1)}`;

  const strThumbKey = `str${currentPageKeyCaps
    .substring(0, currentPageKeyCaps.length - 1)}Thumb`;

  return (
    <div>
      <main>
        <section>
          <button
            type="button"
            onClick={ handleAllCategoryClick }
            data-testid="All-category-filter"
          >
            All
          </button>
          {resultCategory[currentPageKey]
          && resultCategory[currentPageKey].slice(0, maxCategory)
            .map(({ strCategory }, index) => (
              <CategoryButton
                key={ strCategory + index }
                strCategory={ strCategory }
                categoryApi={ categoryApi }
              />))}
        </section>
        <section>
          { recipesData[currentPageKey] && recipesData[currentPageKey]
            .slice(0, maxResult).map((recipe, index) => (
              <RecipeCard
                index={ index }
                key={ recipe[idKey] }
                name={ recipe[strKey] }
                image={ recipe[strThumbKey] }
                id={ recipe[idKey] }
                path={ currentPage }
              />
            ))}
        </section>
      </main>
      <Footer history={ history } />
    </div>
  );
}

Recipes.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Recipes;
