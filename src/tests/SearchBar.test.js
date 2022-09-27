import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from './helpers/meals';
import oneMeal from './helpers/oneMeal';
import drinks from './helpers/drinks';
import categoryMeals from './helpers/categoryMeals';

// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const EXEC_SEARCH_BTN = 'exec-search-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Testando componente SearchBar', () => {
  it('Se SearchBar é renderizado na pagina meals', () => {
    renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);
    expect(screen.getByTestId(EXEC_SEARCH_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();
  });

  it('Se é possivel pesquisar receitas de comida', async () => {
    const QUERY = 'Corba';
    global.fetch = jest.fn((url) => {
      let response = meals;
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=') response = meals;
      if (url === 'https://www.thecocktail.com/api/json/v1/1/search.php?f=') response = drinks;
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') response = drinks;
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') response = categoryMeals;
      if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=milk') response = meals;
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });
    renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    const searchTypeButton = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadioButton = screen.getByTestId(/ingredient-search-radio/);

    userEvent.clear(searchInput);
    userEvent.click(searchInput);
    userEvent.type(searchInput, 'milk');
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);
    await waitFor(() => expect(screen.getByText(QUERY)).toBeInTheDocument());
  });

  it('Se é possivel pesquisar receitas de drinks', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));
    renderWithRouter(<App />, '/drinks');
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    const searchTypeButton = screen.getByTestId('exec-search-btn');
    const ingredientRadioButton = screen.getByTestId(/ingredient-search-radio/);
    userEvent.type(searchInput, 'milk');
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);
    await waitFor(() => expect(screen.getByText('Ace')).toBeInTheDocument());
  });

  it('Se redireciona caso pesquise apenas um receita', async () => {
    const QUERY = 'Moussaka';
    global.fetch = jest.fn((url) => {
      let response = meals;
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=') response = meals;
      if (url === 'https://www.thecocktail.com/api/json/v1/1/search.php?f=') response = drinks;
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') response = drinks;
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') response = categoryMeals;
      if (url === `https://www.themealdb.com/api/json/v1/1/search.php?s=${QUERY}`) response = oneMeal;
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });
    const { history } = renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    const searchTypeButton = screen.getByTestId('exec-search-btn');
    const nameRadioButton = screen.getByLabelText(/Nome/i);

    userEvent.click(nameRadioButton);
    userEvent.clear(searchInput);
    userEvent.click(searchInput);
    userEvent.type(searchInput, QUERY);
    userEvent.click(searchTypeButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/search.php?s=${QUERY}`));
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977'));
  });
  it('Se redireciona caso pesquise apenas um receita', async () => {
    const QUERY = 'rdcfvtygbhunijk,lç,kimjnhubygvft';
    global.fetch = jest.fn((url) => {
      let response = meals;
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=') response = meals;
      if (url === 'https://www.thecocktail.com/api/json/v1/1/search.php?f=') response = drinks;
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') response = drinks;
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') response = categoryMeals;
      if (url === `https://www.themealdb.com/api/json/v1/1/search.php?s=${QUERY}`) response = { meals: null };
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });
    window.alert = jest.fn();
    renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    const searchTypeButton = screen.getByTestId('exec-search-btn');
    const nameRadioButton = screen.getByTestId('name-search-radio');

    userEvent.clear(searchInput);
    userEvent.click(searchInput);
    userEvent.type(searchInput, QUERY);
    userEvent.click(nameRadioButton);
    userEvent.click(searchTypeButton);
    expect(nameRadioButton).toBeChecked();
    await waitFor(() => expect(window.alert).toHaveBeenCalledWith(
      'Sorry, we haven\'t found any recipes for these filters.',
    ));
  });
});
