/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import GetLocation from 'react-native-get-location';

import HomeButton from './components/HomeButton';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';

import api from '../../services/api';

import {Container, Scroll} from './styles';

const screen = Dimensions.get('screen');

const Home = () => {
  const gap = 25;
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    setSize((screen.width - 40 - gap) / 2);
  }, []);

  const getLocation = useCallback(img => {
    console.log('img: ', img);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 150000,
    })
      .then(location => {
        console.log(location);

        const data = {
          latitude: location.latitude,
          longitude: location.longitude,
          foto: img,
        };

        api
          .post('/core', data)
          .then(response => {
            console.log('response: ', response.data);
            setLoading(false);
            setShowSuccessAlert(true);
          })
          .catch(error => {
            console.log('error:', error.response);
            setLoading(false);
            setShowAlert(true);
          });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code);
        console.warn(message);
        setLoading(false);
        setShowAlert(true);
      });
  }, []);

  const handleImage = useCallback(
    async ({response}) => {
      if (response.didCancel) {
      } else if (response.error) {
        setShowAlert(true);
      } else if (response.customButton) {
      } else {
        try {
          console.log('photoResponse: ', response.assets[0].uri);
          console.log('photoResponse: ', response.assets[0].type);
          console.log('photoResponse: ', response.assets[0].fileName);
          setLoading(true);
          const fd = new FormData();
          fd.append('foto', {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          });

          getLocation(fd);
        } catch (err) {
          console.log(err);
          setLoading(false);
          setShowAlert(true);
        }
      }
    },
    [getLocation],
  );

  const getImage = useCallback(
    typeAction => {
      const options = {
        title: 'Selecione a imagem',
        takePhotoButtonTitle: 'Tirar foto',
        chooseFromLibraryButtonTitle: 'Selecionar da galeria',
        cancelButtonTitle: 'Cancelar',
        storageOptions: {privateDirectory: true},
      };

      if (typeAction === 'Tirar foto') {
        try {
          launchCamera(options, response =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      } else {
        try {
          launchImageLibrary(options, response =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      }
    },
    [handleImage],
  );

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <HomeButton
            size={size}
            onPress={() => {
              getImage('Tirar foto');
            }}>
            Nova Foto
          </HomeButton>
        </View>
      </Scroll>
      <LoadingModal visible={loading} />
      <CustomAlert
        visible={showAlert}
        title={'Ocorreu um erro'}
        message={'Não foi possível salvar. Deseja tentar novamente?'}
        confirmButtonText={'Sim'}
        onConfirm={() => {
          setShowAlert(false);
        }}
        cancelButtonText={'Não'}
        onCancel={() => setShowAlert(false)}
        cancelable={true}
        onDismiss={() => {
          setShowAlert(false);
        }}
      />
      <CustomAlert
        visible={showSuccessAlert}
        title={'Sucesso'}
        message={'Salvo com sucesso!'}
        confirmButtonText={'OK'}
        onConfirm={() => {
          setShowSuccessAlert(false);
        }}
        cancelable={true}
        onDismiss={() => {
          setShowSuccessAlert(false);
        }}
      />
    </Container>
  );
};

export default Home;
