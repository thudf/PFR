import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.white};
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: ${fonts.fontSize18};
  color: ${colors.grey};
  font-family: ${fonts.robotoRegular};
`;
