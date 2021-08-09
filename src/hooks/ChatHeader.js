import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import api from '../services/api';
import {useAuth} from './Auth';

const ChatHeaderContect = createContext({});

export function useChatHeader() {
  const context = useContext(ChatHeaderContect);

  if (!context) {
    throw new Error('useChatHeader must be used whitin an ChatHeaderProvider');
  }

  return context;
}

export const ChatHeaderProvider = ({children}) => {
  const {user} = useAuth();

  const [selected, setSelected] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [chatObject, setChatObject] = useState({});
  const [chatLoading, setChatLoading] = useState(false);
  const [openDeleteMessageAlert, setOpenDeleteMessageAlert] = useState(false);

  const handleSetChatObject = useCallback(
    chatData => {
      if (chatData.is_group) {
        const room_users = chatData.room_users.filter(
          chatUser => chatUser.user_id !== user.id,
        );
        const room_users_names = room_users.map(chatUser => chatUser.user.name);
        const room_users_names_title = room_users_names.join(', ');
        const newObject = {
          ...chatData,
          room_users_names: room_users_names,
          room_users_names_title: room_users_names_title,
        };
        setChatObject(newObject);
      }

      if (!chatData.is_group) {
        setChatObject(chatData);
      }
    },
    [user],
  );

  const handleRemoveChatObject = useCallback(() => {
    setSelectedMessages([]);
    setChatObject({});
    setSelected(false);
  }, []);

  const toggleSelected = useCallback(() => {
    setSelected(oldStt => setSelected(!oldStt));
  }, []);

  useEffect(() => {
    if (!selected) {
      setSelectedMessages([]);
    }
  }, [selected]);

  const handleAddSelectedMessages = useCallback(msg => {
    setSelectedMessages(oldStt => [...oldStt, msg]);
  }, []);

  const handleRemoveSelectedMessages = useCallback(
    msg => {
      const filteredMessages = selectedMessages.filter(
        message => message !== msg,
      );

      console.log(filteredMessages);

      setSelectedMessages(filteredMessages);
    },
    [selectedMessages],
  );

  const handleDeleteMessage = useCallback(async () => {
    console.log('delete_message: ', selectedMessages);
    console.log('room_id: ', chatObject.id);
    setOpenDeleteMessageAlert(false);
    try {
      setChatLoading(true);
      const deleteResponse = await api.post('/messages', {
        messages: selectedMessages,
        room: chatObject.id,
      });
      console.log('deleteResponse: ', deleteResponse.data);
      setSelectedMessages([]);
      setSelected(false);
      setChatLoading(false);
    } catch (error) {
      setChatLoading(false);
      console.log('delete_error', error);
      console.log('delete_error', error.response);
    }
  }, [selectedMessages, chatObject]);

  const handleSetOpenDeleteMessageAlert = useCallback(stt => {
    setOpenDeleteMessageAlert(stt);
  }, []);

  return (
    <ChatHeaderContect.Provider
      value={{
        selected,
        selectedMessages,
        chatObject,
        chatLoading,
        openDeleteMessageAlert,
        handleSetOpenDeleteMessageAlert,
        handleSetChatObject,
        handleRemoveChatObject,
        toggleSelected,
        handleAddSelectedMessages,
        handleRemoveSelectedMessages,
        handleDeleteMessage,
      }}>
      {children}
    </ChatHeaderContect.Provider>
  );
};
