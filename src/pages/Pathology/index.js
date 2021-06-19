/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';
import TreatmentButton from '../../components/TreatmentButton';

import api from '../../services/api';

import {Container, Scroll, Content} from './styles';

const Pathology = () => {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pathologies, setPathologies] = useState([]);

  const getPathologies = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.get('pathologies');
      console.log(response.data);

      const {data} = response;

      setPathologies(data);

      setLoading(false);
    } catch (error) {
      setShowAlert(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPathologies();
  }, [getPathologies]);

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <Content>
          {pathologies &&
            pathologies.map((item, index) => (
              <TreatmentButton
                key={`${item.title}-${index}`}
                title={item.title}
                description={item.description}
                isLast={pathologies.length - 1 === index}
                onPress={() =>
                  navigation.navigate('PathologyInfo', {
                    pathologyInfo: pathologies[index],
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
          'Não foi possível encontrar patologias. Deseja tentar novamente?'
        }
        confirmButtonText={'Sim'}
        onConfirm={() => {
          setShowAlert(false);
          getPathologies();
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

export default Pathology;
