import React from 'react';
import { shallow } from 'enzyme';
import Image from '../index';

import defaultImage from '../../../assets/images/default-image.png';

describe('Image', () => {
  it('should be defined', () => {
    expect(Image).toBeDefined();
  });
  it('should render correctly', () => {
    const tree = shallow(
      <Image src={defaultImage} alt="image test" />,
    );
    expect(tree).toMatchSnapshot();
  });
});
