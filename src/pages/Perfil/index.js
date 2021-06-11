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
import DatePicker from '../../components/DatePicker';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';

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
  nome: Yup.string().required('Nome inválido.'),
  date: Yup.string()
    .matches(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, 'Data inválida.')
    .required('Data inválida.'),
  sexo: Yup.string().required('Selecione o sexo.'),
  fone: Yup.string()
    .matches(
      /^\+[5-5]{2} \([1-9]{2}\) [0-9]{5}-[0-9]{4}$/,
      'Telefone inválido.',
    )
    .required('Telefone inválido.'),
  cidade: Yup.string().required('Cidade inválida.'),
  estado: Yup.string().required('Selecione o estado.'),
});

const SignUp = () => {
  const {user, updateUser, updateUserError, clearUpdateUserError, signOut} =
    useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('');
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
  const [sexoListOptions] = useState([
    {
      value: 'Masculino',
      label: 'Masculino',
    },
    {
      value: 'Feminino',
      label: 'Feminino',
    },
  ]);
  const [sexo, setSexo] = useState('');
  const [errors, setErrors] = useState({
    nome: null,
    date: null,
    fone: null,
    sexo: null,
    cidade: null,
    estado: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userAvatar, setUserAvatar] = useState(false);

  useEffect(() => {
    console.log(user);
    setDate(user.birth_date);
    setEstado(user.state);
    setSexo(user.genrer);
    setUserAvatar(!!user.avatar);
    setIsEditing(false);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    setErrors({
      nome: null,
      date: null,
      fone: null,
      sexo: null,
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
        data.nome === user.name &&
        date === user.birth_date &&
        sexo === user.genrer &&
        data.fone === user.phone &&
        data.cidade === user.city &&
        estado === user.state;

      if (isEqual) {
        setIsEditing(false);
      }

      if (!isEqual) {
        setLoading(true);
        try {
          data.sexo = sexo;
          data.date = date;
          data.estado = estado;
          await schema.validate(data, {
            abortEarly: false,
          });

          console.log('data: ', data);

          updateUser({
            ...user,
            name: data.nome,
            birth_date: data.date,
            genrer: data.sexo,
            phone: data.fone,
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
    [errors, estado, user, updateUser, date, sexo],
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

  const handleNameBlur = useCallback(
    async value => {
      const nameSchema = Yup.object().shape({
        nome: Yup.string().required('Nome inválido.'),
      });

      console.log(value);

      const data = {
        nome: value,
      };

      try {
        await nameSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          nome: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            nome: message,
          });
        });
      }
    },
    [errors],
  );

  const handleBirthDateBlur = useCallback(
    async value => {
      const birthDateSchema = Yup.object().shape({
        date: Yup.string()
          .matches(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, 'Data inválida.')
          .required('Data inválida.'),
      });

      const data = {
        date: value,
      };

      try {
        await birthDateSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          date: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            date: message,
          });
        });
      }
    },
    [errors],
  );

  const handleGenderBlur = useCallback(
    async value => {
      const genderSchema = Yup.object().shape({
        sexo: Yup.string().required('Selecione o sexo.'),
      });

      const data = {
        sexo: value,
      };

      try {
        await genderSchema.validate(data, {
          abortEarly: false,
        });

        setErrors({
          ...errors,
          sexo: null,
        });
      } catch (error) {
        error.inner.forEach(err => {
          const {message} = err;
          setErrors({
            ...errors,
            sexo: message,
          });
        });
      }
    },
    [errors],
  );

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

  useEffect(() => {
    if (date) {
      setErrors(oldErrors => {
        return {
          ...oldErrors,
          date: null,
        };
      });
    }
  }, [date]);

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
            {!isEditing && (
              <>
                <Input
                  name="nome"
                  label={'Nome'}
                  value={user.name}
                  editable={false}
                  edit
                  handleEdit={() => setIsEditing(true)}
                />
                <Row>
                  <Input
                    name="nascimento"
                    label={'Nascimento'}
                    value={user.birth_date}
                    editable={false}
                    edit
                    handleEdit={() => setIsEditing(true)}
                    width={'45%'}
                  />
                  <Input
                    name="sexo"
                    label={'Sexo'}
                    value={user.genrer}
                    editable={false}
                    edit
                    handleEdit={() => setIsEditing(true)}
                    width={'45%'}
                  />
                </Row>
                <Input
                  name="email"
                  label={'E-mail'}
                  value={user.email}
                  editable={false}
                />
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
                nome: user.name,
                date: user.birth_date,
                cpf: user.document,
                email: user.email,
                fone: user.phone,
                sexo: user.genrer,
                cidade: user.city,
                estado: user.state,
              }}
              onSubmit={handleSignUp}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <FormView>
                  <Input
                    name="nome"
                    placeholder={'Nome'}
                    label={'Nome'}
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={handleChange('nome')}
                    onBlur={handleBlur('nome')}
                    handleBlur={() => handleNameBlur(values.nome)}
                    value={values.nome}
                    error={errors.nome}
                    keyboardType="default"
                  />
                  <Row>
                    <DatePicker
                      name="date"
                      placeholder={'Nascimento'}
                      label={'Nascimento'}
                      onChangeText={handleChange('date')}
                      onBlur={handleBlur('date')}
                      handleBlur={value => handleBirthDateBlur(value)}
                      value={values.date}
                      initiaValue={user.birth_date}
                      error={errors.date}
                      getValue={value => setDate(value)}
                      options={sexoListOptions}
                      width={'45%'}
                    />
                    <Select
                      name="sexo"
                      placeholder={'Sexo'}
                      label={'Sexo'}
                      onChangeText={handleChange('sexo')}
                      onBlur={handleBlur('sexo')}
                      handleBlur={value => handleGenderBlur(value)}
                      value={values.sexo}
                      initiaValue={user.genrer}
                      error={errors.sexo}
                      getValue={value => setSexo(value)}
                      options={sexoListOptions}
                      width={'45%'}
                    />
                  </Row>
                  <Input
                    name="email"
                    label={'E-mail'}
                    value={user.email}
                    editable={false}
                  />
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
                    label={'CPF'}
                    value={user.document}
                    editable={false}
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
        visible={showAlert}
        title={'Ocorreu um erro'}
        message={
          'Não foi possível atualizar seu perfil. Deseja tentar novamente?'
        }
        confirmButtonText={'Sim'}
        onConfirm={() => {
          setShowAlert(false);
        }}
        cancelButtonText={'Não'}
        onCancel={() => setIsEditing(false)}
        cancelable
        onDismiss={() => setShowAlert(false)}
      />
    </Container>
  );
};

export default SignUp;
