/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import Button from '../../components/ReadMoreButton';
import LoadingModal from '../../components/LoadingModal';

import {colors} from '../../global';

import {
  Container,
  Scroll,
  MainText,
  MainTextContainer,
  Title,
  Row,
  TreatmentImage,
} from './styles';

const screen = Dimensions.get('screen');

const TeamInfo = ({route}) => {
  const {treatmentInfo} = route.params;

  const [readMore, setReadMore] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    setImageHeight(screen.width * 0.9 * 0.5625);
    setImageLoading(treatmentInfo.image ? true : false);
  }, [treatmentInfo]);

  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        {treatmentInfo.image && (
          <TreatmentImage
            height={imageHeight}
            source={{uri: treatmentInfo.image}}
            onLoadEnd={() => setImageLoading(false)}
          />
        )}

        <Row>
          <Title>{treatmentInfo.title}</Title>
        </Row>

        <MainTextContainer readMore={readMore}>
          <MainText>{treatmentInfo.description}</MainText>
        </MainTextContainer>

        <Row>
          <Button
            style={{marginBottom: 52}}
            type="read_more"
            buttonColor={colors.grey}
            small
            onPress={() => setReadMore(!readMore)}>
            {readMore ? 'Ler menos' : 'Leia mais'}
          </Button>
        </Row>
      </Scroll>
      <LoadingModal visible={imageLoading} />
    </Container>
  );
};

export default TeamInfo;
