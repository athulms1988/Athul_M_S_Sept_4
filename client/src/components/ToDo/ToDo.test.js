import React from 'react';
import ToDo from './ToDo';
import axios from 'axios';
import { shallow, mount } from 'enzyme';

jest.mock('axios');

beforeEach(() => {
  axios.get.mockResolvedValue({then: jest.fn(), catch: jest.fn()});
  axios.post.mockResolvedValue({then: jest.fn(), catch: jest.fn()});
});

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