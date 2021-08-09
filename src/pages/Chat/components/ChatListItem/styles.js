import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import {colors, fonts} from '../../../../global';

export const Scroll = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

export const ChatButtonContainer = styled.View`
  width: 100%;
  height: 74px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${colors.black};
  position: relative;
`;

export const ChatButtonContainerWrap = styled(RectButton)`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: 4px;
  padding-right: 25px;
  padding-bottom: 4px;
  padding-left: 25px;
`;

export const ChatButtonContainerBackground = styled.View`
  width: 100%;
  height: 74px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: ${colors.darkGrey};
  position: absolute;
  top: 0;
  left: 0;
`;

export const ChatButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.coral};
  margin-top: ${props => (props.isFirst ? 12 : 0)}px;
  margin-bottom: ${props => (props.isLast ? 21 : 12)}px;
  position: relative;
  height: 74px;
`;

export const ChatAvatarContainer = styled.View`
  width: 66px;
  height: 66px;
  border-radius: 33px;
  background-color: ${colors.grey};
  position: relative;
`;

export const ChatAvatar = styled.Image`
  width: 66px;
  height: 66px;
  border-radius: 33px;
  align-self: center;
`;

export const ChatBadge = styled.View`
  position: absolute;
  bottom: 3px;
  right: 0;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background-color: ${colors.mustard};
  align-items: center;
  justify-content: center;
`;

export const ChatBadgeText = styled.Text`
  font-family: ${fonts.robotoBold};
  font-size: ${fonts.fontSize10};
  color: ${colors.white};
`;

export const ChatInfoContainer = styled.View`
  margin-left: 12px;
  flex: 1;
`;

export const ChatTitle = styled.Text`
  font-family: ${fonts.robotoMedium};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  line-height: 21px;
`;

export const ChatLastMessageContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const ChatText = styled.Text`
  font-family: ${fonts.robotoRegular};
  font-size: ${fonts.fontSize12};
  color: ${colors.grey};
  line-height: 14px;
`;

export const ChatDeleteContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 74px;
`;

export const ChatDeleteContent = styled.View`
  align-items: center;
  justify-content: center;
  padding-right: 30px;
  /* background-color: green; */
  /* width: 110px; */
  /* height: 100%; */
`;

export const ChatDeleteText = styled.Text`
  font-family: ${fonts.robotoRegular};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
`;
