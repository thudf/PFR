/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../global';

import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';
import LoadingModal from '../../components/LoadingModal';

import {Container, Scroll, Title, FormView, Row} from './styles';

const schema = Yup.object().shape({
  nome: Yup.string().required('Nome inválido.'),
  date: Yup.string()
    .matches(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, 'Data inválida.')
    .required('Data inválida.'),
  cpf: Yup.string()
    .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, 'CPF inválido.')
    .required('CPF inválido.'),
  email: Yup.string().email('E-mail inválido.').required('E-mail inválido.'),
  fone: Yup.string()
    .matches(
      /^\+[5-5]{2} \([1-9]{2}\) [0-9]{5}-[0-9]{4}$/,
      'Telefone inválido.',
    )
    .required('Telefone inválido.'),
  sexo: Yup.string().required('Selecione o sexo.'),
  cidade: Yup.string().required('Cidade inválida.'),
  estado: Yup.string().required('Selecione o estado.'),
});

const SignUp = () => {
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
    cpf: null,
    email: null,
    fone: null,
    sexo: null,
    cidade: null,
    estado: null,
  });

  const handleSignUp = useCallback(
    async data => {
      setLoading(true);
      setErrors({
        nome: null,
        date: null,
        cpf: null,
        email: null,
        fone: null,
        sexo: null,
        cidade: null,
        estado: null,
      });
      try {
        data.sexo = sexo;
        data.estado = estado;
        data.date = date;

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(false);
        navigation.navigate('CreatePassword', {accountData: data});
      } catch (error) {
        let newErrors = {...errors};
        error.inner.forEach(err => {
          const {path, message} = err;
          newErrors[path] = message;
        });

        console.log(newErrors);
        setErrors(newErrors);
        setLoading(false);
      }
    },
    [navigation, errors, sexo, estado, date],
  );

  useEffect(() => {
    if (sexo) {
      setErrors(oldErrors => {
        return {
          ...oldErrors,
          sexo: null,
        };
      });
    }
  }, [sexo]);

  useEffect(() => {
    if (estado) {
      setErrors(oldErrors => {
        return {
          ...oldErrors,
          estado: null,
        };
      });
    }
  }, [estado]);

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

  const handleNameBlur = useCallback(
    async value => {
      const nameSchema = Yup.object().shape({
        nome: Yup.string().required('Nome inválido.'),
      });

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

  const handleCPFBlur = useCallback(
    async value => {
      const cpfSchema = Yup.object().shape({
        cpf: Yup.string()
          .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, 'CPF inválido.')
          .required('CPF inválido.'),
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

  const handleFoneBlur = useCallback(
    async value => {
      const foneSchema = Yup.object().shape({
        fone: Yup.string()
          .matches(
            /^\+[5-5]{2} \([1-9]{2}\) [0-9]{5}-[0-9]{4}$/,
            'Telefone inválido.',
          )
          .required('Telefone inválido.'),
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
        cidade: Yup.string().required('Cidade inválida.'),
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

  const handleStateBlur = useCallback(
    async value => {
      const stateSchema = Yup.object().shape({
        estado: Yup.string().required('Selecione o estado.'),
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
              nome: '',
              date: '',
              cpf: '',
              email: '',
              fone: '',
              sexo: '',
              cidade: '',
              estado: '',
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
                  name="email"
                  placeholder={'Email'}
                  label={'Email'}
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
                  name="fone"
                  mask={'+55 ([99]) [99999]-[9999]'}
                  placeholder={'Telefone/Whatsapp'}
                  label={'Telefone/Whatsapp'}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={handleChange('fone')}
                  onBlur={handleBlur('fone')}
                  handleBlur={() => handleFoneBlur(values.fone)}
                  value={values.fone}
                  error={errors.fone}
                  keyboardType="phone-pad"
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
                    error={errors.sexo}
                    getValue={value => setSexo(value)}
                    options={sexoListOptions}
                    width={'45%'}
                  />
                </Row>
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
                  error={errors.estado}
                  getValue={value => setEstado(value)}
                  options={estadoListOptions}
                />
                <Button
                  style={{marginTop: 64, marginBottom: 64}}
                  buttonColor={colors.mustard}
                  textColor={colors.white}
                  type="avançar"
                  active={!loading}
                  onPress={() => !loading && handleSubmit()}>
                  Avançar
                </Button>
              </FormView>
            )}
          </Formik>
        </Scroll>
      </KeyboardAvoidingView>
      <LoadingModal visible={loading} />
    </Container>
  );
};

export default SignUp;
