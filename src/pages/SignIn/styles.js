import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${colors.black};
`;

export const Row = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Content = styled.View`
  width: 88%;
  align-self: center;
  align-items: center;
`;

export const TextError = styled.Text`
  font-size: ${fonts.fontSize10};
  color: ${colors.mustard};
  font-family: ${fonts.robotoMedium};
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 32px;
  margin-left: auto;
`;

export const ForgotPasswordText = styled.Text`
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  font-family: ${fonts.robotoMedium};
  text-align: center;
`;

export const CreateAccount = styled.TouchableOpacity`
  margin-top: 15px;
  margin-bottom: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CreateAccountText = styled.Text`
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  font-family: ${fonts.robotoLight};
`;

export const CreateText = styled.Text`
  font-size: ${fonts.fontSize16};
  color: ${colors.lightGrey};
  font-family: ${fonts.robotoMedium};
  padding-left: 4px;
`;
