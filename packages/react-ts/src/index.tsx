import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Counter } from '@/components/Counter'


export class App extends React.Component {
  constructor(props: any) {
    super(props)
  }

  public state = {
    count: 0
  }

  public increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  public decrement = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  public reset = () => {
    this.setState({
      count: 0
    })
  }

  public render() {
    const { count } = this.state
    return (
      <Counter
        count={count}
        counterIncrement={this.increment}
        counterDecrement={this.decrement}
        counterReset={this.reset}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
