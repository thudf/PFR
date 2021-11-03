import React from 'react';
import {SvgXml} from 'react-native-svg';

import camera from '../../../../assets/carolinaBandeiraIcons/IconesAuxiliares/camera.svg';
import warn from '../../../../assets/carolinaBandeiraIcons/IconesAuxiliares/warn.svg';

import {Container, ButtonText, Header, Main, Footer} from './styles';

const HomeButton = ({size, children, ...rest}) => {
  return (
    <Container size={size} {...rest}>
      <Header />
      <Main>
        <SvgXml xml={camera} width={75} height={75} />
      </Main>
      <Footer>
        <ButtonText>{children}</ButtonText>
      </Footer>
    </Container>
  );
};

export default HomeButton;
