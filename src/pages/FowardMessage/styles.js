import styled, {css} from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.black};
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

export const ChatTabsContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ChatTab = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.softGrey};

  ${props =>
    props.active &&
    css`
      margin-bottom: 0;
      border-bottom-width: 4px;
      border-bottom-color: ${colors.mustard};
    `}
`;

export const ChatTabButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 12px;
`;

export const ChatTabTitle = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${props => (props.active ? colors.white : colors.grey)};
`;

export const FloatButton = styled(RectButton)`
  width: 78px;
  height: 78px;
  border-radius: 39px;
  position: absolute;
  right: 15px;
  bottom: 15px;
  background-color: ${colors.mustard};
  z-index: 999;
  align-items: center;
  justify-content: center;
`;
