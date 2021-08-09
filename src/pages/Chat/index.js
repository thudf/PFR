import React, {useCallback, useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import ChatList from './components/ChatList';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';

import addPrivateChatIcon from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/add_private_chat.svg';
import addGroupChatIcon from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/add_group_chat.svg';

import api from '../../services/api';
import {useAuth} from '../../hooks/Auth';

import {
  Container,
  ChatTabsContainer,
  ChatTab,
  ChatTabButton,
  ChatTabTitle,
  FloatButton,
} from './styles';

const Chat = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {user} = useAuth();

  const [activeTab, setActiveTab] = useState('Privado');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteChatError, setShowDeleteChatError] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const [privateChatList, setPrivateChatList] = useState([]);
  const [groupChatList, setGroupChatList] = useState([]);

  const getChatList = useCallback(async () => {
    try {
      setLoading(true);
      const {data} = await api.get('rooms-user');
      console.log('data_chats: ', data);

      const privateFilter = data.filter(item => !item.is_group);
      const newTitlePrivateChats = privateFilter.map(item => {
        const newTitle = item.room_users.filter(
          roomUser => roomUser.user.id !== user.id,
        )[0].user.name;
        const newItem = {
          ...item,
          title: newTitle,
        };
        return newItem;
      });

      setPrivateChatList(newTitlePrivateChats);
      setGroupChatList(data.filter(item => item.is_group));
      setLoading(false);
    } catch (error) {
      console.log('chats_error', error.response);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isFocused) {
      getChatList();
    }

    if (!isFocused) {
      setPrivateChatList([]);
      setGroupChatList([]);
    }
  }, [getChatList, isFocused]);

  const handleChatDelete = useCallback(chat => {
    setShowAlert(true);
    setChatToDelete(chat);
    console.log(chat);
  }, []);

  const handleDelete = useCallback(async () => {
    setShowAlert(false);
    try {
      setLoading(true);
      await api.delete(`/rooms/${chatToDelete.id}`);
      getChatList();
    } catch (error) {
      console.log('delete_chat_error: ', error.response);
      setShowDeleteChatError(true);
      setLoading(false);
    }
  }, [chatToDelete, getChatList]);

  useEffect(() => {
    console.log('privateChatList: ', privateChatList);
  }, [privateChatList]);

  return (
    <Container>
      <ChatTabsContainer>
        {['Privado', 'Grupos'].map(tab => (
          <ChatTab key={tab} active={activeTab === tab}>
            <ChatTabButton onPress={() => setActiveTab(tab)}>
              <ChatTabTitle active={activeTab === tab}>{tab}</ChatTabTitle>
            </ChatTabButton>
          </ChatTab>
        ))}
      </ChatTabsContainer>
      {activeTab === 'Privado' && (
        <>
          <ChatList
            chatList={privateChatList}
            handleDelete={chat => handleChatDelete(chat)}
            isGroup={false}
          />
          <FloatButton onPress={() => navigation.navigate('NewPrivateChat')}>
            <SvgXml xml={addPrivateChatIcon} width={36} height={18} />
          </FloatButton>
        </>
      )}
      {activeTab === 'Grupos' && (
        <>
          <ChatList
            chatList={groupChatList}
            handleDelete={chat => handleChatDelete(chat)}
            isGroup
          />
          <FloatButton onPress={() => navigation.navigate('NewGroupChat')}>
            <SvgXml xml={addGroupChatIcon} width={44} height={27.4} />
          </FloatButton>
        </>
      )}
      <LoadingModal visible={loading} />
      <CustomAlert
        visible={showAlert}
        title={'Deletar conversa'}
        message={'Deseja realmente deletar essa conversa?'}
        confirmButtonText={'Sim'}
        onConfirm={() => {
          handleDelete();
        }}
        cancelButtonText={'Não'}
        onCancel={() => {
          setShowAlert(false);
        }}
        cancelable
        onDismiss={() => setShowAlert(false)}
      />
      <CustomAlert
        visible={showDeleteChatError}
        title={'Ocorreu um erro!'}
        message={'Ocorreu um erro ao deletar a conversa! Tente novamente!'}
        cancelButtonText={'Ok'}
        onCancel={() => {
          setShowDeleteChatError(false);
        }}
        cancelable
        onDismiss={() => setShowDeleteChatError(false)}
      />
    </Container>
  );
};

export default Chat;
