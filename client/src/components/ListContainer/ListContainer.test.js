import React from 'react';
import ListContainer from './ListContainer';
import { shallow } from 'enzyme';
let defaultProps;
beforeEach(() => {
    defaultProps = {
        todoListData: [{
            title: 'List 1',
            task: [{
                description: "Test",
                status: false
            }]
        }],
        onTodoUpdate: jest.fn(),
        onListRemove: jest.fn()
    }
});
it('renders correctly', () => {
  const component = shallow(<ListContainer {...defaultProps}/>)
  expect(component).toMatchSnapshot();
});