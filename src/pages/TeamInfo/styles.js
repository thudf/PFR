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

export const TeamMemberAvatarContainer = styled.View`
  margin-top: 32px;
  margin-bottom: 22px;
  width: 210px;
  height: 210px;
  border-radius: 105px;
  background-color: ${colors.darkGrey};
`;

export const TeamMemberAvatar = styled.Image`
  width: 210px;
  height: 210px;
  border-radius: 105px;
  align-self: center;
`;

export const Title = styled.Text`
  font-family: ${fonts.sourceSerifProLight};
  font-size: ${fonts.fontSize24};
  line-height: 26px;
  color: ${colors.white};
`;

export const SubTitle = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize18};
  line-height: 22px;
  color: ${colors.white};
`;

export const MainText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${colors.lightGrey};
  text-align: center;
  margin-top: 22px;
  margin-bottom: 40px;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ContactTitle = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize18};
  color: ${colors.grey};
`;

export const ContactButton = styled.TouchableOpacity`
  margin-bottom: 40px;
`;

export const ContactText = styled.Text`
  font-family: ${fonts.robotoRegular};
  font-size: ${fonts.fontSize24};
  color: ${colors.white};
  text-align: center;
`;
