/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../global';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';

import {Container, Scroll, MainText, Title, FormView} from './styles';

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido.').required('E-mail inválido.'),
});

const RecoverPassword = () => {
  const navigation = useNavigation();

  const [errors, setErrors] = useState({
    email: null,
  });
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSignIn = useCallback(
    async data => {
      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        const newData = {
          email: data.email,
        };

        await api.post('/recover', newData);

        setLoading(false);
        navigation.navigate('CheckEmail', {email: data.email});
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          let newErrors = {...errors};
          error.inner.forEach(err => {
            const {path, message} = err;
            newErrors[path] = message;
          });

          setErrors(newErrors);
        } else {
          console.log(error);
          console.log('error: ', error?.response?.data?.error);
          setShowAlert(true);
        }

        setLoading(false);
      }
    },
    [errors, navigation],
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
            justifyContent: 'center',
          }}>
          <Title style={{marginTop: 52}}>Recuperar senha</Title>
          <MainText>
            Entre com o e-mail vinculado e enviaremos as instruções para que
            você possa recuperar sua senha
          </MainText>
          <Formik initialValues={{email: ''}} onSubmit={handleSignIn}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <FormView>
                <Input
                  name="email"
                  icon="mail"
                  placeholder={'E-mail'}
                  label={'E-mail'}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={errors.email}
                  keyboardType="email-address"
                  returnKeyType="send"
                  onSubmitEditing={() => handleSignIn(values)}
                />
                <Button
                  style={{marginTop: 32, marginBottom: 52}}
                  buttonColor={colors.mustard}
                  textColor={colors.white}
                  onPress={() => handleSignIn(values)}>
                  Enviar instruções
                </Button>
              </FormView>
            )}
          </Formik>
        </Scroll>
      </KeyboardAvoidingView>
      <LoadingModal visible={loading} />
      <CustomAlert
        visible={showAlert}
        title={'Ocorreu um erro'}
        message={'Não foi possível enviar o código. Deseja tentar novamente?'}
        confirmButtonText={'Sim'}
        onConfirm={() => {
          setShowAlert(false);
        }}
        cancelButtonText={'Não'}
        onCancel={() => {
          setShowAlert(false);
          navigation.navigate('SignIn');
        }}
        cancelable
        onDismiss={() => setShowAlert(false)}
      />
    </Container>
  );
};

export default RecoverPassword;
