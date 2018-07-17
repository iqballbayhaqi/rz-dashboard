import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../index';

describe('Image', () => {
  it('should be defined', () => {
    expect(Footer).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = shallow(
      <Footer />,
    );
    expect(tree).toMatchSnapshot();
  });
});
