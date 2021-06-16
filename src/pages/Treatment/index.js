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
      const response = await api.get('team');
      console.log(response.data);

      const {data} = response;

      // setTreatments(data);

      setTreatments([
        {
          title: 'Cirurgia Robótica',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla pellentesque dignissim enim sit amet. Ligula ullamcorper malesuada proin libero nunc consequat. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. In dictum non consectetur a erat nam at. Gravida dictum fusce ut placerat. Nisi lacus sed viverra tellus. Massa tincidunt dui ut ornare lectus sit amet est placerat. Quisque non tellus orci ac auctor. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Nisl pretium fusce id velit ut tortor pretium. Nisl suscipit adipiscing bibendum est. Sed risus ultricies tristique nulla aliquet enim tortor. Libero nunc consequat interdum varius sit amet mattis vulputate. Lectus urna duis convallis convallis tellus id. Tortor at risus viverra adipiscing at in tellus integer feugiat. A erat nam at lectus urna duis convallis. Erat nam at lectus urna duis convallis convallis tellus id. Volutpat diam ut venenatis tellus in. Aenean et tortor at risus viverra adipiscing at. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Mollis nunc sed id semper. In ante metus dictum at tempor. Diam quam nulla porttitor massa. Nisi vitae suscipit tellus mauris a diam. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Purus viverra accumsan in nisl nisi scelerisque eu. Nunc sed augue lacus viverra. Purus gravida quis blandit turpis cursus in hac. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Enim nunc faucibus a pellentesque sit. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Enim nulla aliquet porttitor lacus luctus. Bibendum arcu vitae elementum curabitur vitae nunc sed. In massa tempor nec feugiat nisl pretium fusce id. Fames ac turpis egestas integer. Cum sociis natoque penatibus et magnis. Dui faucibus in ornare quam viverra orci sagittis eu. Ut diam quam nulla porttitor massa id neque. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Volutpat maecenas volutpat blandit aliquam etiam. Dapibus ultrices in iaculis nunc sed augue. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Diam quam nulla porttitor massa id neque aliquam. Eros donec ac odio tempor orci dapibus ultrices. Eget sit amet tellus cras adipiscing. Nec sagittis aliquam malesuada bibendum arcu vitae. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Sit amet risus nullam eget felis eget nunc lobortis. Praesent tristique magna sit amet. Congue nisi vitae suscipit tellus mauris a. Eleifend quam adipiscing vitae proin sagittis nisl. Elit duis tristique sollicitudin nibh sit. Lacus sed viverra tellus in. At ultrices mi tempus imperdiet nulla. Nunc id cursus metus aliquam eleifend mi in. Ornare aenean euismod elementum nisi. Arcu dictum varius duis at consectetur. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. In aliquam sem fringilla ut morbi tincidunt augue. Nunc scelerisque viverra mauris in aliquam sem fringilla ut. Iaculis nunc sed augue lacus viverra vitae congue. Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Risus viverra adipiscing at in tellus integer feugiat. Risus in hendrerit gravida rutrum quisque non tellus. Tincidunt tortor aliquam nulla facilisi cras. Morbi tincidunt ornare massa eget. Ac turpis egestas integer eget. Tortor consequat id porta nibh venenatis cras sed. Eget duis at tellus at urna condimentum mattis pellentesque id. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum. Posuere urna nec tincidunt praesent. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Maecenas pharetra convallis posuere morbi. Neque vitae tempus quam pellentesque nec. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Sociis natoque penatibus et magnis dis parturient. Accumsan lacus vel facilisis volutpat est velit egestas dui. Neque vitae tempus quam pellentesque. Est ante in nibh mauris cursus mattis molestie.',
          video: 'https://www.youtube.com/watch?v=kMBr9xQ937E',
          image: null,
        },
        {
          title: 'Videolaparoscopia',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          video: null,
          image:
            'https://www.pfizer.com.br/sites/default/files/inline-images/importancia-da-adesao-ao-tratamento-medico.jpg',
        },
        {
          title: 'Video-histeroscopia',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla pellentesque dignissim enim sit amet. Ligula ullamcorper malesuada proin libero nunc consequat. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. In dictum non consectetur a erat nam at. Gravida dictum fusce ut placerat. Nisi lacus sed viverra tellus. Massa tincidunt dui ut ornare lectus sit amet est placerat. Quisque non tellus orci ac auctor. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Nisl pretium fusce id velit ut tortor pretium. Nisl suscipit adipiscing bibendum est. Sed risus ultricies tristique nulla aliquet enim tortor. Libero nunc consequat interdum varius sit amet mattis vulputate. Lectus urna duis convallis convallis tellus id. Tortor at risus viverra adipiscing at in tellus integer feugiat. A erat nam at lectus urna duis convallis. Erat nam at lectus urna duis convallis convallis tellus id. Volutpat diam ut venenatis tellus in. Aenean et tortor at risus viverra adipiscing at. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Scelerisque eleifend donec pretium vulputate sapien nec. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Mollis nunc sed id semper. In ante metus dictum at tempor. Diam quam nulla porttitor massa. Nisi vitae suscipit tellus mauris a diam. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Purus viverra accumsan in nisl nisi scelerisque eu. Nunc sed augue lacus viverra. Purus gravida quis blandit turpis cursus in hac. Pulvinar sapien et ligula ullamcorper malesuada proin libero. Enim nunc faucibus a pellentesque sit. Sed cras ornare arcu dui vivamus arcu felis bibendum ut. Enim nulla aliquet porttitor lacus luctus. Bibendum arcu vitae elementum curabitur vitae nunc sed. In massa tempor nec feugiat nisl pretium fusce id. Fames ac turpis egestas integer. Cum sociis natoque penatibus et magnis. Dui faucibus in ornare quam viverra orci sagittis eu. Ut diam quam nulla porttitor massa id neque. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Volutpat maecenas volutpat blandit aliquam etiam. Dapibus ultrices in iaculis nunc sed augue. Eu scelerisque felis imperdiet proin fermentum leo vel orci. Diam quam nulla porttitor massa id neque aliquam. Eros donec ac odio tempor orci dapibus ultrices. Eget sit amet tellus cras adipiscing. Nec sagittis aliquam malesuada bibendum arcu vitae. Aliquam sem fringilla ut morbi tincidunt augue interdum velit. Sit amet risus nullam eget felis eget nunc lobortis. Praesent tristique magna sit amet. Congue nisi vitae suscipit tellus mauris a. Eleifend quam adipiscing vitae proin sagittis nisl. Elit duis tristique sollicitudin nibh sit. Lacus sed viverra tellus in. At ultrices mi tempus imperdiet nulla. Nunc id cursus metus aliquam eleifend mi in. Ornare aenean euismod elementum nisi. Arcu dictum varius duis at consectetur. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. In aliquam sem fringilla ut morbi tincidunt augue. Nunc scelerisque viverra mauris in aliquam sem fringilla ut. Iaculis nunc sed augue lacus viverra vitae congue. Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Risus viverra adipiscing at in tellus integer feugiat. Risus in hendrerit gravida rutrum quisque non tellus. Tincidunt tortor aliquam nulla facilisi cras. Morbi tincidunt ornare massa eget. Ac turpis egestas integer eget. Tortor consequat id porta nibh venenatis cras sed. Eget duis at tellus at urna condimentum mattis pellentesque id. Maecenas volutpat blandit aliquam etiam erat velit scelerisque in dictum. Posuere urna nec tincidunt praesent. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Maecenas pharetra convallis posuere morbi. Neque vitae tempus quam pellentesque nec. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Sociis natoque penatibus et magnis dis parturient. Accumsan lacus vel facilisis volutpat est velit egestas dui. Neque vitae tempus quam pellentesque. Est ante in nibh mauris cursus mattis molestie.',
          video: 'https://www.youtube.com/watch?v=kMBr9xQ937E',
          image: null,
        },
        {
          title: 'Single Port/Single Incision',
          description: 'Lorem ipsum dolor sit amet',
          video: null,
          image:
            'https://www.pfizer.com.br/sites/default/files/inline-images/importancia-da-adesao-ao-tratamento-medico.jpg',
        },
      ]);

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
