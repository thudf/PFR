/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {createStackNavigator} from '@react-navigation/stack';

import {colors, fonts} from '../global';
import arrowLeftIcon from '../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_left.svg';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import CreateAccountSuccess from '../pages/CreateAccountSuccess';

const Auth = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Auth.Navigator initialRouteName="SignIn">
      <Auth.Screen
        options={{
          headerTitle: 'Login',
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
        }}
        name="SignIn"
        component={SignIn}
      />
      <Auth.Screen
        options={({navigation}) => ({
          headerTitle: 'Criar conta',
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
              onPress={() => navigation.navigate('SignIn')}>
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
        name="SignUp"
        component={SignUp}
      />
      <Auth.Screen
        options={({navigation}) => ({
          headerTitle: 'Criar conta',
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
              onPress={() => navigation.navigate('SignIn')}>
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
        name="CreateAccountSuccess"
        component={CreateAccountSuccess}
      />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
