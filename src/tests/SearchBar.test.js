import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando componente SearchBar', () => {
  it('Se SearchBar é renderizado na pagina meals', () => {
    renderWithRouter(<App />, '/meals');
    // const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    // const searchInput = screen.getByTestId('exec-search-btn');
    // const searchTypeButton = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchTypeButton).toBeInTheDocument();
  });

  it('Se é possivel pesquisar receitas de comida', () => {
    renderWithRouter(<App />, '/meals');
    // const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    // const searchInput = screen.getByTestId('exec-search-btn');
    // const searchTypeButton = screen.getByTestId('search-input');
    const ingredientRadioButton = screen.getByText('Ingrediente');
    userEvent.type(searchInput);
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);
  });

  it('Se é possivel pesquisar receitas de drinks', () => {
    renderWithRouter(<App />, '/drinks');
    // const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    // const searchInput = screen.getByTestId('exec-search-btn');
    // const searchTypeButton = screen.getByTestId('search-input');
    const ingredientRadioButton = screen.getByText('Ingrediente');
    userEvent.type(searchInput);
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);
  });

  it('Se aparece um alerta caso pesquise com manis de uma letra', () => {
    renderWithRouter(<App />, '/drinks');
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('exec-search-btn');
    const searchTypeButton = screen.getByTestId('search-input');
    const ingredientRadioButton = screen.getByText('Primeira letra');
    userEvent.type(searchInput, 'milk');
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);
    // testar o alert
  });

  it('Se redireciona caso pesquise apenas um receita', () => {
    // const { history } = renderWithRouter(<App />, '/meals');
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);

    const searchInput = screen.getByTestId('exec-search-btn');
    const searchTypeButton = screen.getByTestId('search-input');
    const ingredientRadioButton = screen.getByText('Ingrediente');
    userEvent.type(searchInput, 'potato');
    userEvent.click(ingredientRadioButton);
    userEvent.click(searchTypeButton);

    // expect(history.location.pathname).toBe('/');
  });
});
