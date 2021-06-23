import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import {colors, fonts} from '../../global';

export const Container = styled(RectButton)`
  width: 100%;
  background-color: ${colors.darkGrey};
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  padding-left: 12px;
  margin-bottom: ${props => (props.isLast ? 30 : 20)}px;
`;

export const Content = styled.View`
  flex-direction: row;
  flex: 1;
  margin-right: 8px;
  overflow: hidden;
  align-items: center;
  justify-content: flex-start;
`;

export const TeamAvatarContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${colors.grey};
`;

export const TeamAvatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-self: center;
`;

export const TeamMemberInfoContainer = styled.View`
  margin-left: 8px;
`;

export const TeamMemberName = styled.Text`
  font-family: ${fonts.robotoMedium};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  line-height: 21px;
`;

export const TeamMemberSpecialty = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize14};
  color: ${colors.lightGrey};
  line-height: 16px;
`;
