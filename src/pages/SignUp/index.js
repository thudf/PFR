/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
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

import {Container, Scroll, Title} from './styles';

const schema = Yup.object().shape({
  username: Yup.string().required('Nome de usuário inválido.'),
  email: Yup.string().email('E-mail inválido.').required('E-mail inválido.'),
  password: Yup.string().required('Senha inválida.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senha inválida.')
    .required('Senha inválida.'),
});

const SignUp = () => {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialUserName, setInitialUserName] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [initialPassword, setInitialPassword] = useState('');
  const [initialConfirmPassword, setInitialConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  useEffect(() => {
    setInitialUserName('');
    setInitialEmail('');
    setInitialPassword('');
    setInitialConfirmPassword('');
  }, []);

  const handleSignIn = useCallback(
    async data => {
      setLoading(true);
      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.get('/core', data);

        console.log('response: ', response);

        setLoading(false);
        navigation.navigate('CreateAccountSuccess');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          let newErrors = {...errors};
          error.inner.forEach(err => {
            const {path, message} = err;
            newErrors[path] = message;
          });

          setErrors(newErrors);
        } else {
          console.log('error: ', error);
          setShowAlert(true);
        }

        setLoading(false);
      }
    },
    [errors, navigation],
  );

  const handleUserNameBlur = useCallback(
    async value => {
      const userNameSchema = Yup.object().shape({
        username: Yup.string().required('Nome de usuário inválido.'),
      });

      const data = {
        username: value,
      };

      try {
        await userNameSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          username: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            username: message,
          });
        });
      }
    },
    [errors],
  );

  const handleEmailBlur = useCallback(
    async value => {
      const emailSchema = Yup.object().shape({
        email: Yup.string()
          .email('E-mail inválido.')
          .required('E-mail inválido.'),
      });

      const data = {
        email: value,
      };

      try {
        await emailSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          email: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            email: message,
          });
        });
      }
    },
    [errors],
  );

  const handlePasswordBlur = useCallback(
    async value => {
      const passwordSchema = Yup.object().shape({
        password: Yup.string().required('Senha inválida.'),
      });

      const data = {
        password: value,
      };

      try {
        await passwordSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          password: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            password: message,
          });
        });
      }
    },
    [errors],
  );

  const handleConfirmPasswordBlur = useCallback(
    async value => {
      console.log('value: ', value);
      const confirmPasswordSchema = Yup.object().shape({
        confirmPassword: Yup.string()
          .oneOf([value.password], 'Senha inválida.')
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
          }}>
          <Title style={{marginTop: 52}}>Preencha as</Title>
          <Title>informações da sua</Title>
          <Title>conta</Title>

          <Formik
            initialValues={{
              username: initialUserName,
              email: initialEmail,
              password: initialPassword,
              confirmPassword: initialConfirmPassword,
            }}
            validationSchema={schema}
            onSubmit={handleSignIn}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <>
                <Input
                  name="user"
                  icon="info"
                  placeholder={'Nome de usuário'}
                  label={'Nome de usuário'}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  handleBlur={() => handleUserNameBlur(values.username)}
                  value={values.username}
                  error={errors.username}
                />
                <Input
                  name="email"
                  icon="mail"
                  placeholder={'E-mail'}
                  label={'E-mail'}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  handleBlur={() => handleEmailBlur(values.email)}
                  value={values.email}
                  error={errors.email}
                  keyboardType="email-address"
                />
                <Input
                  name="password"
                  icon="lock"
                  placeholder={'Senha'}
                  label={'Senha'}
                  password
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  handleBlur={() => handlePasswordBlur(values.password)}
                  value={values.password}
                  error={errors.password}
                />
                <Input
                  name="confirmPassword"
                  icon="lock"
                  placeholder={'Confirme a Senha'}
                  label={'Confirme a Senha'}
                  password
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  handleBlur={() => handleConfirmPasswordBlur(values)}
                  value={values.confirmPassword}
                  returnKeyType="send"
                  onSubmitEditing={() => handleSignIn(values)}
                  error={errors.confirmPassword}
                />
                <Button
                  style={{marginTop: 25}}
                  buttonColor={colors.mustard}
                  textColor={colors.white}
                  type="avançar"
                  active={!loading}
                  onPress={() => !loading && handleSignIn(values)}>
                  Avançar
                </Button>
              </>
            )}
          </Formik>
        </Scroll>
      </KeyboardAvoidingView>
      <LoadingModal visible={loading} />
      <CustomAlert
        visible={showAlert}
        title={'Ocorreu um erro'}
        message={'Não foi possível criar sua conta. Deseja tentar novamente?'}
        confirmButtonText={'Sim'}
        onConfirm={() => {
          setShowAlert(false);
        }}
        cancelButtonText={'Não'}
        onCancel={() => navigation.navigate('SignIn')}
        cancelable={true}
        onDismiss={() => {
          setShowAlert(false);
        }}
      />
    </Container>
  );
};

export default SignUp;
