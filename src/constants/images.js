import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const SvgStar = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    xmlSpace="preserve"
    {...props}>
    <Path
      fill="black"
      stroke="black"
      strokeWidth={37.615}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="m259.216 29.942 71.054 143.977 158.89 23.088L374.185 309.08l27.145 158.23-142.114-74.698-142.112 74.698 27.146-158.23L29.274 197.007l158.891-23.088z"
    />
  </Svg>
);

const starPng = require('../images/star.png');
export default {
  SvgStar,
  starPng,
};
