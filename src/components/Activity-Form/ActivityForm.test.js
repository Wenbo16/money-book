import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// import RTL from '../../pages/';

import ActivityForm from './ActivityForm';
import { testItems } from '../../testData';
let props = {
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn(),
};
let props_with_item = {
  item: testItems[0],
  onFormSubmit: jest.fn(),
  onCancelSubmit: jest.fn(),
};

export const getInputValue = (selector, wrapper) =>
  wrapper.find(selector).instance().value;

export const setInputValue = (selector, newValue, wrapper) => {
  wrapper.find(selector).instance().value = newValue;
};

describe('test ActivityForm component', () => {
  it('should render the component to match snapshot', () => {
    expect(
      renderer.create(<ActivityForm {...props} />).toJSON()
    ).toMatchSnapshot();
    expect(
      renderer.create(<ActivityForm {...props_with_item} />).toJSON()
    ).toMatchSnapshot();
  });
});

describe('test ActivityForm with no item', () => {
  beforeEach(() => {
    render(<ActivityForm {...props} />);
  });
  it('render ActivityForm should generate three inputs and one form element', () => {
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
  });
  it('render ActivityForm with no data should render three inputs and no value', () => {
    expect(screen.getByRole('form')).toHaveFormValues({
      'activity-form-title': '',
      'activity-form-amount': 0,
      'activity-form-date': '',
    });
  });

  it('submit form with empty input should show alert message', () => {
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByRole('alert')).toBeVisible();
    expect(props_with_item.onFormSubmit).not.toHaveBeenCalled();
  });

  it('submit form with invalid amount should show alert message', () => {
    render(<ActivityForm {...props} />);
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'teste' },
    });
    fireEvent.change(screen.getByLabelText('Amount'), {
      target: { value: '-20' },
    });

    // fireEvent.click(screen.getByText('Submit'));
    screen.debug();
    expect(screen.getByRole('form')).toBeInvalid();
  });

  // it('submit form with invalid date format should show alert message', () => {
  //   setInputValue('#title', 'test', wrapper);
  //   setInputValue('#amount', '20', wrapper);
  //   setInputValue('#date', 'wrong date', wrapper);
  //   fireEvent.click(screen.getByText('Submit'));
  //   //   expect(formInstance.state.validatePass).toEqual(false)
  // });
  // it('submit form with valid data should call with the right object', () => {
  //   setInputValue('#title', 'test', wrapper);
  //   setInputValue('#amount', '20', wrapper);
  //   setInputValue('#date', '2018-01-01', wrapper);
  //   const newItem = { title: 'test', amount: 20, date: '2018-01-01' };
  //   wrapper.find('form').simulate('submit');
  //   expect(props.onFormSubmit).toHaveBeenCalledWith(newItem, false);
  // });
  // it('click the cancel button should call the right callback', () => {
  //   wrapper.find('button').last().simulate('click');
  //   expect(props.onCancelSubmit).toHaveBeenCalled();
  // });
  // });
  // describe('test ActivityForm with item data', () => {
  //   it('render ActivityForm with item should render the correct data to inputs', () => {
  //     expect(getInputValue('#title', wrapper2)).toEqual(testItems[0].title);
  //     expect(getInputValue('#amount', wrapper2)).toEqual(
  //       testItems[0].amount.toString()
  //     );
  //     expect(getInputValue('#date', wrapper2)).toEqual(testItems[0].date);
  //   });
  //   it('submit with changed value, should trigger callback with right object', () => {
  //     setInputValue('#title', 'new title', wrapper2);
  //     setInputValue('#amount', '200', wrapper2);
  //     wrapper2.find('form').simulate('submit');
  //     const newItem = { ...testItems[0], title: 'new title', amount: 200 };
  //     //   expect(formInstance.state.validatePass).toEqual(true)
  //     expect(wrapper2.find('.alert').length).toEqual(0);
  //     expect(props_with_item.onFormSubmit).toHaveBeenCalledWith(newItem, true);
  //   });
});
