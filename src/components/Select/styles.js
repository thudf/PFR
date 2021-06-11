import styled, {css} from 'styled-components/native';

import {colors, fonts} from '../../global';

export const Container = styled.View`
  width: ${props => (props.width ? props.width : '100%')};
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 12px;

  border-bottom-width: 1px;
  border-bottom-color: ${colors.grey};

  ${props =>
    props.isFocused &&
    css`
      border-bottom-color: ${colors.white};
    `};
  ${props =>
    props.error &&
    css`
      border-bottom-color: ${colors.grey};
    `};
`;

export const Label = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 24px;
`;

export const LabelText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize14};
  line-height: 24px;
  color: ${colors.softGrey};
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 20px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  margin-top: 0;
  margin-left: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-left: 0;
  padding-bottom: 0;

  ${props =>
    props.textAlign &&
    css`
      text-align: center;
    `};
`;

export const ErrorText = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize14};
  color: ${colors.coral};
`;

export const ModalPicker = styled.View`
  height: 100%;
  width: 100%;
  background-color: transparent;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const ModalPickerClose = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(29, 30, 34, 0.7);
`;

export const PickerContainer = styled.View`
  /* position: absolute;
  top: ${props => (props.pickerTop ? props.pickerTop : 40)}%;
  left: 5%; */
  width: 90%;
  background-color: ${colors.darkGrey};
  border-radius: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const PickerScroll = styled.ScrollView`
  min-height: 43px;
  max-height: 258px;
`;

export const PickerItem = styled.TouchableOpacity`
  width: 100%;
  height: 43px;
  background-color: ${props =>
    props.selected ? colors.grey : colors.darkGrey};
  align-items: flex-start;
  justify-content: center;
  padding-left: 10px;
`;

export const PickerItemLabel = styled.Text`
  font-family: ${fonts.robotoRegular};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  font-weight: 500;
`;
