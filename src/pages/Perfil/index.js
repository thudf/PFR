/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, Alert} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../global';

import api from '../../services/api';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/Alert';

import editAvatar from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/bt_editar_avatar.svg';
import userIcon from '../../assets/carolinaBandeiraIcons/IconesPrincipais/icone-equipe.svg';

import {useAuth} from '../../hooks/Auth';

import {
  Container,
  Scroll,
  FormView,
  UserAvatar,
  UserAvatarButton,
  UserAvatarContainer,
  UserEmptyAvatar,
  Row,
} from './styles';

const schema = Yup.object().shape({
  fone: Yup.string()
    .matches(
      /^\+[5-5]{2} \([1-9]{2}\) [0-9]{5}-[0-9]{4}$/,
      'Por favor, digite um telefone válido.',
    )
    .required('Por favor, digite um telefone válido.'),
  cpf: Yup.string()
    .matches(
      /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/,
      'Por favor, digite um CPF válido.',
    )
    .required('Por favor, digite um CPF válido.'),
  cidade: Yup.string().required('Por favor, digite uma cidade válida.'),
  estado: Yup.string().required('Por favor, selecione o estado.'),
});

const SignUp = () => {
  const {user, updateUser, updateUserError, clearUpdateUserError, signOut} =
    useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [estadoListOptions] = useState([
    {
      value: 'AC',
      label: 'Acre (AC)',
    },
    {
      value: 'AL',
      label: 'Alagoas (AL)',
    },
    {
      value: 'AM',
      label: 'Amazonas (AM)',
    },
    {
      value: 'AP',
      label: 'Amapá (AP)',
    },
    {
      value: 'BA',
      label: 'Bahia (BA)',
    },
    {
      value: 'CE',
      label: 'Ceará (CE)',
    },
    {
      value: 'DF',
      label: 'Distrito Federal (DF)',
    },
    {
      value: 'ES',
      label: 'Espírito Santo (ES)',
    },
    {
      value: 'GO',
      label: 'Goiás (GO)',
    },
    {
      value: 'MA',
      label: 'Maranhão (MA)',
    },
    {
      value: 'MG',
      label: 'Minas Gerais (MG)',
    },
    {
      value: 'MT',
      label: 'Mato Grosso (MT)',
    },
    {
      value: 'MS',
      label: 'Mato Grosso do Sul (MS)',
    },
    {
      value: 'PA',
      label: 'Pará (PA)',
    },
    {
      value: 'PB',
      label: 'Paraíba (PB)',
    },
    {
      value: 'PE',
      label: 'Pernambuco (PE)',
    },
    {
      value: 'PI',
      label: 'Piauí (PI)',
    },
    {
      value: 'PR',
      label: 'Paraná (PR)',
    },
    {
      value: 'RJ',
      label: 'Rio de Janeiro (RJ)',
    },
    {
      value: 'RN',
      label: 'Rio Grande do Norte (RN)',
    },
    {
      value: 'RO',
      label: 'Rondônia (RO)',
    },
    {
      value: 'RR',
      label: 'Roraima (RR)',
    },
    {
      value: 'RS',
      label: 'Rio Grande do Sul (RS)',
    },
    {
      value: 'SC',
      label: 'Santa Catarina (SC)',
    },
    {
      value: 'SE',
      label: 'Sergipe (SE)',
    },
    {
      value: 'SP',
      label: 'São Paulo (SP)',
    },
    {
      value: 'TO',
      label: 'Tocantins (TO)',
    },
  ]);
  const [estado, setEstado] = useState('');
  const [errors, setErrors] = useState({
    fone: null,
    cidade: null,
    estado: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userAvatar, setUserAvatar] = useState(false);

  useEffect(() => {
    setEstado(user.state);
    setUserAvatar(!!user.avatar);
    setIsEditing(false);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setErrors({
      fone: null,
      cidade: null,
      estado: null,
    });

    if (!isEditing) {
      setShowAlert(false);
    }
  }, [isEditing]);

  useEffect(() => {
    if (updateUserError) {
      setLoading(false);
      setShowAlert(true);
      clearUpdateUserError();
    }
  }, [updateUserError, clearUpdateUserError]);

  const handleSignUp = useCallback(
    async data => {
      const isEqual =
        data.fone === user.phone &&
        data.cpf === user.document &&
        data.cidade === user.city &&
        estado === user.state;

      if (isEqual) {
        setIsEditing(false);
      }

      if (!isEqual) {
        setLoading(true);
        try {
          data.estado = estado;
          await schema.validate(data, {
            abortEarly: false,
          });

          updateUser({
            ...user,
            phone: data.fone,
            document: data.cpf,
            city: data.cidade,
            state: data.estado,
          });
        } catch (error) {
          let newErrors = {...errors};
          error.inner.forEach(err => {
            const {path, message} = err;
            newErrors[path] = message;
          });

          setErrors(newErrors);
          setLoading(false);
        }
      }
    },
    [errors, estado, user, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert('Erro ao atualizar seu avatar!');
        return;
      }
      const {type, uri, fileName} = response.assets[0];

      const data = new FormData();

      data.append('file', {
        type,
        name: fileName,
        uri,
      });

      api
        .post('/upload', data)
        .then(apiResponse => {
          console.log(apiResponse.data);
          const updatedUser = {
            ...user,
            avatar: apiResponse.data,
          };

          updateUser(updatedUser);
        })
        .catch(error => console.log(error));
    });
  }, [user, updateUser]);

  const handleFoneBlur = useCallback(
    async value => {
      const foneSchema = Yup.object().shape({
        fone: Yup.string()
          .matches(
            /^\+[5-5]{2} \([1-9]{2}\) [0-9]{5}-[0-9]{4}$/,
            'Por favor, digite um telefone válido.',
          )
          .required('Por favor, digite um telefone válido.'),
      });

      const data = {
        fone: value,
      };

      try {
        await foneSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          fone: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            fone: message,
          });
        });
      }
    },
    [errors],
  );

  const handleCityBlur = useCallback(
    async value => {
      const citySchema = Yup.object().shape({
        cidade: Yup.string().required('Por favor, digite uma cidade válida.'),
      });

      const data = {
        cidade: value,
      };

      try {
        await citySchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          cidade: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            cidade: message,
          });
        });
      }
    },
    [errors],
  );

  const handleStateBlur = useCallback(
    async value => {
      const stateSchema = Yup.object().shape({
        estado: Yup.string().required('Por favor, selecione o estado.'),
      });

      const data = {
        estado: value,
      };

      try {
        await stateSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          estado: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            estado: message,
          });
        });
      }
    },
    [errors],
  );

  const handleCPFBlur = useCallback(
    async value => {
      const cpfSchema = Yup.object().shape({
        cpf: Yup.string()
          .matches(
            /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/,
            'Por favor, digite um CPF válido.',
          )
          .required('Por favor, digite um CPF válido.'),
      });

      const data = {
        cpf: value,
      };

      try {
        await cpfSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          cpf: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            cpf: message,
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
          <UserAvatarContainer>
            {userAvatar && <UserAvatar source={{uri: user.avatar}} />}
            {!userAvatar && (
              <UserEmptyAvatar>
                <SvgXml xml={userIcon} width={64} height={64} />
              </UserEmptyAvatar>
            )}
            <UserAvatarButton
              activeOpacity={0.6}
              onPress={() => handleUpdateAvatar()}>
              <SvgXml xml={editAvatar} width={32} height={32} />
            </UserAvatarButton>
          </UserAvatarContainer>
          <FormView>
            <Input
              name="nome"
              // label={'Nome'}
              value={user.name}
              editable={false}
            />
            <Row>
              <Input
                name="nascimento"
                label={'Nascimento'}
                value={user.birth_date}
                editable={false}
                width={'45%'}
              />
              <Input
                name="sexo"
                label={'Sexo'}
                value={user.genrer}
                editable={false}
                width={'45%'}
              />
            </Row>
            <Input
              name="email"
              label={'E-mail'}
              value={user.email}
              editable={false}
            />
            {!isEditing && (
              <>
                <Input
                  name="fone"
                  label={'Telefone'}
                  value={user.phone}
                  editable={false}
                  edit
                  handleEdit={() => setIsEditing(true)}
                />
                <Input
                  name="cpf"
                  label={'CPF'}
                  value={user.document}
                  editable={false}
                  edit
                  handleEdit={() => setIsEditing(true)}
                />
                <Input
                  name="endereco"
                  label={'Endereço'}
                  value={`${user.city}, ${user.state}`}
                  editable={false}
                  edit
                  handleEdit={() => setIsEditing(true)}
                />
              </>
            )}
          </FormView>

          {isEditing && (
            <Formik
              initialValues={{
                fone: user.phone,
                cpf: user.document,
                cidade: user.city,
                estado: user.state,
              }}
              onSubmit={handleSignUp}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <FormView>
                  <Input
                    name="fone"
                    mask={'+55 ([99]) [99999]-[9999]'}
                    placeholder={'Telefone'}
                    label={'Telefone'}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={handleChange('fone')}
                    onBlur={handleBlur('fone')}
                    handleBlur={() => handleFoneBlur(values.fone)}
                    value={values.fone}
                    error={errors.fone}
                    keyboardType="phone-pad"
                  />
                  <Input
                    name="cpf"
                    mask={'[999].[999].[999]-[99]'}
                    placeholder={'CPF'}
                    label={'CPF'}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={handleChange('cpf')}
                    onBlur={handleBlur('cpf')}
                    handleBlur={() => handleCPFBlur(values.cpf)}
                    value={values.cpf}
                    error={errors.cpf}
                    keyboardType="number-pad"
                  />
                  <Input
                    name="cidade"
                    placeholder={'Cidade'}
                    label={'Cidade'}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={handleChange('cidade')}
                    onBlur={handleBlur('cidade')}
                    handleBlur={() => handleCityBlur(values.cidade)}
                    value={values.cidade}
                    error={errors.cidade}
                    keyboardType="default"
                  />
                  <Select
                    name="estado"
                    placeholder={'Estado'}
                    label={'Estado'}
                    onChangeText={handleChange('estado')}
                    onBlur={handleBlur('estado')}
                    handleBlur={value => handleStateBlur(value)}
                    value={values.estado}
                    initiaValue={user.state}
                    error={errors.estado}
                    getValue={value => setEstado(value)}
                    options={estadoListOptions}
                  />
                  <Button
                    style={{marginTop: 32}}
                    buttonColor={colors.mustard}
                    textColor={colors.white}
                    onPress={() => handleSubmit()}>
                    Salvar
                  </Button>
                  <Button
                    style={{marginTop: 16, marginBottom: 32}}
                    buttonColor={colors.darkGrey}
                    textColor={colors.white}
                    onPress={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </FormView>
              )}
            </Formik>
          )}
          {!isEditing && (
            <>
              <Button
                style={{marginTop: 32}}
                buttonColor={colors.mustard}
                textColor={colors.white}
                type="changePassword"
                onPress={() =>
                  navigation.navigate('ChangePassword', {userData: user})
                }>
                Alterar Senha
              </Button>
              <Button
                style={{marginTop: 16, marginBottom: 32}}
                buttonColor={colors.darkGrey}
                textColor={colors.white}
                onPress={() => signOut()}>
                Sair
              </Button>
            </>
          )}
        </Scroll>
      </KeyboardAvoidingView>
      <LoadingModal visible={loading} />
      <CustomAlert
        showAlert={showAlert}
        title={'Ocorreu um erro'}
        message={'Não foi possível atualizar seu perfil!'}
        confirmText={'Tentar novamente'}
        onConfirm={() => {
          setShowAlert(false);
        }}
        cancelText={'Cancelar'}
        onCancel={() => setIsEditing(false)}
        onDismiss={() => setShowAlert(false)}
      />
    </Container>
  );
};

export default SignUp;
