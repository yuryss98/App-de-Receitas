import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import drinks from './helpers/drinks';
import categoryMeals from './helpers/categoryMeals';
import meals from './helpers/meals';

window.alert = jest.fn();

const SEARC_BTN = 'search-top-btn';
const PROFILE_BTN = 'profile-top-btn';

describe('Testando componente Header', () => {
  it('Se Header é renderizado na pagina meals', async () => {
    const { history } = renderWithRouter(<App />, '/meals');
    expect(history.location.pathname).toBe('/meals');
    const resultText = await screen.findByText('Meals');
    const profileButton = screen.getByTestId(PROFILE_BTN);
    const searchButton = screen.getByTestId(SEARC_BTN);
    expect(resultText).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('Se Header é renderizado drinks', async () => {
    const { history } = renderWithRouter(<App />, '/drinks');
    expect(history.location.pathname).toBe('/drinks');
    const resultText = await screen.findByText('Drinks');
    expect(resultText).toBeInTheDocument();
  });

  it('Se clicando no botão perfil muda a rota para /perfil', () => {
    const { history } = renderWithRouter(<App />, '/meals');
    const profileButton = screen.getByTestId(PROFILE_BTN);

    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Se clicando no botão search a barra de busca aparece', () => {
    renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId(SEARC_BTN);

    userEvent.click(searchButton);

    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
  });

  it('Se Header não é renderizado na pagina Done Recipes corretamente', () => {
    renderWithRouter(<App />, '/done-recipes');
    const headerTitle = screen.getByTestId('page-title');
    expect(headerTitle.innerHTML).toBe('Done Recipes');
  });

  it('Se aparece um alerta caso pesquise com manis de uma letra', () => {
    renderWithRouter(<App />, '/drinks');
    const searchButton = screen.getByTestId(SEARC_BTN);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    const searchTypeButton = screen.getByTestId('exec-search-btn');
    const firstLetterRadioButton = screen.getByTestId('first-letter-search-radio');
    userEvent.type(searchInput, 'milk');
    userEvent.click(firstLetterRadioButton);
    userEvent.click(searchTypeButton);
    expect(firstLetterRadioButton).toBeChecked();
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });
  it('funciona com uma letra', async () => {
    global.fetch = jest.fn((url) => {
      let response = meals;
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=') response = meals;
      if (url === 'https://www.thecocktail.com/api/json/v1/1/search.php?f=') response = drinks;
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') response = drinks;
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') response = categoryMeals;
      if (url === `https://www.themealdb.com/api/json/v1/1/search.php?s=m`) response = { meals: null };
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });
    renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId(SEARC_BTN);
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('search-input');
    const searchTypeButton = screen.getByTestId('exec-search-btn');
    const firstLetterRadioButton = screen.getByTestId('first-letter-search-radio');
    userEvent.type(searchInput, 'm');
    userEvent.click(firstLetterRadioButton);
    userEvent.click(searchTypeButton);
    expect(firstLetterRadioButton).toBeChecked();
    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith("https://www.themealdb.com/api/json/v1/1/search.php?f=m"));
  });
});
