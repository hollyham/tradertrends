import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

class StockTable extends Component {
  constructor(props) {
     super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
     this.state = { //state is by default an object
        apiResponse: -1,
        stocks: [
           { ticker: 'AAPL', numShares: 1, avgPrice: 131, currPrice: 0 },
        ],
        stockTableVals: {}
     }
  }

   callAPI() {
      fetch("http://localhost:9000/stockData/batch")
         .then(res => res.json())
         .then(res => this.setState({ stockTableVals: res }))
      //this.forceUpdate();
   }

   componentWillMount() {
      this.callAPI();
      // this.getCurrPrices();
   }

  renderTableData() {
     let stocks = this.state.stockTableVals;
     return Object.keys(stocks).map((ticker, index) => {
        return (
           <tr key={index}>
              <td>{ticker}</td>
              <td>1</td>
             <td>$100</td>
              <td>{stocks[ticker]}</td>
              <td><Button variant="danger">Sell</Button></td>
           </tr>
        )
     })
     /*
    return this.state.stocks.map((stock, index) => {
       const { ticker, numShares, avgPrice, currPrice } = stock //destructuring
       return (
          <tr key={index}>
             <td>{ticker}</td>
             <td>{numShares}</td>
             <td>{avgPrice}</td>
             <td>{this.state.apiResponse}</td>
             <td><Button variant="danger">Sell</Button></td>
          </tr>
       )
    })*/
 }

  render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
     return (
        <div>
           <Table>
            <thead>
               <tr>
               <th>Name</th>
               <th># of shares</th>
               <th>Avg. Price per Share</th>
               <th>Today</th>
               <th>Sell?</th>
               </tr>
            </thead>
            <tbody>
               {this.renderTableData()}
            </tbody>
           </Table>
        </div>
     )
  }
}

export default StockTable;