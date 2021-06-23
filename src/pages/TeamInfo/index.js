/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Linking} from 'react-native';
import {SvgXml} from 'react-native-svg';

import Button from '../../components/Button';
import phoneIcon from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/icone-telefone.svg';

import {
  ContactButton,
  ContactText,
  Container,
  Scroll,
  MainText,
  Title,
  SubTitle,
  TeamMemberAvatarContainer,
  TeamMemberAvatar,
  Row,
  ContactTitle,
} from './styles';

const TeamInfo = ({route}) => {
  const {teamMember} = route.params;
  return (
    <Container>
      <Scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}>
        <TeamMemberAvatarContainer>
          <TeamMemberAvatar source={{uri: teamMember.avatar}} />
        </TeamMemberAvatarContainer>
        <Title>{teamMember.name}</Title>
        <SubTitle>{teamMember.specialty}</SubTitle>
        <MainText>{teamMember.description}</MainText>
        <Row>
          <SvgXml
            style={{marginRight: 2}}
            xml={phoneIcon}
            width={16}
            height={16}
          />
          <ContactTitle>Telefone:</ContactTitle>
        </Row>
        <ContactButton
          onPress={() => Linking.openURL(`tel:${teamMember.phone}`)}>
          <ContactText>{teamMember.phone}</ContactText>
        </ContactButton>
        <Button style={{marginBottom: 40}} type="chat" small>
          Abrir uma conversa
        </Button>
      </Scroll>
    </Container>
  );
};

export default TeamInfo;
