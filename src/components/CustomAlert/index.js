/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Modal, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';

import {colors} from '../../global';

import {
  ModalAlert,
  ModalAlertClose,
  AlertContainer,
  AlertCommandsContainer,
  AlertCommandsButton,
  AlertCommandText,
} from './styles';

const CustomAlert = ({
  visible,
  handleVisibleFalse,
  icon,
  title,
  message,
  cancelable = false,
  onCancel = () => console.log('cancel'),
  cancelButtonText,
  onConfirm = () => console.log('confirm'),
  confirmButtonText,
  onDismiss = () => console.log('dismiss'),
}) => {
  return (
    <Modal
      presentationStyle="overFullScreen"
      transparent={true}
      visible={visible}
      animationType="none">
      <ModalAlert>
        <ModalAlertClose
          activeOpacity={1}
          onPress={() => {
            if (cancelable) {
              onDismiss();
              handleVisibleFalse();
            }
          }}
        />
        <AlertContainer>
          {title && <Text>{title}</Text>}
          {message && <Text>{message}</Text>}
          <AlertCommandsContainer
            multiple={cancelButtonText && confirmButtonText}>
            {confirmButtonText && (
              <AlertCommandsButton onPress={() => onConfirm()}>
                <AlertCommandText cancelButton={false}>
                  {confirmButtonText}
                </AlertCommandText>
              </AlertCommandsButton>
            )}
            {cancelButtonText && (
              <AlertCommandsButton onPress={() => onCancel()}>
                <AlertCommandText cancelButton={true}>
                  {cancelButtonText}
                </AlertCommandText>
              </AlertCommandsButton>
            )}
          </AlertCommandsContainer>
        </AlertContainer>
      </ModalAlert>
    </Modal>
  );
};

export default CustomAlert;
