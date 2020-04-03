import React from 'react';
import './App.css';

import Header from './components/Header/Header'
import Items from './components/Items/Items';
    
function App() {
  return (
    <div className="todo">
      <Header>
        todo-лист
      </Header>
      <h1 align="center">
        <font color="#ff4040">
          Вводите свои дела
        </font>
      </h1>
      <hr size="1" color="#ff8040"></hr>
      <br></br>
      <div className="fig">
        <Items />
      </div>
      <footer className="foot">
        Создано © magix1985
      </footer>
    </div>
  );
}
      
export default App;
