import React from 'react';
import ListCard from './ListCard';
import { mount, shallow } from 'enzyme';
let defaultProps;
beforeEach(() => {
    defaultProps = {
        list: {
            title: 'Test',
            task: [{
                description: 'Test Description',
                status: false
            }]
        }, 
        onUpdate: jest.fn(), 
        onListRemove: jest.fn(), 
        index: 1
    }
});
it('renders correctly', () => {
  const component = shallow(<ListCard {...defaultProps}/>)
  expect(component).toMatchSnapshot();
});

it('should be able to add task', () => {
    const component = mount(<ListCard {...defaultProps}/>)
    component.find('input.add-todo').simulate('change', { target: { value: 'Hello' } });
    component.find('input.add-todo').simulate('keyUp', { keyCode: 13 });
    expect(defaultProps.onUpdate).toBeCalledWith(1, {"task": [{"description": "Hello", "status": false}, ...defaultProps.list.task], "title": "Test"});
});

it('should be able to delete a task', () => {
    const component = mount(<ListCard {...defaultProps}/>)
    component.find('.todo-item .fa-trash').simulate('click');
    component.find('.modal-footer .btn-danger').simulate('click');
    expect(defaultProps.onUpdate).toBeCalledWith(1, {"task": [], "title": "Test"});
});

it('should be able to change status of a task', () => {
    const component = mount(<ListCard {...defaultProps}/>)
    component.find('.todo-item input').simulate('change', {target: {checked: true}});
    expect(defaultProps.onUpdate).toBeCalledWith(1, {"task": [{ description: 'Test Description', status: true }], "title": "Test"});
});

it('should be able to rename list name', () => {
    const component = mount(<ListCard {...defaultProps}/>)
    component.find('.card-header .fa-edit').simulate('click');
    component.find('.card-header input').simulate('change', { target: { value: 'Test 2' } });
    component.find('.card-header input').simulate('keyUp', { keyCode: 13 });
    expect(defaultProps.onUpdate).toBeCalledWith(1, {"task": [{ description: 'Test Description', status: false }], "title": "Test 2"});
});