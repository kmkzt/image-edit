import * as React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import { DropFile } from '.'

describe('FileDrop Test', () => {
  it('snapshot', () => {
    const tree = mount(<DropFile />)
    expect(toJson(tree)).toMatchSnapshot()
  })
})
