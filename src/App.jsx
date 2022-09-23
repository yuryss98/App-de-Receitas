import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <RecipeProvider>
      <div className="meals">
        <span className="logo">TRYBE 2.0</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
    </RecipeProvider>
  );
}

export default App;
