import styled, {css} from 'styled-components/native';

import {colors, fonts} from '../../../../global';

export const Container = styled.View`
  width: 100%;
  align-items: center;
  /* padding: 15px 13px; */

  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.grey};

  background-color: ${colors.darkGrey};

  ${props =>
    props.isFocused &&
    css`
      border-color: ${colors.mustard};
      background-color: ${colors.mustard};
    `};
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 0 13px;
  height: 57px;
  border-radius: 4px;
  background-color: ${colors.darkGrey};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  margin-top: 0;
  margin-right: 13px;
  margin-bottom: 0;
  margin-left: 13px;
  padding-top: 0;
  padding-left: 0;
  padding-bottom: 0;
`;
