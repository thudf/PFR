import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
  align-items: center;
  justify-content: flex-start;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Title = styled.Text`
  font-family: ${fonts.sourceSerifProLight};
  font-size: ${fonts.fontSize28};
  color: ${colors.white};
  text-align: center;
`;

export const FormView = styled.View`
  width: 100%;
`;
