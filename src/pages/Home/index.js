/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import HomeButton from '../../components/HomeButton';

import {Container, Row, Scroll} from './styles';

const screen = Dimensions.get('screen');

const Home = () => {
  const gap = 25;
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize((screen.width - 40 - gap) / 2);
  }, []);

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Row gap={gap} mTop>
          <HomeButton icon="equipe" size={size}>
            Equipe
          </HomeButton>
          <HomeButton icon="unidades" size={size}>
            Unidades
          </HomeButton>
        </Row>
        <Row gap={gap}>
          <HomeButton icon="patologias" size={size}>
            Patologias
          </HomeButton>
          <HomeButton icon="tratamentos" size={size}>
            Tratamentos
          </HomeButton>
        </Row>
        {/* <Row gap={3 * gap}>
          <HomeButton icon="pacientes" size={size}>
            Pacientes
          </HomeButton>
        </Row> */}
      </Scroll>
    </Container>
  );
};

export default Home;
