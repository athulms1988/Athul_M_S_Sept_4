import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';
it('renders correctly', () => {
  const component = shallow(<Header/>)
  expect(component).toMatchSnapshot();
});