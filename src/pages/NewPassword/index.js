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
import CustomAlert from '../../components/Alert';

import {Container, Scroll, Title, FormView} from './styles';

const schema = Yup.object().shape({
  newPassword: Yup.string().required('Por favor, digite uma senha válida.'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('newPassword'), null],
      'Por favor, digite uma senha válida.',
    )
    .required('Por favor, digite uma senha válida.'),
});

const NewPassword = ({route}) => {
  const {code, email} = route.params;
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: null,
    confirmPassword: null,
  });

  const handleSignIn = useCallback(
    async data => {
      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        const newData = {
          code,
          email,
          password: data.newPassword,
        };

        setLoading(true);

        const response = await api.put('/confirm-recover', newData);

        console.log('response: ', response);

        navigation.navigate('NewPasswordSuccess');
        setLoading(false);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          let newErrors = {...errors};
          error.inner.forEach(err => {
            const {path, message} = err;
            newErrors[path] = message;
          });

          setErrors(newErrors);
        } else {
          console.log('error: ', error?.response?.data?.error);
          setShowAlert(true);
        }

        setLoading(false);
      }
    },
    [errors, navigation, code, email],
  );

  const handleNewPasswordBlur = useCallback(
    async value => {
      const newPasswordSchema = Yup.object().shape({
        newPassword: Yup.string().required(
          'Por favor, digite uma senha válida.',
        ),
      });

      const data = {
        newPassword: value,
      };

      try {
        await newPasswordSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          newPassword: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            newPassword: message,
          });
        });
      }
    },
    [errors],
  );

  const handleConfirmPasswordBlur = useCallback(
    async value => {
      const confirmPasswordSchema = Yup.object().shape({
        confirmPassword: Yup.string()
          .oneOf([value.newPassword], 'Por favor, digite uma senha válida.')
          .required('Por favor, digite uma senha válida.'),
      });

      const data = {
        confirmPassword: value.confirmPassword,
      };

      try {
        await confirmPasswordSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          confirmPassword: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            confirmPassword: message,
          });
        });
      }
    },
    [errors],
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
          <Title style={{marginTop: 152}}>Informe uma</Title>
          <Title>nova senha</Title>
          <Formik
            initialValues={{newPassword: '', confirmPassword: ''}}
            onSubmit={handleSignIn}>
            {({handleChange, handleBlur, values}) => (
              <FormView>
                <Input
                  name="newPassword"
                  icon="lock"
                  placeholder={'Senha'}
                  label={'Senha'}
                  password
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  handleBlur={() => handleNewPasswordBlur(values.newPassword)}
                  value={values.newPassword}
                  error={errors.newPassword}
                  keyboardType="default"
                />
                <Input
                  name="confirmPassword"
                  icon="lock"
                  placeholder={'Senha'}
                  label={'Senha'}
                  password
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  handleBlur={() => handleConfirmPasswordBlur(values)}
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  keyboardType="default"
                  returnKeyType="send"
                  onSubmitEditing={() => handleSignIn(values)}
                />
                <Button
                  style={{marginTop: 50}}
                  buttonColor={colors.mustard}
                  textColor={colors.white}
                  onPress={() => handleSignIn(values)}>
                  Confirmar
                </Button>
              </FormView>
            )}
          </Formik>
        </Scroll>
      </KeyboardAvoidingView>
      <LoadingModal visible={loading} />
      <CustomAlert
        showAlert={showAlert}
        title={'Ocorreu um erro'}
        message={'Não foi possível recuperar sua senha!'}
        confirmText={'Tentar novamente'}
        onConfirm={() => {
          setShowAlert(false);
        }}
        cancelText={'Cancelar'}
        onCancel={() => navigation.navigate('SignIn')}
      />
    </Container>
  );
};

export default NewPassword;
