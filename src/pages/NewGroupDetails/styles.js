import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

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

export const UserAvatarContainer = styled.View`
  margin-top: 32px;
  position: relative;
  width: 136px;
  height: 136px;
  border-radius: 68px;
  background-color: ${colors.lightGrey};
`;

export const GroupAvatar = styled.Image`
  width: 136px;
  height: 136px;
  border-radius: 68px;
  align-self: center;
`;

export const UserEmptyAvatar = styled.View`
  width: 136px;
  height: 136px;
  border-radius: 68px;
  background-color: ${colors.lightGrey};
  align-items: center;
  justify-content: center;
`;

export const EmptyWrap = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  text-align: center;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  position: absolute;
  bottom: -2px;
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
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const ContactsListTitle = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
`;

export const GroupContactsList = styled.FlatList`
  width: 100%;
  height: 72px;
  flex-grow: 0;
`;

export const SeparatorComponent = styled.View`
  width: 25px;
`;

export const SelectedContactAvatarContainer = styled.TouchableOpacity`
  width: 62px;
  height: 62px;
  border-radius: 31px;
  background-color: ${colors.grey};
  position: relative;
  margin-top: 5px;
`;

export const SelectedContactAvatar = styled.Image`
  width: 62px;
  height: 62px;
  border-radius: 31px;
  align-self: center;
`;

export const SelectedContactBadge = styled.View`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${colors.mustard};
  align-items: center;
  justify-content: center;
`;

export const FloatButton = styled(RectButton)`
  width: 78px;
  height: 78px;
  border-radius: 39px;
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: ${colors.mustard};
  z-index: 999;
  align-items: center;
  justify-content: center;
`;
