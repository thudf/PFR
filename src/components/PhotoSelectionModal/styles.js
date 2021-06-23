import styled from 'styled-components/native';

import {colors, fonts} from '../../global';

export const ModalSelection = styled.Modal``;

export const ModalContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(29, 30, 34, 0.7);
  align-items: center;
  justify-content: center;
`;

export const ModalCard = styled.View`
  width: 90%;
  background-color: ${colors.darkGrey};
  border-radius: 4px;
`;

export const ModalTitle = styled.Text`
  font-family: ${fonts.robotoRegular};
  font-size: ${fonts.fontSize18};
  color: ${colors.white};
  font-weight: 500;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom-color: ${colors.grey};
  border-bottom-width: 1px;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
  align-items: center;
  justify-content: center;
  border-top-color: ${colors.grey};
  border-top-width: 1px;
`;

export const ModalOption = styled.TouchableOpacity`
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const ModalButtonText = styled.Text`
  font-family: ${fonts.robotoRegular};
  font-size: ${fonts.fontSize16};
  color: ${colors.white};
  font-weight: 500;
  text-align: center;
`;
