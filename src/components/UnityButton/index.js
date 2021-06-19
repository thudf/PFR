import React from 'react';
import {Linking} from 'react-native';

import Button from '../Button';
import {colors} from '../../global';

import {
  Container,
  Content,
  UnityInfoContainer,
  UnityAddress,
  UnityPhone,
  Row,
} from './styles';

const UnityView = ({
  address,
  main_phone,
  secondary_phone,
  onPressRoute,
  isLast = false,
  ...rest
}) => {
  return (
    <Container isLast={isLast} {...rest}>
      <Content>
        <UnityInfoContainer>
          <UnityAddress>{address}</UnityAddress>
        </UnityInfoContainer>

        <UnityPhone>{main_phone}</UnityPhone>

        <Row>
          <Button
            style={{width: '46%'}}
            type={'phone'}
            onPress={() => Linking.openURL(`tel:${main_phone}`)}>
            Ligar
          </Button>
          <Button
            style={{width: '46%'}}
            type={'route'}
            buttonColor={colors.grey}
            onPress={() => onPressRoute()}>
            Rota
          </Button>
        </Row>
      </Content>
    </Container>
  );
};

export default UnityView;
