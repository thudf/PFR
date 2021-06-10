import styled from 'styled-components/native';
import {Animated} from 'react-native';

import {colors} from './global';

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 90%;
  align-self: center;
  height: 100px;
  margin-bottom: 100px;
`;

export const AnimatedView = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.black};
`;

export const InnerView = styled.View`
  flex: 1;
  background-color: ${colors.black};
`;
