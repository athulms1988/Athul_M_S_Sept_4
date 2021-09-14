import React from 'react';
import Task from './Task';
import { mount, shallow } from 'enzyme';
let defaultProps;
beforeEach(() => {
    defaultProps = {
        description: 'Hello', 
        status: false, 
        changeStatus: jest.fn(), 
        onTaskRemove: jest.fn(), 
        index: 1
    }
});
it('renders correctly', () => {
  const component = shallow(<Task {...defaultProps}/>)
  expect(component).toMatchSnapshot();
});

it('should render task description correctly', () => {
    const component = mount(<Task {...defaultProps}/>)
    expect(component.find('.todo-item label').text()).toEqual(' Hello');
});

it('should render task status correctly', () => {
    const component = mount(<Task {...defaultProps}/>)
    expect(component.find('.todo-item input').props().checked).toEqual(false);
});

it('should be able to change status of a task', () => {
    const component = mount(<Task {...defaultProps}/>)
    component.find('.todo-item input').simulate('change', {target: {checked: true}});
    expect(defaultProps.changeStatus).toBeCalledWith(1, true);
});

it('should be able to remove a task', () => {
    const component = mount(<Task {...defaultProps}/>)
    component.find('.todo-item .fa-trash').simulate('click');
    component.find('.modal-footer .btn-danger').simulate('click');
    expect(defaultProps.onTaskRemove).toBeCalledWith(1);
});