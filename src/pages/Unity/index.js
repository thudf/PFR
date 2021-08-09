/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {Linking} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {useNavigation} from '@react-navigation/native';

import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';
import UnityButton from './components/UnityButton';

import api from '../../services/api';

import {Container, Scroll, Content} from './styles';

const Unity = () => {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unities, setUnities] = useState([]);

  const getUnities = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('unity');
      console.log(response.data);

      const {data} = response;

      setUnities(data);

      setLoading(false);
    } catch (error) {
      setShowAlert(true);
      setLoading(false);
    }
  }, []);

  const handleMap = useCallback(address => {
    // const [endereco, ]

    Geocoder.from(
      // `${item.Endereco}, ${item.Numero}, ${item.Bairro}, ${item.NomeCidade}, ${item.CodEstado}`,
      'Rua Raphael Ananias, 114, Jardim Vitória, Araraquara, SP',
    )
      .then(json => {
        const location = json.results[0].geometry.location;
        const url = `google.navigation:q=${location.lat},${location.lng}`;
        Linking.openURL(url);
      })
      .catch(error => console.warn(error));
  }, []);

  useEffect(() => {
    getUnities();
  }, [getUnities]);

  useEffect(() => {
    if (!Geocoder.isInit) {
      Geocoder.init('AIzaSyCxs0m6LclVWmc1cfrePk-dt41lqJzYrzQ');
    }
  }, []);

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <Content>
          {unities &&
            unities.map((item, index) => (
              <UnityButton
                key={`${item.name}-${item.address}-${index}`}
                name={item.name}
                address={item.address}
                main_phone={item.phone}
                secondary_phone={item.phone_residence}
                isLast={unities.length - 1 === index}
                onPressRoute={() => handleMap(item.address)}
              />
            ))}
        </Content>
      </Scroll>
      <LoadingModal visible={loading} />
      <CustomAlert
        visible={showAlert}
        title={'Ocorreu um erro'}
        message={
          'Não foi possível encontrar unidades. Deseja tentar novamente?'
        }
        confirmButtonText={'Sim'}
        onConfirm={() => {
          setShowAlert(false);
          getUnities();
        }}
        cancelButtonText={'Não'}
        onCancel={() => {
          setShowAlert(false);
          navigation.navigate('Home');
        }}
      />
    </Container>
  );
};

export default Unity;
