/* eslint-disable react-native/no-inline-styles */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import AuxIcon from '../../components/AuxIcon';
import Input from '../../components/Input';
import LoadingModal from '../../components/LoadingModal';
import CustomAlert from '../../components/CustomAlert';
import PhotoSelectionModal from '../../components/PhotoSelectionModal';

import editAvatar from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/bt_editar_avatar.svg';
import emptyIcon from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/empty_image.svg';
import checkIcon from '../../assets/carolinaBandeiraIcons/IconesAuxiliares/check_icon.svg';

import api from '../../services/api';
import {useAuth} from '../../hooks/Auth';

import {
  Container,
  Scroll,
  UserAvatarContainer,
  GroupAvatar,
  UserEmptyAvatar,
  EmptyText,
  EmptyWrap,
  UserAvatarButton,
  Row,
  ContactsListTitle,
  GroupContactsList,
  SeparatorComponent,
  SelectedContactAvatarContainer,
  SelectedContactAvatar,
  SelectedContactBadge,
  FloatButton,
} from './styles';

const schema = Yup.object().shape({
  nome: Yup.string().required('Nome inválido.'),
});

const NewGroupDetails = ({route}) => {
  const navigation = useNavigation();
  const {user} = useAuth();

  const [loading, setLoading] = useState(false);
  const [modalMediaVisible, setModalMediaVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [groupAvatar, setGroupAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [fullList, setFullList] = useState([]);
  const [selectedList, setSelectedList] = useState([]);
  const [chatData, setChatData] = useState(null);

  const groupName = useRef({value: ''});

  useLayoutEffect(() => {
    setFullList(route.params.contacts);
    setSelectedList(route.params.contacts);
  }, [route]);

  const uploadImage = useCallback(async file => {
    const upImage = await api
      .post('upload', file, {
        // onUploadProgress: progressEvent => {}
      })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch(err => {
        throw new Error(err);
      });
    return upImage;
  }, []);

  const handleImage = useCallback(
    async ({response}) => {
      if (response.didCancel) {
      } else if (response.error) {
        // setShowAlert(true);
      } else if (response.customButton) {
      } else {
        try {
          setLoading(true);
          const fd = new FormData();
          fd.append('file', {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          });
          const avatar = await uploadImage(fd);
          setGroupAvatar(avatar);
          console.log(avatar);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
          // setShowAlert(true);
        }
      }
    },
    [uploadImage],
  );

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

  const handleSignUp = useCallback(
    async data => {
      const referenceData = {nome: data};
      if (selectedList.length > 0 && groupAvatar) {
        try {
          setLoading(true);
          await schema.validate(referenceData, {
            abortEarly: false,
          });

          const selectedListIds = selectedList.map(item => item.id);

          const {data: newChatData} = await api.post('rooms', {
            title: data,
            users: [...selectedListIds, user.id],
            is_group: true,
            avatar: groupAvatar,
          });

          console.log('newChatData: ', newChatData);
          setChatData(newChatData);
          setShowAlert(true);

          setLoading(false);
        } catch (err) {
          err.inner.forEach(item => {
            const {message} = item;
            setError(message);
          });
          setLoading(false);
        }
      }
    },
    [selectedList, groupAvatar, user],
  );

  const handleNameBlur = useCallback(async value => {
    const nameSchema = Yup.object().shape({
      nome: Yup.string().required('Nome inválido.'),
    });

    console.log(value);

    const data = {
      nome: value,
    };

    try {
      await nameSchema.validate(data, {
        abortEarly: false,
      });

      setError(null);
    } catch (err) {
      err.inner.forEach(item => {
        const {message} = item;
        setError(message);
      });
    }
  }, []);

  const handleContactClick = useCallback(
    item => {
      const isSelected = selectedList.includes(item);

      if (isSelected) {
        const contactIndex = selectedList.findIndex(
          contact => contact.id === item.id,
        );

        const newSelectedList = [...selectedList];
        newSelectedList.splice(contactIndex, 1);

        setSelectedList(newSelectedList);
      }

      if (!isSelected) {
        setSelectedList(oldStt => [...oldStt, item]);
      }
    },
    [selectedList],
  );

  const handleRedirect = useCallback(() => {
    setShowAlert(false);
    const newList = selectedList.map(item => ({
      user: {
        name: item.name,
      },
      user_id: item.id,
    }));
    navigation.navigate('ChatRoom', {
      id: chatData.id,
      title: chatData.title,
      is_group: true,
      avatar: chatData.avatar,
      room_users: [...newList],
    });
  }, [chatData, navigation, selectedList]);

  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1, width: '100%'}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <Scroll
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
          }}>
          <UserAvatarContainer>
            {groupAvatar && <GroupAvatar source={{uri: groupAvatar}} />}
            {!groupAvatar && (
              <UserEmptyAvatar>
                <EmptyWrap>
                  <SvgXml xml={emptyIcon} width={69.68} height={49.82} />
                  <EmptyText>Alterar imagem do grupo</EmptyText>
                </EmptyWrap>
              </UserEmptyAvatar>
            )}
            <UserAvatarButton
              activeOpacity={0.6}
              onPress={() => setModalMediaVisible(true)}>
              <SvgXml xml={editAvatar} width={32} height={32} />
            </UserAvatarButton>
          </UserAvatarContainer>

          <Input
            name="nome"
            placeholder={'Nome do grupo'}
            label={'Nome'}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={e => (groupName.current.value = e)}
            handleBlur={() => handleNameBlur(groupName.current.value)}
            error={error}
            keyboardType="default"
          />

          <Row>
            <ContactsListTitle>Participantes</ContactsListTitle>
          </Row>

          <GroupContactsList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={fullList}
            keyExtractor={item => item.id}
            getItemLayout={(data, index) => ({
              length: 62,
              offset: 62 * index,
              index,
            })}
            ItemSeparatorComponent={() => <SeparatorComponent />}
            renderItem={({item}) => (
              <SelectedContactAvatarContainer
                onPress={() => handleContactClick(item)}>
                <SelectedContactAvatar source={{uri: item.avatar}} />

                {selectedList.includes(item) && (
                  <SelectedContactBadge>
                    <SvgXml xml={checkIcon} width={9} height={6} />
                  </SelectedContactBadge>
                )}
              </SelectedContactAvatarContainer>
            )}
          />
        </Scroll>
      </KeyboardAvoidingView>
      <FloatButton onPress={() => handleSignUp(groupName.current.value)}>
        <AuxIcon type={'white'} icon={'arrowRight'} width={35} height={35} />
      </FloatButton>
      <LoadingModal visible={loading} />
      <CustomAlert
        visible={showAlert}
        success
        message={'Grupo criado com sucesso!'}
        confirmButtonText={'OK'}
        onConfirm={() => handleRedirect()}
      />
      <PhotoSelectionModal
        visible={modalMediaVisible}
        setVisible={val => setModalMediaVisible(val)}
        getImage={data => getImage(data)}
        title={'Selecionar foto do grupo'}
      />
    </Container>
  );
};

export default NewGroupDetails;
