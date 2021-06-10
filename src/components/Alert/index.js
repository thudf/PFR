/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

import {colors, fonts} from '../../global';

const Alert = ({
  showAlert,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  return (
    <AwesomeAlert
      overlayStyle={{
        backgroundColor: colors.darkGrey,
        opacity: 0.6,
      }}
      contentContainerStyle={{
        backgroundColor: colors.white,
      }}
      contentStyle={{
        paddingTop: 0,
        paddingBottom: 15,
        paddingLeft: 30,
        paddingRight: 30,
        width: '100%',
        alignItems: 'center',
      }}
      show={showAlert}
      showProgress={false}
      title={title}
      titleStyle={{
        fontFamily: fonts.robotoBold,
        fontSize: 24,
        color: colors.coral,
      }}
      message={message}
      messageStyle={{
        fontFamily: fonts.robotoMedium,
        fontSize: 16,
        color: colors.grey,
      }}
      closeOnTouchOutside={false}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={true}
      confirmButtonTextStyle={{
        fontFamily: fonts.robotoRegular,
        fontSize: 14,
        color: colors.white,
      }}
      confirmText={confirmText}
      confirmButtonColor={colors.grey}
      onConfirmPressed={() => {
        onConfirm();
      }}
      cancelButtonTextStyle={{
        fontFamily: fonts.robotoRegular,
        fontSize: 14,
        color: colors.white,
      }}
      cancelText={cancelText}
      cancelButtonColor={colors.coral}
      onCancelPressed={() => onCancel()}
    />
  );
};

export default Alert;
