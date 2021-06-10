/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../global';

import Button from '../../components/Button';

import line from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/line.svg';

import {Container, Scroll, MainText, Title, Row} from './styles';

const CheckEmail = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
        }}>
        <Title style={{marginTop: 152}}>Verifique seu e-mail</Title>
        <MainText>
          Enviamos instruções para o e-mail informado como proceder para
          recuperar sua senha. Não esqueça de verificar sua caixa de spam.
        </MainText>
        <Row>
          <SvgXml xml={line} />
        </Row>
        <Button
          style={{marginTop: 50}}
          buttonColor={colors.darkGrey}
          textColor={colors.white}
          onPress={() => navigation.navigate('RecoverPassword')}>
          Não recebi o e-mail
        </Button>
        <Button
          style={{marginTop: 15}}
          buttonColor={colors.mustard}
          textColor={colors.white}
          type="avançar"
          onPress={() => navigation.navigate('SendCode', {email})}>
          Avançar
        </Button>
      </Scroll>
    </Container>
  );
};

export default CheckEmail;
