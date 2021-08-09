/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect, useState} from 'react';
import {TouchableOpacity, Text, Dimensions, View, Image} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {createStackNavigator} from '@react-navigation/stack';

import arrowLeftIcon from '../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_left.svg';
import turnRight from '../assets/carolinaBandeiraIcons/IconesAuxiliares/white/turn_right.svg';
import trash from '../assets/carolinaBandeiraIcons/IconesAuxiliares/white/trash.svg';
// import info from '../assets/carolinaBandeiraIcons/IconesAuxiliares/white/info.svg';

import {colors, fonts} from '../global';
import {useChatHeader} from '../hooks/ChatHeader';
import connection from '../services/socket';

import Chat from '../pages/Chat';
import NewPrivateChat from '../pages/NewPrivateChat';
import NewGroupChat from '../pages/NewGroupChat';
import ChatRoom from '../pages/ChatRoom';
import FowardMessage from '../pages/FowardMessage';
import NewGroupDetails from '../pages/NewGroupDetails';

const screen = Dimensions.get('screen');

const ChatStack = createStackNavigator();

const HomeRoutes = () => {
  const [size, setSize] = useState(0);
  const {
    selected,
    handleRemoveChatObject,
    chatObject,
    toggleSelected,
    handleSetOpenDeleteMessageAlert,
  } = useChatHeader();

  useLayoutEffect(() => {
    setSize(screen.width);
  }, []);

  return (
    <ChatStack.Navigator initialRouteName="Chat">
      <ChatStack.Screen
        options={({navigation}) => ({
          headerTitle: 'Conversas',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.white,
            fontFamily: fonts.robotoMedium,
            fontSize: 16,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: colors.black,
            borderBottomColor: '#A0A0A0',
            borderBottomWidth: 0.5,
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => navigation.navigate('Home')}>
              <SvgXml xml={arrowLeftIcon} width={18} height={18} />
              <Text
                style={{
                  fontFamily: fonts.robotoLight,
                  fontSize: 16,
                  color: colors.white,
                  marginLeft: 5,
                  lineHeight: 16,
                }}>
                voltar
              </Text>
            </TouchableOpacity>
          ),
        })}
        name="Chat"
        component={Chat}
      />
      <ChatStack.Screen
        options={({navigation}) => ({
          headerTitle: 'Criar conversa',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.white,
            fontFamily: fonts.robotoMedium,
            fontSize: 16,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: colors.black,
            borderBottomColor: '#A0A0A0',
            borderBottomWidth: 0.5,
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => navigation.navigate('Chat')}>
              <SvgXml xml={arrowLeftIcon} width={18} height={18} />
              <Text
                style={{
                  fontFamily: fonts.robotoLight,
                  fontSize: 16,
                  color: colors.white,
                  marginLeft: 5,
                  lineHeight: 16,
                }}>
                voltar
              </Text>
            </TouchableOpacity>
          ),
        })}
        name="NewPrivateChat"
        component={NewPrivateChat}
      />
      <ChatStack.Screen
        options={({navigation}) => ({
          headerTitle: 'Selecionar participantes',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.white,
            fontFamily: fonts.robotoMedium,
            fontSize: 16,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: colors.black,
            borderBottomColor: '#A0A0A0',
            borderBottomWidth: 0.5,
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => navigation.navigate('Chat')}>
              <SvgXml xml={arrowLeftIcon} width={18} height={18} />
              <Text
                style={{
                  fontFamily: fonts.robotoLight,
                  fontSize: 16,
                  color: colors.white,
                  marginLeft: 5,
                  lineHeight: 16,
                }}>
                voltar
              </Text>
            </TouchableOpacity>
          ),
        })}
        name="NewGroupChat"
        component={NewGroupChat}
      />
      <ChatStack.Screen
        options={({navigation}) =>
          !selected
            ? chatObject.is_group
              ? {
                  headerTitle: '',
                  headerStyle: {
                    backgroundColor: colors.black,
                    borderBottomColor: '#A0A0A0',
                    borderBottomWidth: 0.5,
                    elevation: 0,
                    shadowColor: 'transparent',
                  },
                  headerLeft: () => (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: size,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          connection.unsubscribe(`room:${chatObject.id}`);
                          handleRemoveChatObject();
                          navigation.navigate('Chat');
                        }}>
                        <SvgXml xml={arrowLeftIcon} width={18} height={18} />
                      </TouchableOpacity>
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 31,
                        }}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            color: colors.white,
                            fontFamily: fonts.robotoMedium,
                            fontSize: 16,
                            fontWeight: '600',
                          }}>
                          {chatObject.title}
                        </Text>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            color: colors.grey,
                            fontFamily: fonts.robotoRegular,
                            fontSize: 12,
                            fontWeight: '500',
                          }}>
                          {chatObject.room_users_names_title}
                        </Text>
                      </View>
                    </View>
                  ),
                }
              : {
                  headerTitle: '',
                  headerStyle: {
                    backgroundColor: colors.black,
                    borderBottomColor: '#A0A0A0',
                    borderBottomWidth: 0.5,
                    elevation: 0,
                    shadowColor: 'transparent',
                  },
                  headerLeft: () => (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: size,
                        paddingLeft: 15,
                        paddingRight: 15,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          connection.unsubscribe(`room:${chatObject.id}`);
                          handleRemoveChatObject();
                          navigation.navigate('Chat');
                        }}>
                        <SvgXml xml={arrowLeftIcon} width={18} height={18} />
                      </TouchableOpacity>
                      <View
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                          backgroundColor: colors.grey,
                          marginLeft: 21,
                        }}>
                        <Image
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            alignSelf: 'center',
                          }}
                          source={{uri: chatObject.avatar}}
                        />
                      </View>
                      <Text
                        style={{
                          color: colors.white,
                          fontFamily: fonts.robotoMedium,
                          fontSize: 16,
                          fontWeight: '600',
                          marginLeft: 11,
                        }}>
                        {chatObject.title}
                      </Text>
                    </View>
                  ),
                }
            : {
                headerTitle: '',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  color: colors.white,
                  fontFamily: fonts.robotoMedium,
                  fontSize: 16,
                  fontWeight: '600',
                },
                headerStyle: {
                  backgroundColor: colors.black,
                  borderBottomColor: '#A0A0A0',
                  borderBottomWidth: 0.5,
                  elevation: 0,
                  shadowColor: 'transparent',
                },
                headerLeft: () => (
                  <View
                    style={{
                      flex: 1,
                      width: size,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingLeft: 15,
                      paddingRight: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        toggleSelected();
                      }}>
                      <SvgXml xml={arrowLeftIcon} width={18} height={18} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      onPress={() => {
                        handleRemoveChatObject();
                        navigation.navigate('Chat');
                      }}>
                      <SvgXml xml={info} width={18} height={18} />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      onPress={() => {
                        handleSetOpenDeleteMessageAlert(true);
                      }}>
                      <SvgXml xml={trash} width={18} height={18} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // handleRemoveChatObject();
                        navigation.navigate('FowardMessage');
                      }}>
                      <SvgXml xml={turnRight} width={18} height={18} />
                    </TouchableOpacity>
                  </View>
                ),
              }
        }
        name="ChatRoom"
        component={ChatRoom}
      />
      <ChatStack.Screen
        options={({navigation}) => ({
          headerTitle: 'Encaminhar mensagem',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.white,
            fontFamily: fonts.robotoMedium,
            fontSize: 16,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: colors.black,
            borderBottomColor: '#A0A0A0',
            borderBottomWidth: 0.5,
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => navigation.navigate('ChatRoom')}>
              <SvgXml xml={arrowLeftIcon} width={18} height={18} />
              <Text
                style={{
                  fontFamily: fonts.robotoLight,
                  fontSize: 16,
                  color: colors.white,
                  marginLeft: 5,
                  lineHeight: 16,
                }}>
                voltar
              </Text>
            </TouchableOpacity>
          ),
        })}
        name="FowardMessage"
        component={FowardMessage}
      />
      <ChatStack.Screen
        options={({navigation}) => ({
          headerTitle: 'Novo grupo',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: colors.white,
            fontFamily: fonts.robotoMedium,
            fontSize: 16,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: colors.black,
            borderBottomColor: '#A0A0A0',
            borderBottomWidth: 0.5,
            elevation: 0,
            shadowColor: 'transparent',
          },
          headerLeft: () => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => navigation.navigate('NewGroupChat')}>
              <SvgXml xml={arrowLeftIcon} width={18} height={18} />
              <Text
                style={{
                  fontFamily: fonts.robotoLight,
                  fontSize: 16,
                  color: colors.white,
                  marginLeft: 5,
                  lineHeight: 16,
                }}>
                voltar
              </Text>
            </TouchableOpacity>
          ),
        })}
        name="NewGroupDetails"
        component={NewGroupDetails}
      />
    </ChatStack.Navigator>
  );
};

export default HomeRoutes;
