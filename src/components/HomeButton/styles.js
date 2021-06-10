import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

export const Container = styled.TouchableOpacity`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${colors.darkGrey};
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: 25%;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.View`
  width: 100%;
  height: 50%;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled.View`
  width: 100%;
  height: 25%;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize18};
  color: ${colors.lightGrey};
  line-height: ${fonts.fontSize18};
`;
