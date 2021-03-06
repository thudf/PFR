/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../global';

import Button from '../../components/Button';

import success from '../../assets/carolinaBandeiraIcons/IconesPrincipais/icone-confirmado.svg';

import {Container, Scroll, Title, Row} from './styles';

const CheckEmail = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <SvgXml xml={success} width={70} height={70} />
        <Title style={{marginTop: 25}}>Sua conta foi</Title>
        <Title>criada.</Title>
        <Row>
          <Button
            style={{marginTop: 80}}
            buttonColor={colors.mustard}
            textColor={colors.white}
            onPress={() => navigation.navigate('SignIn')}>
            Fazer login
          </Button>
        </Row>
      </Scroll>
    </Container>
  );
};

export default CheckEmail;
