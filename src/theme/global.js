import { createGlobalStyle } from 'styled-components';
import media from '../utils/media';
import siteHeader from './siteHeader';

export default createGlobalStyle`
  ${media}
  ${siteHeader}
`;
