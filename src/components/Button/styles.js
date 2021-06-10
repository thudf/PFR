import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import {colors, fonts} from '../../global';

export const Container = styled(RectButton)`
  width: 100%;
  height: 38px;
  background-color: ${props =>
    props.buttonColor ? props.buttonColor : colors.mustard};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
  ${props =>
    !props.active &&
    css`
      opacity: 0.3;
    `}
`;

export const ButtonText = styled.Text`
  font-family: ${fonts.robotoRegular};
  font-size: ${fonts.fontSize16};
  color: ${props => (props.textColor ? props.textColor : colors.white)};
`;

export const Icon = styled(SimpleLineIcon)`
  position: absolute;
  top: 30%;
  left: 16px;
`;
