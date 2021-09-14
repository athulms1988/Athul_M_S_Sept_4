import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';
it('renders correctly', () => {
  const component = shallow(<Login/>)
  expect(component).toMatchSnapshot();
});