import styled, {css} from 'styled-components/native';

import {colors, fonts} from '../../global';

export const ModalAlert = styled.View`
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: transparent;
`;

export const ModalAlertClose = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(29, 30, 34, 0.7);
`;

export const AlertContainer = styled.View`
  width: 90%;
  background-color: ${colors.white};
  border-radius: 4px;
  padding-top: 20px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const AlertTitleContainer = styled.View`
  flex-direction: row;
  width: 90%;
  margin-bottom: 10px;
  align-items: center;
  justify-content: ${props =>
    props.textAlign === 'left' ? 'flex-start' : 'center'};
`;

export const AlertTitle = styled.Text`
  font-family: ${fonts.robotoMedium};
  font-size: ${fonts.fontSize24};
  color: ${colors.black};
`;

export const AlertMessageContainer = styled.View`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: ${props =>
    props.textAlign === 'left' ? 'flex-start' : 'center'};
`;

export const AlertMessage = styled.Text`
  font-family: ${fonts.robotoLight};
  font-size: ${fonts.fontSize18};
  color: ${colors.black};
  text-align: center;
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

  ${props =>
    props.hasBorder &&
    css`
      border-right-color: ${colors.lightGrey};
      border-right-width: 1px;
    `};
`;

export const AlertCommandText = styled.Text`
  font-family: ${fonts.robotoMedium};
  font-size: ${fonts.fontSize16};
  color: ${props => (props.cancelButton ? colors.coral : colors.black)};
`;
