import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 25px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
`;

export const Label = styled.Text`
  font-family: ${fonts.robotoMedium};
  font-size: ${fonts.fontSize14};
  color: ${props => (props.checked ? colors.white : colors.coral)};
  margin-left: 8px;
`;
