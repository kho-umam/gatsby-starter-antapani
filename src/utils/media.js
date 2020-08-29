import { css } from 'styled-components';

const sizes = {
  desktop: 1024,
  tablet: 768,
  phone: 480,
  phonesmall: 320,
};

// Iterate through the sizes and create a media template
export default
Object
  .keys(sizes)
  .reduce((acc, label) => {
    acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
    return acc;
  }, {});
