/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SvgXml} from 'react-native-svg';

import chevronRight from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/chevron_right.svg';

import {
  Container,
  Content,
  TeamAvatarContainer,
  TeamAvatar,
  TeamMemberInfoContainer,
  TeamMemberName,
  TeamMemberSpecialty,
} from './styles';

const TeamButton = ({avatar, name, specialty, isLast = false, ...rest}) => {
  return (
    <Container isLast={isLast} {...rest}>
      <Content>
        <TeamAvatarContainer>
          <TeamAvatar source={{uri: avatar}} />
        </TeamAvatarContainer>

        <TeamMemberInfoContainer>
          <TeamMemberName>{name}</TeamMemberName>
          <TeamMemberSpecialty>{specialty}</TeamMemberSpecialty>
        </TeamMemberInfoContainer>
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

export default TeamButton;
