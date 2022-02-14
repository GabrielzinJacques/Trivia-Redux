import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import logo from './trivia.png';
import store from './store';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <Login />
          </header>
        </div>
      </Provider>
    </BrowserRouter>
  );
}
