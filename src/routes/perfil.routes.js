/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {createStackNavigator} from '@react-navigation/stack';

import {colors, fonts} from '../global';
import arrowLeftIcon from '../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_left.svg';

import Perfil from '../pages/Perfil';
import ChangePassword from '../pages/ChangePassword';
import ChangePasswordSuccess from '../pages/ChangePasswordSuccess';

const PerfilStack = createStackNavigator();

const HomeRoutes = () => {
  return (
    <PerfilStack.Navigator initialRouteName="Perfil">
      <PerfilStack.Screen
        options={({navigation}) => ({
          headerTitle: 'Seu perfil',
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
        name="Perfil"
        component={Perfil}
      />
      <PerfilStack.Screen
        options={({navigation}) => ({
          headerTitle: 'Seu perfil',
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
              onPress={() => navigation.navigate('Perfil')}>
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
        name="ChangePassword"
        component={ChangePassword}
      />
      <PerfilStack.Screen
        options={({navigation}) => ({
          headerTitle: 'Seu perfil',
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
              onPress={() => navigation.navigate('Perfil')}>
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
        name="ChangePasswordSuccess"
        component={ChangePasswordSuccess}
      />
    </PerfilStack.Navigator>
  );
};

export default HomeRoutes;
