import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testa a pagina Porfile', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify({ email: 'test@test.com' })),
        clear: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('verificar se renderiza o email do localStorage', async () => {
    const { history } = renderWithRouter(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');
    const email = screen.getByText('test@test.com');
    expect(email).toBeInTheDocument();
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('verificar se renderiza o botão Done Recipes e se ele funciona', async () => {
    const { history } = renderWithRouter(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');

    expect(doneRecipesBtn).toBeInTheDocument();
    userEvent.click(doneRecipesBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('verificar se renderiza o botão Favorite Recipes e se ele funciona', async () => {
    const { history } = renderWithRouter(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');

    expect(favoriteRecipesBtn).toBeInTheDocument();
    userEvent.click(favoriteRecipesBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('verificar se renderiza o botão Logout e se ele funciona', async () => {
    const { history } = renderWithRouter(<App />, '/profile');
    expect(history.location.pathname).toBe('/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
    expect(window.localStorage.clear).toHaveBeenCalledTimes(1);
  });
});
