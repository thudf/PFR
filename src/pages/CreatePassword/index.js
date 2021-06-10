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
import Checkbox from '../../components/CheckBox';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/Alert';

import {
  Container,
  Scroll,
  Title,
  FormView,
  LGPDText,
  LinkedText,
} from './styles';
import {TouchableWithoutFeedback, View} from 'react-native';

const schema = Yup.object().shape({
  newPassword: Yup.string().required('Por favor, digite uma senha válida.'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('newPassword'), null],
      'Por favor, digite uma senha válida.',
    )
    .required('Por favor, digite uma senha válida.'),
});

const CreatePassword = ({route}) => {
  const {accountData} = route.params;
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [LgpdChecked, setLgpdChecked] = useState(true);
  const [errors, setErrors] = useState({
    newPassword: null,
    confirmPassword: null,
  });
  const [loading, setLoading] = useState(false);

  const handleSignIn = useCallback(
    async data => {
      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        const newAccount = {
          name: accountData.nome,
          email: accountData.email,
          phone: accountData.fone,
          genrer: accountData.sexo,
          city: accountData.cidade,
          state: accountData.estado,
          password: data.newPassword,
          type: 'client',
        };

        setLoading(true);

        const response = await api.post('/users', newAccount);

        console.log('response: ', response);

        navigation.navigate('CreateAccountSuccess');
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
    [errors, accountData, navigation],
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
          <Title style={{marginTop: 152}}>Informe</Title>
          <Title>uma senha</Title>
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
                />
                <Checkbox onChange={value => setLgpdChecked(value)} />
                <View style={{width: '90%', marginLeft: 26, marginTop: 6}}>
                  <LGPDText>
                    Clicando em finalizar, você concorda com os nossos{' '}
                    <TouchableWithoutFeedback
                      onPress={() => console.log('teste')}>
                      <LinkedText>termos de uso</LinkedText>
                    </TouchableWithoutFeedback>{' '}
                    e com a nossa política da{' '}
                    <TouchableWithoutFeedback
                      onPress={() => console.log('teste2')}>
                      <LinkedText>Lei Geral de Proteção de dados.</LinkedText>
                    </TouchableWithoutFeedback>
                  </LGPDText>
                </View>
                <Button
                  style={{marginTop: 70}}
                  buttonColor={colors.mustard}
                  textColor={colors.white}
                  type="avançar"
                  active={LgpdChecked}
                  onPress={() => LgpdChecked && handleSignIn(values)}>
                  Avançar
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
        message={'Não foi possível criar sua conta!'}
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

export default CreatePassword;
