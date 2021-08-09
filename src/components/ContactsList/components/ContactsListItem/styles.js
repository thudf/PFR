import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import {colors, fonts} from '../../../../global';

export const ChatButtonContainer = styled(RectButton)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 4px;
  padding-right: 25px;
  padding-bottom: 4px;
  padding-left: 25px;
  margin-top: ${props => (props.isFirst ? 25 : 0)}px;
  margin-bottom: ${props => (props.isLast ? 21 : 12)}px;
  background-color: ${colors.black};
`;

export const ChatAvatarContainer = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.grey};
  position: relative;
`;

export const ChatAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-self: center;
`;

export const ChatBadge = styled.View`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${colors.mustard};
  align-items: center;
  justify-content: center;
`;

export const ChatInfoContainer = styled.View`
  margin-left: 14px;
  flex: 1;
`;

export const ChatTitle = styled.Text`
  font-family: ${fonts.robotoMedium};
  font-size: ${fonts.fontSize18};
  color: ${colors.white};
  line-height: 21px;
`;
