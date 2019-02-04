import {getStocks} from "../api";
import React, {Component} from "react";

class StockList extends Component {
  state = {stocks: [] };

  get() {
    return (
      this.state.stocks.map((stock, i) => {
        return (<tr key={stock.symbol}>
        <td></td>
        <td >{stock.symbol}</td>
        <td>{stock.name}</td>
          <td>{stock.save_date}</td>
      </tr>)
    }))
  };

  componentDidMount() {
    getStocks((rsp) => {
      this.setState({stocks: rsp.results});
      this.render();
    })
  };

  render() {
    return (
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Save Date</th>
          </tr>
        </thead>
        <tbody>
        {this.get()}
        </tbody>
      </table>
    );
  }
}

export default StockList;