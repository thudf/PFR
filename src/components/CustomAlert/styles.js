import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

export const ModalAlert = styled.View`
  height: 100%;
  width: 100%;
  background-color: transparent;
  position: relative;
`;

export const ModalAlertClose = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
  background-color: rgba(29, 30, 34, 0.7);
`;

export const AlertContainer = styled.View`
  position: absolute;
  top: ${props => (props.pickerTop ? props.pickerTop : 40)}%;
  left: 5%;
  width: 90%;
  background-color: ${colors.white};
  border-radius: 4px;
  padding-top: 20px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const AlertCommandsContainer = styled.View`
  flex-direction: row;
  width: 100%;
  border-top-color: ${colors.lightGrey};
  border-top-width: 1px;
  margin-top: 20px;
  align-items: center;
  justify-content: ${props => (props.mutiple ? 'space-between' : 'center')};
`;

export const AlertCommandsButton = styled.TouchableOpacity`
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: center;
`;

export const AlertCommandText = styled.Text`
  font-family: ${fonts.robotoMedium};
  font-size: ${fonts.fontSize16};
  color: ${props => (props.cancelButton ? colors.coral : colors.black)};
`;
