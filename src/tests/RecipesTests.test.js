import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import meals from './helpers/meals';

describe('Testando componente Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));
  });

  it('Se Meals é renderizado as comidas de forma certa na tela', async () => {
    const { history } = renderWithRouter(<App />, '/meals');
    expect(history.location.pathname).toBe('/meals');
    const resultText = await screen.findByText(/Corba/i);
    expect(resultText).toBeInTheDocument();
  });

  it('Clique da comida encaminha pra o link certo', async () => {
    const { history } = renderWithRouter(<App />, '/meals');
    expect(history.location.pathname).toBe('/meals');
    const resultText = await screen.findByText(/Corba/i);
    expect(resultText).toBeInTheDocument();
    userEvent.click(resultText);
    expect(history.location.pathname).toBe('/meals/52977');
  });

  it('verificar o profile', () => {
    const { history } = renderWithRouter(<App />, '/meals');
    const resultID = screen.getByTestId('profile-top-btn');
    userEvent.click(resultID);
    expect(history.location.pathname).toBe('/profile');
  });

  it('verificar o search', () => {
    renderWithRouter(<App />, '/meals');
    const resultID = screen.getByTestId('search-top-btn');
    userEvent.click(resultID);
    const resultSearch = screen.getByTestId('search-input');
    expect(resultSearch).toBeInTheDocument();
  });

  it('verificar o button all MEALS', async () => {
    renderWithRouter(<App />, '/meals');
    const resultID = screen.getByTestId('All-category-filter');
    expect(resultID).toBeInTheDocument();
    userEvent.click(resultID);
    const resultText = await screen.findByText(/Big Mac/i);
    expect(resultText).toBeInTheDocument();
  });

  it('verificar o button meals && drinks', async () => {
    const { history } = renderWithRouter(<App />, '/meals');
    const resultID = screen.getByTestId('drinks-bottom-btn');
    expect(resultID).toBeInTheDocument();
    userEvent.click(resultID);
    expect(history.location.pathname).toBe('/drinks');
    const resultIdMeals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(resultIdMeals);
    expect(history.location.pathname).toBe('/meals');
  });

  it('Verificar o button MEALS Category some apos dois cliques', async () => {
    renderWithRouter(<App />, '/meals');
    const resultButton = await screen.findByText(/Vegetarian/i);
    expect(resultButton).toBeInTheDocument();
    userEvent.click(resultButton);
    const resultText = await screen.findByTestId('3-recipe-card');
    userEvent.click(resultButton);
    expect(resultText).not.toBeInTheDocument();
  });
});

// describe('Testes de drinks', () => {
//   beforeEach(() => {
//     global.fetch = jest.fn(() => Promise.resolve({
//       json: () => Promise.resolve(drinks),
//     }));
//   });

//   it('Se Drinks é renderizado as bebidas de forma certa na tela', async () => {
//     const { history } = renderWithRouter(<App />, '/drinks');
//     expect(history.location.pathname).toBe('/drinks');
//     const resultText = await screen.findByText(/GG/i);
//     expect(resultText).toBeInTheDocument();
//   });

//   it('Clique da bebida encaminha pra o link certo', async () => {
//     const { history } = renderWithRouter(<App />, '/drinks');
//     expect(history.location.pathname).toBe('/drinks');
//     const resultText = await screen.findByText(/GG/i);
//     expect(resultText).toBeInTheDocument();
//     userEvent.click(resultText);
//     expect(history.location.pathname).toBe('/drinks/15997');
//   });

//   it('Verificar o button DRINKS Category some apos dois cliques', async () => {
//     renderWithRouter(<App />, '/drinks');
//     const resultButton = await screen.findByText(/Cocktail/i);
//     expect(resultButton).toBeInTheDocument();
//     userEvent.click(resultButton);
//     const resultText = await screen.findByTestId('3-recipe-card');
//     userEvent.click(resultButton);
//     expect(resultText).not.toBeInTheDocument();
//   });
//   it('verificar o button all DRINKS', async () => {
//     renderWithRouter(<App />, '/drinks');
//     const resultID = screen.getByTestId('All-category-filter');
//     expect(resultID).toBeInTheDocument();
//     userEvent.click(resultID);
//     const resultText = await screen.findByText(/Acid/i);
//     expect(resultText).toBeInTheDocument();
//   });
// });
