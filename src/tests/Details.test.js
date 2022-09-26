import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import detailsMealsMock from './helpers/detailsMealsMock';
import detailsRecomendedDrinks from './helpers/detailsRecomendedDrinks';
import detailsDrinkMock from './helpers/detailsDrinkMock';
import detailsRecomendedMeals from './helpers/detailsRecomendedMeals';

describe('Testing the pages meal details and drink details', () => {
  it('The page meals/52771 renders correctly', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(detailsMealsMock),
    }));

    renderWithRouter(<App />, '/meals/52771');

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(detailsRecomendedDrinks),
    }));

    const title = await screen.findByTestId('recipe-title');
    const img = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const ingredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingrediente7 = await screen.findByTestId('7-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');
    const video = await screen.findByTestId('video');
    const recomendation0 = await screen.findByTestId('0-recommendation-card');
    const recomendation5 = await screen.findByTestId('5-recommendation-card');
    const startRecipeButton = await screen.findByTestId('start-recipe-btn');

    expect(title.innerHTML).toBe('<b>Spicy Arrabiata Penne</b>');
    expect(img.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(category.innerHTML).toBe('<b>Vegetarian</b>');
    expect(ingredient0.innerHTML).toBe('1 pound of penne rigate');
    expect(ingrediente7.innerHTML).toBe('spinkling of Parmigiano-Reggiano');
    expect(instructions).toBeInTheDocument();
    expect(video).toBeInTheDocument();
    expect(recomendation0).toBeInTheDocument();
    expect(recomendation5).toBeInTheDocument();
    expect(startRecipeButton.innerHTML).toBe('Start recipe');
  });

  it('The page drinks/178319 render correctly', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(detailsDrinkMock),
    }));

    renderWithRouter(<App />, '/drinks/178319');

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(detailsRecomendedMeals),
    }));

    const title = await screen.findByTestId('recipe-title');
    const img = await screen.findByTestId('recipe-photo');
    const category = await screen.findByTestId('recipe-category');
    const ingredient0 = await screen.findByTestId('0-ingredient-name-and-measure');
    const ingrediente1 = await screen.findByTestId('1-ingredient-name-and-measure');
    const instructions = await screen.findByTestId('instructions');
    const recomendation0 = await screen.findByTestId('0-recommendation-card');
    const recomendation5 = await screen.findByTestId('5-recommendation-card');
    const startRecipeButton = await screen.findByTestId('start-recipe-btn');

    expect(title.innerHTML).toBe('<b>GG</b>');
    expect(img.src).toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
    expect(category.innerHTML).toBe('<b>Optional alcohol</b>');
    expect(ingredient0.innerHTML).toBe('Ice of Galliano');
    expect(ingrediente1.innerHTML).toBe('2 1/2 shots  of Ginger ale');
    expect(instructions).toBeInTheDocument();
    expect(recomendation0).toBeInTheDocument();
    expect(recomendation5).toBeInTheDocument();
    expect(startRecipeButton.innerHTML).toBe('Start recipe');
  });

  it('The page throws an error should it occur', () => {
    global.fetch = jest.fn(() => Promise.reject(Error));

    renderWithRouter(<App />, '/drinks/178319');
  });
});
