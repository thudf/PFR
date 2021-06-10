import styled from 'styled-components/native';

import {colors} from '../../global';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
  align-items: center;
  justify-content: flex-start;
`;

export const Scroll = styled.ScrollView`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-bottom: ${props => (props.gap ? props.gap : 0)}px;
  margin-top: ${props => (props.mTop ? 3 * props.gap : 0)}px;
`;
