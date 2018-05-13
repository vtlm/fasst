import React, { Component } from 'react'
// import logo from './logo.svg';
// import './App.css';
import glamorous from 'glamorous'

const FramedDiv = glamorous.div({ border: '1px solid #ff0000' })

const lines = 20,
  rows = 15

class Line {
  fill(n) {
    for (let i = 0; i < n; i++) {
      this[i] = { val: i * 1000, ref: React.createRef() }
    }
  }
}

class Table {
  fill(n, k) {
    for (let i = 0; i < n; i++) {
      let line = new Line()
      line.fill(k)
      this[i] = { name: i, data: line, ref: React.createRef() }
    }
  }
}

let tabl = new Table()
tabl.fill(lines, rows)
console.log(tabl)

setInterval(() => {
  for (let i = 0; i < lines; i++) {
    tabl[i].ref.current.innerHTML = Math.random() * 4000
    for (let j = 0; j < rows; j++)
      tabl[i].data[j].ref.current.innerHTML = Math.random() * 4000
  }
}, 40)

class RowView extends Component {
  render() {
    // console.log(this.props.row)
    return (
      <div>
        {Object.entries(this.props.row).map(x => (
          <span key={x[0]} ref={x[1].ref}>
            {x[1].val}sss
          </span>
        ))}
      </div>
    )
  }
}

class TableView extends Component {
  render() {
    return (
      <div>
        {Object.entries(this.props.tabl).map(x => (
          <div>
            <div key={x[0]} ref={x[1].ref}>
              {x[1].name}
            </div>
            <RowView row={x[1].data} />
          </div>
        ))}
      </div>
    )
  }
}

class TextField extends Component {
  render() {
    return null
  }
}

const FastTextFieldStateless = React.forwardRef((props, ref) => (
  <FramedDiv>
    <div ref={ref}>dd</div>
    {/*<div>dd</div>*/}
  </FramedDiv>
))

class App extends Component {
  constructor() {
    super()
    this.ref1 = React.createRef()
  }

  state = {
    name: 'you',
    cnt: 0
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ cnt: this.state.cnt + 1 })
      this.ref1.current.innerHTML = 'f' + this.state.cnt + 1
    }, 1000)
    // this.ref1 = React.createRef()
  }

  render() {
    return (
      <FramedDiv>
        {this.state.name}
        {this.state.cnt}
        <div ref={this.ref1}>aa</div>
        <FastTextFieldStateless ref={this.ref1} />
        <TableView tabl={tabl} />
      </FramedDiv>
    )
  }
}

export default App
