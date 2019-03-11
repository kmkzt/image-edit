import * as React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import { InputFile } from '.'

describe('InputFile Test', () => {
  it('snapshot', () => {
    const tree = mount(<InputFile />)
    expect(toJson(tree)).toMatchSnapshot()
  })
})
