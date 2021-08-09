import React, {useCallback, useEffect, useRef, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useIsFocused} from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';

import {useChatHeader} from '../../hooks/ChatHeader';
import {useAuth} from '../../hooks/Auth';

import ChatInput from './components/ChatInput';
import Item from './components/Item';
import LoadingModal from '../../components/LoadingModal';
import PhotoSelectionModal from '../../components/PhotoSelectionModal';
import CustomAlert from '../../components/CustomAlert';

import api from '../../services/api';
import connection from '../../services/socket';

import {
  Container,
  Content,
  ViewStyled,
  FlatListStyled,
  ViewMessage,
} from './styles';

let socket;

const ChatRoom = ({route}) => {
  const isFocused = useIsFocused();
  const {user, token} = useAuth();
  const {
    chatLoading,
    handleSetChatObject,
    handleDeleteMessage,
    handleSetOpenDeleteMessageAlert,
    openDeleteMessageAlert,
    selectedMessages,
  } = useChatHeader();

  const flatListRef = useRef(null);

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messageNew, setMessageNew] = useState('');
  const [imageMessageNew, setImageMessageNew] = useState(null);
  const [modalMediaVisible, setModalMediaVisible] = useState(false);

  useEffect(() => {
    setLoading(chatLoading);
  }, [chatLoading]);

  const getMessages = useCallback(async () => {
    try {
      setLoading(true);
      if (route.params) {
        console.log('item: ', route.params);
        const {
          data: {messages: chatMessages},
        } = await api.get(`/rooms/${route.params.id}`);
        console.log('set new message on get: ', chatMessages);
        setMessages(chatMessages.reverse());
      }
      setLoading(false);
    } catch (err) {
      console.log('get_messages_error: ', err);
      setLoading(false);
      setMessages([]);
    }
  }, [route.params]);

  useEffect(() => {
    if (isFocused) {
      connection.connect(token);
      setItem(route.params);
      handleSetChatObject(route.params);
      getMessages();
    }

    if (!isFocused) {
      connection.close();
    }
  }, [isFocused, token, route, handleSetChatObject, getMessages]);

  const uploadImage = useCallback(async file => {
    const upImage = await api
      .post('upload', file, {
        // onUploadProgress: progressEvent => {}
      })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(error => {
        throw new Error(error);
      });
    return upImage;
  }, []);

  const sendMessageNew = useCallback(async () => {
    if (messageNew || imageMessageNew) {
      if (imageMessageNew) {
        const fd = new FormData();
        fd.append('file', {
          uri: imageMessageNew.uri,
          type: imageMessageNew.type,
          name: imageMessageNew.fileName,
        });

        const imageShared = await uploadImage(fd);

        await api.post(`rooms/${item.id}`, {
          message: messageNew,
          image: imageShared,
        });
      }

      if (!imageMessageNew) {
        await api.post(`rooms/${item.id}`, {
          message: messageNew,
          image: '',
        });
      }

      setImageMessageNew('');
      setMessageNew('');
    }
  }, [messageNew, imageMessageNew, item, uploadImage]);

  const sendMessage = useCallback(
    message => {
      const {type, data, channel} = message;
      switch (type) {
        case 'room:newMessage':
          if (channel && channel === `room:${route.params.id}`) {
            console.log('set new message: ', data);
            setMessages(prevState => [...prevState, data]);
          }
          break;
        case 'room:removeMessage':
          if (channel && channel === `room:${route.params.id}`) {
            setLoading(true);
            setMessages(prevState =>
              prevState.filter(msg => !data.includes(msg.id)),
            );
            setLoading(false);
          }
          break;
        default:
      }
    },
    [route],
  );

  useEffect(() => {
    setLoading(true);

    if (connection && item && item.id) {
      connection.subscribe(`room:${item.id}`, sendMessage);
    }
    setLoading(false);
  }, [sendMessage, item]);

  const handleImage = useCallback(({response, typeAction}) => {
    if (response.didCancel) {
    } else if (response.error) {
    } else if (response.customButton) {
    } else {
      setLoading(true);
      const {assets} = response;

      console.log('response: ', response.assets);
      setImageMessageNew(assets[0]);
      setLoading(false);
    }
  }, []);

  const getImage = useCallback(
    typeAction => {
      const options = {
        title: 'Selecione a imagem',
        takePhotoButtonTitle: 'Tirar foto',
        chooseFromLibraryButtonTitle: 'Selecionar da galeria',
        cancelButtonTitle: 'Cancelar',
        storageOptions: {privateDirectory: true},
      };

      if (typeAction === 'Tirar foto') {
        try {
          launchCamera(options, response =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      } else {
        try {
          launchImageLibrary(options, response =>
            handleImage({response, typeAction}),
          );
        } catch (err) {}
      }
    },
    [handleImage],
  );

  useEffect(() => {
    console.log('messages: ', messages);
  }, [messages]);

  return (
    <Container>
      <Content>
        <ViewStyled>
          <FlatListStyled
            ref={flatListRef}
            onContentSizeChange={() => flatListRef.current.scrollToEnd()}
            onLayout={() => flatListRef.current.scrollToEnd()}
            showsVerticalScrollIndicator={false}
            data={messages}
            renderItem={props => (
              <Item
                item={props.item}
                key={props.item.id}
                isGroup={item.is_group}
              />
            )}
          />
        </ViewStyled>
        <ViewMessage>
          <ChatInput
            onChangeText={e => setMessageNew(e)}
            name="message"
            value={messageNew}
            handleSendMessage={() => sendMessageNew()}
            handleAttach={() => setModalMediaVisible(true)}
            onSubmitEditing={() => sendMessageNew()}
            sharedContent={imageMessageNew ? imageMessageNew.uri : ''}
            onDeleteSharedContent={() => setImageMessageNew('')}
          />
        </ViewMessage>
      </Content>

      <PhotoSelectionModal
        visible={modalMediaVisible}
        setVisible={val => setModalMediaVisible(val)}
        getImage={data => getImage(data)}
        title={'Selecionar anexo'}
      />

      <CustomAlert
        visible={openDeleteMessageAlert}
        // title={'Ocorreu um erro'}
        message={
          selectedMessages.length > 1
            ? 'Tem certeza que deseja apagar as mensagens?'
            : 'Tem certeza que deseja apagar a mensagem?'
        }
        confirmButtonText={'Sim'}
        onConfirm={() => {
          handleDeleteMessage();
        }}
        cancelButtonText={'Não'}
        onCancel={() => {
          handleSetOpenDeleteMessageAlert(false);
        }}
        cancelable
        onDismiss={() => handleSetOpenDeleteMessageAlert(false)}
      />

      <LoadingModal visible={loading} />
    </Container>
  );
};

export default ChatRoom;
