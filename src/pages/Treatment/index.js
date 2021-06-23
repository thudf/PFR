/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';
import TreatmentButton from '../../components/TreatmentButton';

import api from '../../services/api';

import {Container, Scroll, Content} from './styles';

const Treatment = () => {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [treatments, setTreatments] = useState([]);

  const getTreatments = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('treatments');
      console.log(response.data);

      const {data} = response;

      setTreatments(data);

      setLoading(false);
    } catch (error) {
      setShowAlert(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTreatments();
  }, [getTreatments]);

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <Content>
          {treatments &&
            treatments.map((item, index) => (
              <TreatmentButton
                key={`${item.title}-${index}`}
                title={item.title}
                description={item.description}
                isLast={treatments.length - 1 === index}
                onPress={() =>
                  navigation.navigate('TreatmentInfo', {
                    treatmentInfo: treatments[index],
                  })
                }
              />
            ))}
        </Content>
      </Scroll>
      <LoadingModal visible={loading} />
      <CustomAlert
        visible={showAlert}
        title={'Ocorreu um erro'}
        message={
          'Não foi possível encontrar tratamentos. Deseja tentar novamente?'
        }
        confirmButtonText={'Sim'}
        onConfirm={() => {
          setShowAlert(false);
          getTreatments();
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

export default Treatment;
