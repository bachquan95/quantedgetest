import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {
  Tabs,
  Tab
} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import data from '../src/data/data'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: data,
      slideIndex: 0
    }
  }
  changeColor(change) {
    var color = '#000000'
    if (change < 0) {
      return color = 'red'
    } else if (change > 0) {
      return color = 'green'
    } else {
      return color
    }
  }
  changeData() {
    let listChange = this.state.list
    for (var index = 0; index < listChange.length; index++) {
      let range = parseFloat((listChange[index].price) * 0.05)
      let changePrice = Math.random() * (range + range) - range
      let changeVolume = Math.random() * (30 - 10) + 10
      listChange[index].price = (changePrice + parseFloat(listChange[index].price)).toFixed(2)
      listChange[index].change = parseFloat(listChange[index].change + changePrice).toFixed(2)
      listChange[index].volume = parseInt(listChange[index].volume + parseInt(changeVolume, 10), 10)
      listChange[index].xchange = ((listChange[index].change / (listChange[index].price - listChange[index].change)) * 100).toFixed(2);
    }
    this.setState({
      list: listChange
    })
  }
  sortby() {
    let list = this.state.list
    if (this.state.slideIndex === 1) {
      list.sort(function (x, y) {
        return ((x.price) * (x.volume)) - ((y.price) * (y.volume))
      });
    } else {
      list.sort(function (y, x) {
        return ((x.price) * (x.volume)) - ((y.price) * (y.volume))
      });
    }
  }
  componentWillMount = () => {
    setInterval(this.changeData.bind(this), 5000);
  }
  componentDidMount = () => {
    // setInterval(this.changeData.bind(this), 5000);
  }


  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    console.log(this.state.list)
    return (<MuiThemeProvider>
      <AppBar
        title={<span>S&P/ASX</span>}
        showMenuIconButton={false}
      >
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}>
          <Tab label="TOP GAINERS" style={{ padding: '10px 30px 10px 30px' }} value={0}>
            {this.sortby()}
          </Tab>

          <Tab label="TOP LOSER" style={{ padding: '10px 30px 10px 30px' }} value={1}>
            {this.sortby()}
          </Tab>
        </Tabs>
      </AppBar>
      <SwipeableViews
        index={this.state.slideIndex}
        onChangeIndex={this.handleChange}
      >
        <div>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{ width: '8%' }}>Code</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '30%' }}>Company</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '20%', textAlign: 'right' }}>Price</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '14%', textAlign: 'right' }}>Value</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '14%', textAlign: 'right' }}>Change</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '14%', textAlign: 'right' }}>%Change</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} adjustForCheckbox={false}>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn style={{ width: '8%', color: '#119fe1', fontWeight: 'bold' }}>{row.code}</TableRowColumn>
                  <TableRowColumn style={{ width: '30%' }}>{row.company}</TableRowColumn>
                  <TableRowColumn style={{ width: '20%', textAlign: 'right', fontWeight: 'bold' }}>{row.price}</TableRowColumn>
                  <TableRowColumn style={{ width: '14%', textAlign: 'right', fontWeight: 'bold' }}>{parseInt(row.volume * row.price, 10)}</TableRowColumn>
                  <TableRowColumn style={{ width: '14%', textAlign: 'right', fontWeight: 'bold', color: this.changeColor(row.change) }}>{row.change}</TableRowColumn>
                  <TableRowColumn style={{ width: '14%', textAlign: 'right', fontWeight: 'bold', color: this.changeColor(row.change) }}>{row.xchange}%</TableRowColumn>
                </TableRow>
              )).filter((row) => {
                return (row.key < 20)
              })}
            </TableBody>
          </Table>
        </div>
        <div style={styles.slide}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{ width: '8%' }}>Code</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '30%' }}>Company</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '20%', textAlign: 'right' }}>Price</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '14%', textAlign: 'right' }}>Value</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '14%', textAlign: 'right' }}>Change</TableHeaderColumn>
                <TableHeaderColumn style={{ width: '14%', textAlign: 'right' }}>%Change</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} adjustForCheckbox={false}>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableRowColumn style={{ width: '8%', color: '#119fe1', fontWeight: 'bold' }}>{row.code}</TableRowColumn>
                  <TableRowColumn style={{ width: '30%' }}>{row.company}</TableRowColumn>
                  <TableRowColumn style={{ width: '20%', textAlign: 'right', fontWeight: 'bold' }}>{row.price}</TableRowColumn>
                  <TableRowColumn style={{ width: '14%', textAlign: 'right', fontWeight: 'bold' }}>{parseInt(row.volume * row.price, 10)}</TableRowColumn>
                  <TableRowColumn style={{ width: '14%', textAlign: 'right', fontWeight: 'bold', color: this.changeColor(row.change) }}>{row.change}</TableRowColumn>
                  <TableRowColumn style={{ width: '14%', textAlign: 'right', fontWeight: 'bold', color: this.changeColor(row.change) }}>{row.xchange}%</TableRowColumn>
                </TableRow>
              )).filter((row) => {
                return (row.key < 20)
              })}
            </TableBody>
          </Table>
        </div>
      </SwipeableViews>
    </MuiThemeProvider>
    );
  }
}

export default App;
