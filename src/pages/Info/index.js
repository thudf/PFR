import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';

import logoImg from '../../assets/logo.png';
import face from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/face_contacts.svg';
import insta from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/insta_contacts.svg';
import linkedin from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/linkedin_contacts.svg';
import qualitare from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/qualitare.svg';

import {
  ContactText,
  Container,
  SocialMedias,
  Scroll,
  Logo,
  MadeBy,
  MainText,
  Title,
} from './styles';

const Info = () => {
  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <Logo source={logoImg} />
        <Title>Sobre o Instituto</Title>
        <MainText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut.
          Aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit.
        </MainText>
        <Title style={{marginBottom: 15}}>Nossos canais</Title>
        <ContactText>+ 55 (83) 98151-0355</ContactText>
        <ContactText>institutocarolinabandeira@exemplo.com.br</ContactText>
        <ContactText>www.institutocarolinabandeira.com.br</ContactText>
        <SocialMedias>
          <TouchableOpacity style={{marginRight: 30}}>
            <SvgXml xml={insta} width={27} height={27} />
          </TouchableOpacity>
          <TouchableOpacity style={{marginRight: 30}}>
            <SvgXml xml={face} width={25} height={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgXml xml={linkedin} width={29} height={29} />
          </TouchableOpacity>
        </SocialMedias>
        <MadeBy>
          <SvgXml xml={qualitare} width={155} height={20} />
        </MadeBy>
      </Scroll>
    </Container>
  );
};

export default Info;
