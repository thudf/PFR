import React from 'react';
import {View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import HomeStack from './home.routes';
import ChatStack from './chat.routes';
import PerfilStack from './perfil.routes';

import {colors, fonts} from '../global';

import InitActiveIcon from '../assets/carolinaBandeiraIcons/IconesNavegacao/home_filled.svg';
import ChatActiveIcon from '../assets/carolinaBandeiraIcons/IconesNavegacao/chat_filled.svg';
import UserActiveIcon from '../assets/carolinaBandeiraIcons/IconesNavegacao/user_filled.svg';
import InactiveInitIcon from '../assets/carolinaBandeiraIcons/IconesNavegacao/home_outlined.svg';
import InactiveChatIcon from '../assets/carolinaBandeiraIcons/IconesNavegacao/chat_outlined.svg';
import InactiveUserIcon from '../assets/carolinaBandeiraIcons/IconesNavegacao/user_outlined.svg';

Icon.loadFont();

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          height: 75,
          borderTopColor: '#A0A0A0',
          borderTopWidth: 0.5,
          elevation: 0,
          shadowColor: 'transparent',
        },
        showLabel: false,
        tabStyle: {
          backgroundColor: colors.black,
          paddingTop: 15,
          paddingBottom: 15,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <SvgXml
                  fill="#C5913F"
                  xml={InitActiveIcon}
                  width={28}
                  height={25}
                />
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: 12,
                    fontWeight: 'bold',
                    lineHeight: 12,
                    color: colors.mustard,
                    marginTop: 5,
                  }}>
                  Início
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <SvgXml xml={InactiveInitIcon} width={28} height={25} />
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: 12,
                    fontWeight: 'normal',
                    lineHeight: 12,
                    color: colors.white,
                    marginTop: 5,
                  }}>
                  Início
                </Text>
              </View>
            ),
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <SvgXml xml={ChatActiveIcon} width={28} height={25} />
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: 12,
                    fontWeight: 'bold',
                    lineHeight: 12,
                    color: colors.mustard,
                    marginTop: 5,
                  }}>
                  Chat
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <SvgXml xml={InactiveChatIcon} width={28} height={25} />
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: 12,
                    fontWeight: 'normal',
                    lineHeight: 12,
                    color: colors.white,
                    marginTop: 5,
                  }}>
                  Chat
                </Text>
              </View>
            ),
        }}
        name="Chat"
        component={ChatStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <SvgXml xml={UserActiveIcon} width={28} height={25} />
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: 12,
                    fontWeight: 'bold',
                    lineHeight: 12,
                    color: colors.mustard,
                    marginTop: 5,
                  }}>
                  Perfil
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <SvgXml xml={InactiveUserIcon} width={28} height={25} />
                <Text
                  style={{
                    fontFamily: fonts.robotoRegular,
                    fontSize: 12,
                    fontWeight: 'normal',
                    lineHeight: 12,
                    color: colors.white,
                    marginTop: 5,
                  }}>
                  Perfil
                </Text>
              </View>
            ),
        }}
        name="Perfil"
        component={PerfilStack}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
