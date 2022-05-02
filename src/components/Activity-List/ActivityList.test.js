import React from 'react';
import { shallow } from 'enzyme';
import Ionicon from 'react-ionicons';
import ActivityList from './ActivityList';
import { testItems, testCategories } from '../../testData';
import { flattenArr } from '../../utility';

/**
 * 1. 传入特定数组，是否渲染对应长度的条目
 * 2. 每个条目是否渲染特定组件和内容
 * 3. 点击按钮是否触发特定回调
 */

const itemsWithCategory = testItems.map((item) => {
  item.category = flattenArr(testCategories)[item.cid];
  return item;
});

const props = {
  items: itemsWithCategory,
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn(),
};
let wrapper;
describe('test ActivityList component', () => {
  // excute before each it
  beforeEach(() => {
    wrapper = shallow(<ActivityList {...props} />);
  });

  it('should render the component to match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correct amount items length', () => {
    expect(wrapper.find('.list-group-item').length).toEqual(
      itemsWithCategory.length
    );
  });

  it('should render correct icon and amount for each item', () => {
    const iconList = wrapper.find('.list-group-item').first().find(Ionicon);
    expect(iconList.length).toEqual(3);
    expect(iconList.first().props().icon).toEqual(
      itemsWithCategory[0].category.iconName
    );
  });

  it('should trigger the correct function callbacks', () => {
    const firstItem = wrapper.find('.list-group-item').first();
    firstItem.find('a').first().simulate('click');
    expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategory[0]);
    firstItem.find('a').last().simulate('click');
    expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategory[0]);
  });
});
