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
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));
    renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(EXEC_SEARCH_BTN);
    const searchTypeButton = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadioButton = screen.getByLabelText('Ingrediente');
    userEvent.type(searchInput, 'milk');
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);
    await waitFor(() => expect(screen.getByText('Corba')).toBeInTheDocument());
  });

  it('Se é possivel pesquisar receitas de drinks', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinks),
    }));
    renderWithRouter(<App />, '/drinks');
    const searchButton = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId(EXEC_SEARCH_BTN);
    const searchTypeButton = screen.getByTestId(SEARCH_INPUT);
    const ingredientRadioButton = screen.getByLabelText('Ingrediente');
    userEvent.type(searchInput, 'milk');
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);
    await waitFor(() => expect(screen.getByText('Ace')).toBeInTheDocument());
  });

  it('Se redireciona caso pesquise apenas um receita', async () => {
    global.fetch = jest.fn((url) => {
      let response = meals;
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=') response = meals;
      if (url === 'https://www.thecocktail.com/api/json/v1/1/search.php?f=') response = drinks;
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return categoryMeals;
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const QUERY = 'Moussaka';
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
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
  });
});
