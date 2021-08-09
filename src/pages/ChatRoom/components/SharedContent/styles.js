import styled, {css} from 'styled-components/native';

import {colors, fonts} from '../../../../global';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 13px 5px 9px;
  width: 100%;
  height: 50px;
  background-color: ${colors.mustard};
`;

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  flex-wrap: nowrap;
  margin-right: 36px;
`;

export const ImageContainer = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.grey};
  position: relative;
  margin-right: 6px;
`;

export const SharedContentImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-self: center;
`;

export const SharedContentTitle = styled.Text`
  font-family: ${fonts.robotoRegular};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  text-align: left;
`;
