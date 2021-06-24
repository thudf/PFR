import styled, {css} from 'styled-components/native';

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
  font-size: ${fonts.fontSize24};
  line-height: 26px;
  color: ${colors.white};
  text-align: left;
  margin-top: 30px;
`;

export const MainTextContainer = styled.View`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 20px;

  ${props =>
    !props.readMore &&
    css`
      max-height: 144px;
    `}
`;

export const MainText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  line-height: 18px;
  color: ${colors.lightGrey};
  text-align: center;
  text-align: left;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const ContainerVideo = styled.View`
  position: relative;
  width: 100%;
`;

export const ThumbnailImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => (props.height ? props.height : 180)}px;
  border-radius: 4px;
  margin-top: 30px;
  background-color: ${colors.grey};
`;

export const ThumbnailFilter = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 30px;
  height: ${props => (props.height ? props.height : 180)}px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const TreatmentImage = styled.Image`
  width: 100%;
  height: ${props => (props.height ? props.height : 180)}px;
  border-radius: 4px;
  margin-top: 30px;
  background-color: ${colors.grey};
`;
