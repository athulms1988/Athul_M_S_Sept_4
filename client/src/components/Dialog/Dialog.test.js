import React from 'react';
import Dialog from './Dialog';
import { shallow, mount } from 'enzyme';
let defaultProps;
beforeEach(() => {
    defaultProps = {
        dialogData: {
            index: 1,
            type: 'List',
            description: "Test"
        },
        handleChange: jest.fn()
    }
});
it('renders correctly', () => {
  const component = shallow(<Dialog {...defaultProps}/>)
  expect(component).toMatchSnapshot();
});

it('should call handleChange with false on Cancel', () => {
    const component = mount(<Dialog {...defaultProps}/>);
    component.find('div.modal-title').contains("List");
    component.find('button.btn-secondary').simulate('click');
    expect(defaultProps.handleChange).toBeCalledWith(false);
});

it('should call handleChange with true on Submit', () => {
    const component = mount(<Dialog {...defaultProps}/>);
    component.find('div.modal-title').contains("List");
    component.find('button.btn-danger').simulate('click');
    expect(defaultProps.handleChange).toBeCalledWith(true);
});