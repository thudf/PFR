import styled, {css} from 'styled-components/native';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  width: 92%;
  align-items: center;

  padding-top: 9px;
  padding-right: 9px;
  padding-bottom: 9px;
  padding-left: 18px;
  margin-top: 32px;
  margin-right: 20px;
  margin-bottom: 0;
  margin-left: 20px;

  border-width: 1px;
  border-color: ${colors.grey};
  border-radius: 4px;

  background-color: ${colors.darkGrey};

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.white};
    `};
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
  /* color: ${props => (props.editable ? colors.white : colors.grey)}; */
  color: ${colors.white};
  margin-top: 0;
  margin-right: 9px;
  margin-bottom: 0;
  margin-left: 0;
  padding-top: 0;
  padding-left: 0;
  padding-bottom: 0;
`;
