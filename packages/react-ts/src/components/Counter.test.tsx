import * as React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import { Counter } from './Counter'

describe('Counter コンポーネント', () => {
  it('render', () => {
    const tree = mount(<Counter count={0} />);
    expect(toJson(tree)).toMatchSnapshot()
  });
});
