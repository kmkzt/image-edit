import * as React from 'react'

export interface Props {
  count: number
  counterIncrement?: () => void
  counterDecrement?: () => void
  counterReset?: () => void
}

export class Counter extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  public render() {
    const {
      count,
      counterIncrement,
      counterDecrement,
      counterReset
    } = this.props
    return (
      <div>
        <h3>COUNTER</h3>
        <div>{count}</div>
        <button onClick={counterIncrement}>+1</button>
        <button onClick={counterDecrement}>-1</button>
        <button onClick={counterReset}>Reset</button>
      </div>
    )
  }
}
