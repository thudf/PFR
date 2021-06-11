import React from 'react';
import {Modal, Text} from 'react-native';
// import {SvgXml} from 'react-native-svg';

// import {colors} from '../../global';

import {
  ModalAlert,
  ModalAlertClose,
  AlertContainer,
  AlertTitleContainer,
  AlertTitle,
  AlertMessageContainer,
  AlertMessage,
  AlertCommandsContainer,
  AlertCommandsButton,
  AlertCommandText,
} from './styles';

const CustomAlert = ({
  visible,
  icon,
  title,
  titleAlign,
  message,
  messageAlign,
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
            }
          }}
        />
        <AlertContainer>
          {title && (
            <AlertTitleContainer textAlign={titleAlign}>
              <AlertTitle>{title}</AlertTitle>
            </AlertTitleContainer>
          )}

          {message && (
            <AlertMessageContainer textAlign={messageAlign}>
              <AlertMessage>{message}</AlertMessage>
            </AlertMessageContainer>
          )}

          <AlertCommandsContainer
            multiple={cancelButtonText && confirmButtonText}>
            {confirmButtonText && (
              <AlertCommandsButton
                hasBorder={cancelButtonText}
                onPress={() => onConfirm()}>
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
