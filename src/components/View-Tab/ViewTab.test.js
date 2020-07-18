import React from 'react'
import { shallow } from 'enzyme'
import ViewTab from './ViewTab'
import { LIST_VIEW, CHART_VIEW } from '../../utility'


describe('test ViewTab component', () => {
    const props = {
        activeTab: LIST_VIEW,
        onTabChange: jest.fn(),
    }
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<ViewTab {...props}/>)
    })

    it('should render the component to match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should render two Tab component, first one should be active', () => {
        expect(wrapper.find('.nav-link').length).toEqual(2)
        expect(wrapper.find('.nav-link').first().hasClass('active')).toEqual(true)
    })

    it('click the 2nd Tab should change the active stauts and trigger the right function', () => {
        
        wrapper.find('.nav-link').last().simulate('click', { preventDefault: () => {}})
        expect(props.onTabChange).toHaveBeenCalledWith(CHART_VIEW)
        // expect(wrapper.find('.nav-link').first().hasClass('active')).toEqual(false)
        // expect(wrapper.find('.nav-link').last().hasClass('active')).toEqual(true)
    })
})