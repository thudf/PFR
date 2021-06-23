/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk-next';

import {useAuth} from '../../hooks/Auth';
import {colors} from '../../global';

import Input from '../../components/Input';
import Button from '../../components/Button';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';

import logoImg from '../../assets/logo.png';
import ou from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/ou.svg';

import {
  Container,
  Content,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
  CreateText,
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
      console.log('teste');
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

  // const initUser = useCallback(faceToken => {
  //   fetch(
  //     'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' +
  //       faceToken,
  //   )
  //     .then(response => {
  //       response.json().then(json => {
  //         console.log('json: ', json);

  //         const ID = json.id;
  //         console.log('ID ' + ID);

  //         const EM = json.email;
  //         console.log('Email ' + EM);

  //         const FN = json.first_name;
  //         console.log('First Name ' + FN);
  //       });
  //     })
  //     .catch(() => {
  //       console.log('ERROR GETTING DATA FROM FACEBOOK');
  //     });
  // }, []);

  // const handleFacebookLogin = useCallback(() => {
  //   LoginManager.logInWithPermissions(['public_profile', 'email']).then(
  //     function (result) {
  //       if (result.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         console.log(
  //           'Login success with permissions: ' +
  //             result.grantedPermissions.toString(),
  //         );
  //         AccessToken.getCurrentAccessToken().then(data => {
  //           console.log('data: ', data);
  //           initUser(data.accessToken);
  //         });
  //       }
  //     },
  //     function (error) {
  //       console.log('Login fail with error: ' + error);
  //     },
  //   );
  // }, [initUser]);

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
              <Image
                style={{marginTop: 80, marginBottom: 80}}
                source={logoImg}
              />
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
                    <ForgotPassword
                      onPress={() => navigation.navigate('RecoverPassword')}>
                      <ForgotPasswordText>Esqueci a senha</ForgotPasswordText>
                    </ForgotPassword>
                    <Button
                      buttonColor={colors.mustard}
                      textColor={colors.white}
                      onPress={() => handleSignIn(values)}>
                      Entrar
                    </Button>
                    <CreateAccount
                      onPress={() => navigation.navigate('SignUp')}>
                      <CreateAccountText>Não tem uma conta?</CreateAccountText>
                      <CreateText>Crie agora.</CreateText>
                    </CreateAccount>
                  </>
                )}
              </Formik>
              <View
                style={{
                  width: '100%',
                  marginTop: 8,
                  alignItems: 'center',
                }}>
                <SvgXml xml={ou} width={35} height={35} />
                <Button
                  type="insta"
                  buttonColor={colors.darkGrey}
                  textColor={colors.white}
                  style={{marginTop: 20}}>
                  Seguir com Instagram
                </Button>
                <Button
                  type="face"
                  buttonColor={colors.darkGrey}
                  textColor={colors.white}
                  style={{marginTop: 20, marginBottom: 50}}>
                  {/* onPress={() => handleFacebookLogin()}> */}
                  Seguir com Facebook
                </Button>
              </View>
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
