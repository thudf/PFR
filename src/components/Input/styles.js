import styled, {css} from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  width: ${props => (props.width ? props.width : '100%')};
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 12px;

  border-bottom-width: 1px;
  border-bottom-color: ${colors.grey};

  ${props =>
    props.isFocused &&
    css`
      border-bottom-color: ${colors.white};
    `};
  ${props =>
    props.error &&
    css`
      border-bottom-color: ${colors.grey};
    `};
`;

export const Label = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${props =>
    props.textAlign === 'center' ? 'center' : 'flex-start'};
  height: 24px;
`;

export const LabelText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize14};
  line-height: 24px;
  color: ${colors.softGrey};
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 20px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${props => (props.editable ? colors.white : colors.grey)};
  margin-top: 0;
  margin-left: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-left: 0;
  padding-bottom: 0;

  ${props =>
    props.textAlign &&
    css`
      text-align: center;
    `};
`;

export const TextInputM = styled(TextInputMask)`
  flex: 1;
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${props => (props.editable ? colors.white : colors.grey)};
  margin-top: 0;
  margin-left: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-left: 0;
  padding-bottom: 0;

  ${props =>
    props.textAlign &&
    css`
      text-align: center;
    `};
`;

export const ErrorText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize14};
  color: ${colors.coral};
`;
