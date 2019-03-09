import * as React from 'react'
import { mount } from 'enzyme'
import 'jest-styled-components'
import toJson from 'enzyme-to-json'
import { FileDrop } from '.'

describe('FileDrop SnapShot', () => {
  it('render', () => {
    const tree = mount(<FileDrop />)
    expect(toJson(tree)).toMatchSnapshot()
  })
})
