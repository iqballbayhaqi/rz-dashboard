// @flow
import * as React from 'react';

import defaultImage from '../../assets/images/default-image.png';

type Props = {
  src: string,
  alt: string,
  className: Object,
};

const Image = (props: Props) => (
  <img
    src={props.src}
    alt={props.alt}
    className={props.className}
    onError={(e) => { e.target.src = defaultImage; }}
  />
);


export default Image;
