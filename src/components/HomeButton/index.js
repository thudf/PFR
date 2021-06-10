import React from 'react';
import {SvgXml} from 'react-native-svg';

import equipe from '../../assets/carolinaBandeiraIcons/IconesPrincipais/icone-equipe.svg';
import unidades from '../../assets/carolinaBandeiraIcons/IconesPrincipais/icone-unidades.svg';
import patologias from '../../assets/carolinaBandeiraIcons/IconesPrincipais/icone-maca.svg';
import tratamentos from '../../assets/carolinaBandeiraIcons/IconesPrincipais/icone-tratamentos.svg';
import pacientes from '../../assets/carolinaBandeiraIcons/IconesPrincipais/icone-pacientes.svg';

import {Container, ButtonText, Header, Main, Footer} from './styles';

const HomeButton = ({icon, size, children, ...rest}) => {
  const icons = {
    equipe,
    unidades,
    patologias,
    tratamentos,
    pacientes,
  };

  return (
    <Container size={size} {...rest}>
      <Header />
      <Main>
        <SvgXml xml={icons[icon]} width={70} height={70} />
      </Main>
      <Footer>
        <ButtonText>{children}</ButtonText>
      </Footer>
    </Container>
  );
};

export default HomeButton;
