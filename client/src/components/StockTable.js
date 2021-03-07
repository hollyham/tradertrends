import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

class StockTable extends Component {
  constructor(props) {
     super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
     this.state = { //state is by default an object
        stocks: [
           { ticker: 'AAPL', numShares: 1, avgPrice: 131, currPrice: 0 },
        ],
        names: [
           'AAPL',
           'MSFT'
        ]
     }
  }

   callAPI() {
      var temp = -1;
      fetch("http://localhost:9000/stockData")
         .then(res => res.json())
         .then(res => { temp = res.AAPL; });
      // return temp;
   }

   componentWillMount() {
      var stockArr = [];
      var i;
      for (i = 0; i < this.state.names.length; i++) {
         var currPrice = this.callAPI();
         // console.log(currPrice);
         stockArr.push({ ticker: this.state.names[i], numShares: 1, avgPrice: 131, currPrice: currPrice })
      }
      this.setState({ stocks: stockArr })
   }

  renderTableData() {
    return this.state.stocks.map((stock, index) => {
       const { ticker, numShares, avgPrice, currPrice } = stock //destructuring
       return (
          <tr key={index}>
             <td>{ticker}</td>
             <td>{numShares}</td>
             <td>{avgPrice}</td>
             <td>{currPrice}</td>
             <td><Button variant="danger">Sell</Button></td>
          </tr>
       )
    })
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