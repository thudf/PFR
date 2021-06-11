/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../global';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';

import {useAuth} from '../../hooks/Auth';

import {Container, Scroll, Title, FormView} from './styles';

const schema = Yup.object().shape({
  newPassword: Yup.string().required('Senha inválida.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Senha inválida.')
    .required('Senha inválida.'),
});

const ChangePassword = ({route}) => {
  const {password: oldPassword} = route.params.userData;
  const navigation = useNavigation();
  const {user, updatePassword, updatePasswordError, clearUpdatePasswordError} =
    useAuth();

  const [showAlert, setShowAlert] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: null,
    confirmPassword: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (oldPassword === user.password) {
      console.log('');
    } else {
      navigation.navigate('ChangePasswordSuccess');
    }
  }, [user, oldPassword, navigation]);

  useEffect(() => {
    if (updatePasswordError) {
      setLoading(false);
      setShowAlert(true);
      clearUpdatePasswordError();
    }
  }, [updatePasswordError, clearUpdatePasswordError]);

  const handleSignIn = useCallback(
    async data => {
      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        updatePassword({
          ...user,
          password: data.newPassword,
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          let newErrors = {...errors};
          error.inner.forEach(err => {
            const {path, message} = err;
            newErrors[path] = message;
          });

          setErrors(newErrors);
        }

        setLoading(false);
      }
    },
    [errors, updatePassword, user],
  );

  const handleNewPasswordBlur = useCallback(
    async value => {
      const newPasswordSchema = Yup.object().shape({
        newPassword: Yup.string().required('Senha inválida.'),
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
          .oneOf([value.newPassword], 'Senha inválida.')
          .required('Senha inválida.'),
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
            justifyContent: 'center',
          }}>
          <Title style={{marginTop: 52}}>Informe uma</Title>
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
                  placeholder={'Confirmar senha'}
                  label={'Confirmar senha'}
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
                  style={{marginTop: 70, marginBottom: 52}}
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
        visible={showAlert}
        title={'Ocorreu um erro'}
        message={
          'Não foi possível atualizar sua senha. Deseja tentar novamente?'
        }
        confirmButtonText={'Sim'}
        onConfirm={() => {
          setShowAlert(false);
        }}
        cancelButtonText={'Não'}
        onCancel={() => {
          setShowAlert(false);
          navigation.navigate('Perfil');
        }}
        cancelable
        onDismiss={() => setShowAlert(false)}
      />
    </Container>
  );
};

export default ChangePassword;
