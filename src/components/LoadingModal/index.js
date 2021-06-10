import React from 'react';
import {Modal, ActivityIndicator} from 'react-native';

import {colors} from '../../global';

import {LoadingContainer} from './styles';

const LoadingModal = ({visible}) => {
  return (
    <Modal
      presentationStyle="overFullScreen"
      transparent={true}
      visible={visible}
      animationType="none">
      <LoadingContainer>
        <ActivityIndicator size="large" color={colors.softGrey} />
      </LoadingContainer>
    </Modal>
  );
};

export default LoadingModal;
