import React, {useEffect, useLayoutEffect, useState} from 'react';
import {parseISO, subHours, toDate} from 'date-fns';
import {format} from 'date-fns-tz';
import {View, Text} from 'react-native';

import {useAuth} from '../../../../hooks/Auth';
import {useChatHeader} from '../../../../hooks/ChatHeader';

import {
  AdjustMarginText,
  Container,
  HeaderOwnerMsg,
  FowardMessage,
  TextStyled,
  SubTextStyled,
  TextStyledTwo,
  Content,
  Image,
  Wrapper,
  ImageContainer,
  SharedContentImage,
  SharedContentTitle,
  TitleWrapper,
} from './styles';

const Item = ({item, isGroup}) => {
  const {
    selected,
    selectedMessages,
    toggleSelected,
    handleAddSelectedMessages,
    handleRemoveSelectedMessages,
  } = useChatHeader();
  const {user} = useAuth();

  const [today, setToday] = useState('');
  const [msgDay, setMsgDay] = useState('');
  const [subTextDate, setSubTextDate] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  useLayoutEffect(() => {
    if (item.image) {
      const contentArray = item.image.split('/');
      setImageTitle(contentArray[contentArray.length - 1]);
    }
  }, [item]);

  useEffect(() => {
    setToday(
      format(toDate(Date.now()), 'dd/MM/yyyy', {
        timeZone: 'America/Sao_Paulo',
      }),
    );

    setMsgDay(
      format(subHours(parseISO(item.created_at), 3), 'dd/MM/yyyy', {
        timeZone: 'America/Sao_Paulo',
      }),
    );
  }, [item]);

  useEffect(() => {
    if (today === msgDay) {
      setSubTextDate(
        format(subHours(parseISO(item.created_at), 3), 'HH:mm', {
          timeZone: 'America/Sao_Paulo',
        }),
      );
    } else {
      setSubTextDate(
        format(subHours(parseISO(item.created_at), 3), 'dd/MM/yyyy HH:mm', {
          timeZone: 'America/Sao_Paulo',
        }),
      );
    }
  }, [today, msgDay, item.created_at]);

  return (
    <Container
      activeOpacity={1}
      onLongPress={() => {
        if (!selected) {
          toggleSelected();
          handleAddSelectedMessages(item.id);
        }
      }}
      onPress={() => {
        if (selected) {
          if (selectedMessages.includes(item.id)) {
            handleRemoveSelectedMessages(item.id);
          } else {
            handleAddSelectedMessages(item.id);
          }
        }
      }}
      selected={selectedMessages.includes(item.id)}>
      <Content
        user={user && item && item.user_id && user.id === item.user_id}
        hasImage={item.image}>
        {isGroup && user.id !== item.user_id && (
          <AdjustMarginText topSpace>
            <HeaderOwnerMsg>{item.user.name}</HeaderOwnerMsg>
          </AdjustMarginText>
        )}

        {item.is_forward && (
          <AdjustMarginText topSpace={!(isGroup && user.id !== item.user_id)}>
            <FowardMessage>Encaminhada</FowardMessage>
          </AdjustMarginText>
        )}

        {item.image && (
          <Wrapper
            hasPreviousContent={
              item.is_forward || (isGroup && user.id !== item.user_id)
            }>
            <ImageContainer>
              <SharedContentImage source={{uri: item.image}} />
            </ImageContainer>
            <TitleWrapper>
              <SharedContentTitle numberOfLines={1} ellipsizeMode="middle">
                {imageTitle}
              </SharedContentTitle>
            </TitleWrapper>
          </Wrapper>
        )}

        {item.message && (
          <AdjustMarginText
            topSpace={
              (!item.is_forward && !(isGroup && user.id !== item.user_id)) ||
              item.image
            }>
            <TextStyled
              user={user && item && item.user_id && user.id === item.user_id}>
              {item.message}
            </TextStyled>
          </AdjustMarginText>
        )}

        {item.created_at && (
          <AdjustMarginText alignRight topSpace={!item.message}>
            <SubTextStyled
              user={user && item && item.user_id && user.id === item.user_id}>
              {subTextDate}
            </SubTextStyled>
          </AdjustMarginText>
        )}
      </Content>
    </Container>
  );
};

export default Item;
