import React from 'react';
import Register from './Register';
import { shallow } from 'enzyme';
it('renders correctly', () => {
  const component = shallow(<Register/>)
  expect(component).toMatchSnapshot();
});