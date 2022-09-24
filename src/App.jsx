import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';

import RecipeDetails from './pages/RecipeDetails';

import Header from './components/Header';
import Profile from './pages/Profile';

function App() {
  return (
    <RecipeProvider>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Login } />
        <Route exact path="/drinks" component={ Login } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/meals/{id-da-receita}/in-progress" component={ Login } />
        <Route exact path="/drinks/{id-da-receita}/in-progress" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ Login } />
        <Route exact path="/favorite-recipes" component={ Login } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
