import React from 'react';
import ToDo from './ToDo';
import { shallow, mount } from 'enzyme';
it('renders correctly', () => {
  const component = shallow(<ToDo/>)
  expect(component).toMatchSnapshot();
});

it('should show the header component', () => {
    const component = mount(<ToDo/>)
    expect(component.find('.navbar').length).toEqual(1);
});

it('should show the new list button', () => {
    const component = mount(<ToDo/>)
    expect(component.find('button.btn-primary').text()).toEqual('New List');
});