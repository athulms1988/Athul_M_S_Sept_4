import React from 'react';
import TaskInput from './TaskInput';
import { shallow, mount } from 'enzyme';

let defaultProps;
beforeEach(() => {
    defaultProps = {
        value: 'Hello', 
        handleChange: jest.fn(), 
        handleKeyUp: jest.fn()
    }
});

it('renders correctly', () => {
  const component = shallow(<TaskInput/>)
  expect(component).toMatchSnapshot();
});

it('should set the input value correctly', () => {
    const component = mount(<TaskInput {...defaultProps}/>)
    expect(component.find('input.add-todo').props().value).toEqual('Hello');
});

it('should be able to change the input value correctly', () => {
    const component = shallow(<TaskInput {...defaultProps}/>)
    component.find('input.add-todo').simulate('change', { target: { value: 'Hai' } });
    expect(defaultProps.handleChange).toBeCalledWith({ target: { value: 'Hai' } });
});

it('should be able to submit the input value correctly', () => {
    const component = shallow(<TaskInput {...defaultProps}/>)
    component.find('input.add-todo').simulate('change', { target: { value: 'Hai' } });
    component.find('input.add-todo').simulate('keyUp', { keyCode: 13 });
    expect(defaultProps.handleKeyUp).toBeCalledWith({ keyCode: 13 });
});
