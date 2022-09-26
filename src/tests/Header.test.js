import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando componente Header', () => {
  it('Se Header é renderizado na pagina meals', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    expect(history.location.pathname).toBe('/meals');
    const resultText = await screen.findByText(/Beef/i);
    expect(resultText).toBeInTheDocument();
  });

  it('Se Header é renderizado drinks', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    expect(history.location.pathname).toBe('/drinks');
    const resultText = await screen.findByText(/Shake/i);
    expect(resultText).toBeInTheDocument();
  });

  it('Se clicando no botão perfil muda a rota para /perfil', () => {
    const { history } = renderWithRouter(<App />, '/meals');
    const profileButton = screen.getByTestId('profile-top-btn');

    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });

  it('Se clicando no botão search a barra de busca aparece', () => {
    renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId('search-top-btn');

    userEvent.click(searchButton);

    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
  });

  it('Se Header não é renderizado na pagina Done Recipes corretamente', () => {
    renderWithRouter(<App />, '/done-recipes');
    const headerTitle = screen.getByTestId('page-title');
    expect(headerTitle.innerHTML).toBe('Done Recipes');
  });
});
