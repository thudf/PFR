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
  padding-left: 20px;
  padding-right: 20px;
`;

export const Logo = styled.Image`
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const Title = styled.Text`
  font-family: ${fonts.sourceSerifProLight};
  font-size: ${fonts.fontSize24};
  line-height: ${fonts.fontSize24};
  color: ${colors.white};
`;

export const MainText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${colors.lightGrey};
  text-align: center;
  margin-top: 40px;
  margin-bottom: 60px;
`;

export const ContactText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${colors.lightGrey};
  text-align: center;
`;

export const SocialMedias = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
`;

export const MadeBy = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  margin-bottom: 30px;
`;
