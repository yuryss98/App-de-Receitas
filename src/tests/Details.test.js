import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import detailsMealsMock from './helpers/detailsMealsMock';
import detailsRecomendedDrinks from './helpers/detailsRecomendedDrinks';
import detailsDrinkMock from './helpers/detailsDrinkMock';
import detailsRecomendedMeals from './helpers/detailsRecomendedMeals';

const fetchingMeal = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(detailsMealsMock),
  }));
};

const fetchingDrink = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(detailsDrinkMock),
  }));
};

const fetchingRecomendedDrink = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(detailsRecomendedDrinks),
  }));
};

const fetchingRecomendedMeal = () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(detailsRecomendedMeals),
  }));
};

const MEAL_ADDRESS = '/meals/52771';
const DRINK_ADRESS = '/drinks/15997';
const START_BTN_TEST_ID = 'start-recipe-btn';

beforeEach(() => window.localStorage.clear());

describe('Testing the pages meal details and drink details', () => {
  it('The page meals/52771 renders correctly', async () => {
    fetchingMeal();

    renderWithRouter(<App />, MEAL_ADDRESS);

    fetchingRecomendedDrink();

    const title = await screen.findByTestId('recipe-title');
    const img = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const ingredient0 = await screen.findAllByTestId('0-ingredient-name-and-measure');
    const ingrediente7 = await screen.findAllByTestId('7-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const recomendation0 = await screen.findByTestId('0-recommendation-card');
    const recomendation5 = await screen.findByTestId('5-recommendation-card');
    const startRecipeButton = await screen.findByTestId(START_BTN_TEST_ID);

    expect(title.innerHTML).toBe('<b>Spicy Arrabiata PenneEEE</b>');
    expect(img.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(category.innerHTML).toBe('<b>Vegetarian</b>');
    expect(ingredient0[0].innerHTML).toBe('penne rigate');
    expect(ingrediente7[0].innerHTML).toBe('Parmigiano-Reggiano');
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(recomendation0).toHaveTextContent('GGSS');
    expect(recomendation0).not.toHaveTextContent('GGSSSS');
    expect(recomendation5).toHaveTextContent('252ABC');
    expect(recomendation5).not.toHaveTextContent('252ABCDEFG');
    expect(startRecipeButton.innerHTML).toBe('Start Recipe');
  });

  it('The page drinks/178319 render correctly', async () => {
    fetchingDrink();

    renderWithRouter(<App />, DRINK_ADRESS);

    fetchingRecomendedMeal();

    const title = await screen.findByTestId('recipe-title');
    const img = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const ingredient0 = await screen.findAllByTestId('0-ingredient-name-and-measure');
    const ingrediente1 = await screen.findAllByTestId('1-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');
    const recomendation0 = await screen.findByTestId('0-recommendation-card');
    const recomendation5 = await screen.findByTestId('5-recommendation-card');
    const startRecipeButton = await screen.findByTestId(START_BTN_TEST_ID);

    expect(title.innerHTML).toBe('<b>GGGG</b>');
    expect(img.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(category.innerHTML).toBe('<b>Optional alcohol</b>');
    expect(ingredient0[0].innerHTML).toBe('Galliano');
    expect(ingrediente1[0].innerHTML).toBe('Ginger ale');
    expect(instructions).toBeInTheDocument();
    expect(recomendation0).toBeInTheDocument();
    expect(recomendation5).toBeInTheDocument();
    expect(startRecipeButton.innerHTML).toBe('Start Recipe');
  });

  it('The page throws an error should it occur', () => {
    global.fetch = jest.fn(() => Promise.reject(Error));

    renderWithRouter(<App />, DRINK_ADRESS);
  });

  it('The button copy should copy the address properly and show in an html tag that it has.', async () => {
    fetchingMeal();

    renderWithRouter(<App />, MEAL_ADDRESS);

    fetchingRecomendedDrink();

    const copyBtn = await screen.findByTestId('share-btn');

    expect(copyBtn.innerHTML).toContain('Share Recipe');

    window.document.execCommand = jest.fn().mockReturnValue(1);

    userEvent.click(copyBtn);

    const copyHtmlElem = await screen.findByText('Link copied!');
    expect(copyHtmlElem.innerHTML).toBe('Link copied!');

    expect(window.document.execCommand).toBeCalledWith('copy');
    expect(window.document.execCommand).toHaveBeenCalledTimes(1);
  });

  it('Clicking the start button, sends you to another page', async () => {
    fetchingMeal();

    const { history } = renderWithRouter(<App />, MEAL_ADDRESS);

    fetchingRecomendedDrink();

    const startBtn = await screen.findByTestId(START_BTN_TEST_ID);

    userEvent.click(startBtn);

    expect(history.location.pathname).toBe('/meals/52771/in-progress');
  });

  it('Pressing the favorite button saves it in the local storage, pressing it again removes from local storage', async () => {
    fetchingMeal();
    renderWithRouter(<App />, MEAL_ADDRESS);
    fetchingRecomendedDrink();

    let localStorag = window.localStorage.getItem('favoriteRecipes');
    expect(localStorag).toBe(null);

    const favBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favBtn);

    localStorag = window.localStorage.getItem('favoriteRecipes');

    expect(localStorag.length).toBe(208);

    userEvent.click(favBtn);

    localStorag = window.localStorage.getItem('favoriteRecipes');

    expect(localStorag.length).toBe(2);
  });

  it('Pressing the favorite button saves it in the local storage, pressing it again removes from local storage', async () => {
    fetchingDrink();

    renderWithRouter(<App />, DRINK_ADRESS);

    fetchingRecomendedMeal();

    let localStorag = window.localStorage.getItem('favoriteRecipes');
    expect(localStorag).toBe(null);

    const favBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favBtn);

    localStorag = window.localStorage.getItem('favoriteRecipes');

    expect(localStorag.length).toBe(206);

    userEvent.click(favBtn);

    localStorag = window.localStorage.getItem('favoriteRecipes');

    expect(localStorag.length).toBe(2);
  });

  it('Test if the button start recipe changes to continue recipe, if a recipe exist in the local storage', async () => {
    fetchingDrink();
    renderWithRouter(<App />, DRINK_ADRESS);
    fetchingRecomendedMeal();

    const dataToStorage = { meals: {}, drinks: { 15997: [] } };
    const abc = JSON.stringify(dataToStorage);
    window.localStorage.setItem('inProgressRecipes', abc);
    const localStorag = window.localStorage.getItem('inProgressRecipes');
    const parsedLocalStorag = JSON.parse(localStorag);
    expect(parsedLocalStorag).toMatchObject({ drinks: { 15997: [] } });

    const startBtn = await screen.findByTestId(START_BTN_TEST_ID);
    expect(startBtn).toHaveTextContent('Continue Recipe');
  });
});
