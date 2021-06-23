import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  width: 100%;
  background-color: ${colors.darkGrey};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: 20px;
  padding-right: 25px;
  padding-bottom: 20px;
  padding-left: 25px;
  margin-bottom: ${props => (props.isLast ? 30 : 20)}px;
`;

export const Content = styled.View`
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const UnityInfoContainer = styled.View`
  margin-bottom: 10px;
`;

export const UnityName = styled.Text`
  font-family: ${fonts.robotoMedium};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  line-height: 21px;
`;

export const UnityAddress = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize14};
  font-weight: 300;
  color: ${colors.lightGrey};
  line-height: 16px;
`;

export const UnityPhone = styled.Text`
  font-family: ${fonts.robotoBold};
  font-size: ${fonts.fontSize14};
  color: ${colors.lightGrey};
  font-weight: 700;
  line-height: 16px;
  text-align: left;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 16px;
`;
