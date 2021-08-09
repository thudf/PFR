/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AuxIcon from '../../../../components/AuxIcon';

import {colors} from '../../../../global';

import {useAuth} from '../../../../hooks/Auth';

import {
  ChatButtonContent,
  ChatDeleteContainer,
  ChatDeleteContent,
  ChatDeleteText,
  ChatButtonContainer,
  ChatButtonContainerWrap,
  ChatAvatarContainer,
  ChatAvatar,
  ChatBadge,
  ChatBadgeText,
  ChatInfoContainer,
  ChatTitle,
  ChatLastMessageContainer,
  ChatText,
} from './styles';

const ChatListItem = ({item, isGroup, isFirst, isLast, handleDelete}) => {
  const {title, text, time, unread, id, room_users} = item;

  const {user} = useAuth();
  const navigation = useNavigation();

  const imgX = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (isGroup) {
      setAvatar(item.avatar);
    }

    if (!isGroup) {
      const guest = item.room_users.filter(
        chatUser => chatUser.user.id !== user.id,
      );

      if (guest[0]?.user?.avatar) {
        setAvatar(guest[0].user.avatar);
      }
    }
  }, [item, user.id, isGroup]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > -120 && gestureState.dx < 0) {
          Animated.parallel([
            Animated.timing(imgX, {
              toValue: gestureState.dx,
              duration: 10,
              useNativeDriver: false,
            }),

            Animated.timing(buttonOpacity, {
              toValue: 1,
              duration: 10,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -115) {
          handleDelete(item);
        }

        Animated.parallel([
          Animated.spring(imgX, {
            toValue: 0,
            bounciness: 1,
            useNativeDriver: false,
          }),

          Animated.timing(buttonOpacity, {
            toValue: 0,
            duration: 10,
            useNativeDriver: false,
          }),
        ]).start();
      },
    }),
  ).current;

  return (
    <ChatButtonContent isFirst={isFirst} isLast={isLast}>
      <ChatDeleteContainer>
        <ChatDeleteContent>
          <AuxIcon type={'white'} icon={'trash'} width={16} height={23} />
          <ChatDeleteText>Apagar</ChatDeleteText>
        </ChatDeleteContent>
      </ChatDeleteContainer>
      <Animated.View
        style={{
          transform: [{translateX: imgX}],
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        {...panResponder.panHandlers}>
        <ChatButtonContainer isFirst={isFirst} isLast={isLast}>
          <Animated.View
            style={[
              styles.chatButtonContainerBackground,
              {
                opacity: buttonOpacity,
              },
            ]}
          />
          <ChatButtonContainerWrap
            onPress={() =>
              navigation.navigate('ChatRoom', {
                id: id,
                title: title,
                is_group: isGroup,
                avatar: avatar,
                room_users: room_users,
              })
            }>
            <ChatAvatarContainer>
              {avatar && <ChatAvatar source={{uri: avatar}} />}
              {unread > 0 && (
                <ChatBadge>
                  <ChatBadgeText>{unread > 99 ? '99+' : unread}</ChatBadgeText>
                </ChatBadge>
              )}
            </ChatAvatarContainer>

            <ChatInfoContainer>
              <ChatTitle>{title}</ChatTitle>

              {text && time && (
                <ChatLastMessageContainer>
                  <ChatText>{text}</ChatText>
                  <ChatText>{time}</ChatText>
                </ChatLastMessageContainer>
              )}
            </ChatInfoContainer>
          </ChatButtonContainerWrap>
        </ChatButtonContainer>
      </Animated.View>
    </ChatButtonContent>
  );
};

const styles = StyleSheet.create({
  chatButtonContainerBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: `${colors.darkGrey}`,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default ChatListItem;
