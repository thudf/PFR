/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, ScrollView, Image} from 'react-native';

import {useAuth} from '../../hooks/Auth';
import {colors} from '../../global';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Content,
  Row,
  CreateAccount,
  CreateAccountText,
  CreateText,
  Title,
} from './styles';

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido.').required('E-mail inválido.'),
  password: Yup.string().required('Senha inválida.'),
});

const SignIn = () => {
  const {signIn} = useAuth();
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialEmail, setInitialEmail] = useState('');
  const [initialPassword, setInitialPassword] = useState('');
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    setInitialEmail('');
    setInitialPassword('');
  }, []);

  const handleSignIn = useCallback(
    async data => {
      setLoading(true);
      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
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
    [signIn, errors],
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

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <Container>
        <ScrollView
          style={{width: '100%'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <Content>
            <>
              <Title>PFRec</Title>
              {/* <Image
                style={{marginTop: 15, width: '80%'}}
                source={logoImg}
                resizeMode="contain"
              /> */}
              <Formik
                initialValues={{email: initialEmail, password: initialPassword}}
                validationSchema={schema}
                onSubmit={handleSignIn}>
                {({handleChange, handleBlur, handleSubmit, values}) => (
                  <>
                    <Input
                      name="email"
                      icon="mail"
                      placeholder={'E-mail'}
                      label={'E-mail'}
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={handleChange('email')}
                      onBlur={handleChange('email')}
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
                      onBlur={handleChange('password')}
                      handleBlur={() => handlePasswordBlur(values.password)}
                      value={values.password}
                      returnKeyType="send"
                      onSubmitEditing={() => handleSignIn(values)}
                      error={errors.password}
                    />
                    <Button
                      style={{marginTop: 25}}
                      buttonColor={colors.mustard}
                      textColor={colors.white}
                      onPress={() => handleSignIn(values)}>
                      Entrar
                    </Button>

                    <Row>
                      <CreateAccount
                        onPress={() => navigation.navigate('SignUp')}>
                        <CreateAccountText>
                          Não tem uma conta?
                        </CreateAccountText>
                        <CreateText>Crie agora.</CreateText>
                      </CreateAccount>
                    </Row>
                  </>
                )}
              </Formik>
            </>
          </Content>
        </ScrollView>
        <LoadingModal visible={loading} />
        <CustomAlert
          visible={showAlert}
          title={'Ocorreu um erro'}
          message={'Não foi possível iniciar sua sessão. Tente novamente!'}
          confirmButtonText={'OK'}
          onConfirm={() => {
            setShowAlert(false);
          }}
          cancelable
          onDismiss={() => setShowAlert(false)}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
