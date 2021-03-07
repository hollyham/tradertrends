import React, { Component } from "react";
import { Button, Container, Navbar } from 'react-bootstrap';
import StockTable from './components/StockTable';

import logo from './green_arrow.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:9000/stockData")
          .then(res => res.json())
          .then(res => this.setState({ apiResponse: res.AAPL }));
  }

  componentWillMount() {
      this.callAPI();
  }
  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Trader Trends
          </Navbar.Brand>
        </Navbar>
      <Container fluid>
        <p>Hello! Here is the daily rundown: </p>
        <p>Today's gains: $100</p>
        <p>Total gains: $200</p>
        <Button variant="success">Add</Button>{' '}
        <StockTable currPrice={this.apiResponse}/>
      </Container>
      { /*
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <p className="App-intro">{this.state.apiResponse}</p>
          </header>
        */
       }
      </div>
      
    );
  }
}

export default App;
