/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../global';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {Container, Scroll, Title, FormView} from './styles';

const schema = Yup.object().shape({
  code: Yup.string()
    .matches(/^[\S]{4}$/, 'Por favor, digite um código válido.')
    .required('Por favor, digite um código válido.'),
});

const SendCode = ({route}) => {
  const {email} = route.params;
  const navigation = useNavigation();

  const handleSignIn = useCallback(
    async data => {
      navigation.navigate('NewPassword', {code: data.code, email});
    },
    [navigation, email],
  );

  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1, width: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <Scroll
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}>
          <Title style={{marginTop: 152}}>Informe o</Title>
          <Title>código de verificação</Title>
          <Title>enviado para você.</Title>
          <Formik
            initialValues={{code: ''}}
            validationSchema={schema}
            onSubmit={handleSignIn}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <FormView>
                <Input
                  name="code"
                  placeholder={'Código'}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={handleChange('code')}
                  onBlur={handleBlur('code')}
                  textAlign={'center'}
                  value={values.code}
                  error={errors.code}
                  keyboardType="default"
                />
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
                  onPress={handleSubmit}>
                  Avançar
                </Button>
              </FormView>
            )}
          </Formik>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SendCode;
