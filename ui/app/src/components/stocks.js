import {getStocks} from "../api";
import React, {Component} from "react";
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Stock = (props) => {
  const stock = props.data;
  return (
        <ListGroupItem className="list-group-item">
      {stock.symbol}
    </ListGroupItem>)
};
Stock.propTypes = {
  data: PropTypes.object.isRequired
};

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
      <Table striped bordered condensed hover>
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
      </Table>
    );
  }
}

export default StockList;