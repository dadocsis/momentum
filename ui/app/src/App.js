import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const List = (props) => {
return (
<ul>
  {props.stocks.map((stock, i) =>
    <li key={stock.symbol}>{stock.symbol}</li>
  )}
</ul>
  )
}

class App extends Component {
  state = {
    stocks: [{'symbol': 'test'}]
  }
  render() {
    return (
      <div className="App">
        <List stocks={this.state.stocks}/>
      </div>
    );
  }
}

export default App;
