/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SvgXml} from 'react-native-svg';

import clipboard from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/white/clipboard.svg';

import {Container, ButtonText} from './styles';

const Button = ({
  children,
  icon,
  active = true,
  buttonColor,
  textColor,
  ...rest
}) => {
  return (
    <Container active={active} buttonColor={buttonColor} {...rest}>
      <SvgXml style={{marginRight: 7}} xml={clipboard} width={17} height={17} />
      <ButtonText textColor={textColor}>{children}</ButtonText>
    </Container>
  );
};

export default Button;
