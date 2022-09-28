import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';
import RecipeDetails from './pages/RecipeDetails';

import Header from './components/Header';
import Profile from './pages/Profile';
import Recipes from './pages/Recipes';
import InProgress from './pages/InProgress';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <RecipeProvider>
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/meals/:id/in-progress" component={ InProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ InProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ Login } />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
