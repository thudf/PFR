/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {Linking} from 'react-native';
import {SvgXml} from 'react-native-svg';

import logoImg from '../../assets/logo.png';
import face from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/face_contacts.svg';
import insta from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/insta_contacts.svg';
import linkedin from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/linkedin_contacts.svg';
import qualitare from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/qualitare.svg';

import LoadingModal from '../../components/LoadingModal';

import api from '../../services/api';

import {
  ContactText,
  Container,
  SocialMedias,
  SocialMediaButton,
  Scroll,
  Logo,
  MadeBy,
  MainText,
  Title,
} from './styles';

const Info = () => {
  const [loading, setLoading] = useState(false);
  const [infos, setInfos] = useState({
    description: null,
    phone: null,
    email: null,
    site: null,
  });

  const getInfo = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('channel');
      console.log(response.data);

      const {data} = response;

      setInfos({
        description: data.description,
        phone: data.phone,
        email: data.email,
        site: data.site,
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getInfo();
  }, [getInfo]);

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <Logo source={logoImg} />
        <Title>Sobre o Instituto</Title>
        <MainText>{infos.description}</MainText>
        <Title>Nossos canais</Title>
        <ContactText>{infos.phone}</ContactText>
        <ContactText>{infos.email}</ContactText>
        <ContactText>{infos.site}</ContactText>
        <SocialMedias>
          <SocialMediaButton
            last={false}
            onPress={() =>
              Linking.openURL(
                'https://www.instagram.com/institutocarolinabandeira/?hl=pt',
              )
            }>
            <SvgXml xml={insta} width={27} height={27} />
          </SocialMediaButton>
          <SocialMediaButton
            last={false}
            onPress={() =>
              Linking.openURL(
                'https://www.facebook.com/institutocarolinabandeira/',
              )
            }>
            <SvgXml xml={face} width={25} height={25} />
          </SocialMediaButton>
          <SocialMediaButton
            last
            onPress={() =>
              Linking.openURL(
                'https://www.linkedin.com/company/instituto-carolina-bandeira/',
              )
            }>
            <SvgXml xml={linkedin} width={29} height={29} />
          </SocialMediaButton>
        </SocialMedias>
        <MadeBy>
          <SvgXml xml={qualitare} width={155} height={20} />
        </MadeBy>
      </Scroll>
      <LoadingModal visible={loading} />
    </Container>
  );
};

export default Info;
