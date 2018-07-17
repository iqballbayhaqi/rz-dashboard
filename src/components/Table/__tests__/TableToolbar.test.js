import React from 'react';
import { shallow } from 'enzyme';
import TableToolbar from '../TableToolbar';

describe('TableToolbar', () => {
  it('should be defined', () => {
    expect(TableToolbar).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = shallow(
      <TableToolbar title="table title test" />,
    );
    expect(tree).toMatchSnapshot();
  });
});
