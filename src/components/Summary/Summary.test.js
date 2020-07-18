import React from 'react'
import { shallow } from 'enzyme'
import Summary from './Summary'

const props = {
  income: 1000,
  outcome: 2000
}

describe('test Summary component', () => {
  it('component should render correct income&outcome number', () => {
    const wrapper = shallow(<Summary {...props} />)
    expect(wrapper.find('.income span').text() * 1).toEqual(1000)
    expect(wrapper.find('.outcome span').text() * 1).toEqual(2000)
  })
})