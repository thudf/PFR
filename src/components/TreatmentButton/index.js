/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SvgXml} from 'react-native-svg';

import chevronRight from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/chevron_right.svg';

import {
  Container,
  Content,
  TreatmentInfoContainer,
  TreatmentTitle,
  TreatmentDescription,
  TreatmentDescriptionContainer,
} from './styles';

const TreatmentButton = ({
  avatar,
  title,
  description,
  isLast = false,
  ...rest
}) => {
  return (
    <Container isLast={isLast} {...rest}>
      <Content>
        <TreatmentInfoContainer>
          <TreatmentTitle>{title}</TreatmentTitle>

          <TreatmentDescriptionContainer>
            <TreatmentDescription>{description}</TreatmentDescription>
          </TreatmentDescriptionContainer>
        </TreatmentInfoContainer>
      </Content>
      <SvgXml
        style={{marginLeft: 'auto'}}
        xml={chevronRight}
        width={12}
        height={12}
      />
    </Container>
  );
};

export default TreatmentButton;
