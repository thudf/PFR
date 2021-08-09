import React from 'react';
import {SvgXml} from 'react-native-svg';

import checkIcon from '../../../../assets/carolinaBandeiraIcons/IconesAuxiliares/check_icon.svg';

import {
  ChatButtonContainer,
  ChatAvatarContainer,
  ChatAvatar,
  ChatBadge,
  ChatInfoContainer,
  ChatTitle,
} from './styles';

const ContactsListItem = ({
  item,
  isFirst,
  isLast,
  selected,
  handleClick = contact => console.log(contact),
}) => {
  const {avatar, name} = item;

  return (
    <ChatButtonContainer
      isFirst={isFirst}
      isLast={isLast}
      onPress={() => handleClick(item)}>
      <ChatAvatarContainer>
        <ChatAvatar source={{uri: avatar}} />

        {selected && (
          <ChatBadge>
            <SvgXml xml={checkIcon} width={9} height={6} />
          </ChatBadge>
        )}
      </ChatAvatarContainer>

      <ChatInfoContainer>
        <ChatTitle>{name}</ChatTitle>
      </ChatInfoContainer>
    </ChatButtonContainer>
  );
};

export default ContactsListItem;
