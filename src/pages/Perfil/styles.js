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
`;

export const MainText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  text-align: center;
  margin-top: 16px;
  margin-bottom: 60px;
`;

export const FormView = styled.View`
  width: 100%;
`;

export const UserAvatarContainer = styled.View`
  margin-top: 32px;
  position: relative;
  width: 136px;
  height: 136px;
  border-radius: 68px;
  background-color: ${colors.darkGrey};
`;

export const UserAvatar = styled.Image`
  width: 136px;
  height: 136px;
  border-radius: 68px;
  align-self: center;
`;

export const UserEmptyAvatar = styled.View`
  width: 136px;
  height: 136px;
  border-radius: 68px;
  background-color: ${colors.darkGrey};
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  position: absolute;
  bottom: -5px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.black};
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
