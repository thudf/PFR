/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {createStackNavigator} from '@react-navigation/stack';

import {colors, fonts} from '../global';
import infoIcon from '../assets/carolinaBandeiraIcons/IconesAuxiliares/white/info.svg';

import Home from '../pages/Home';

const HomeStack = createStackNavigator();

const HomeRoutes = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        options={({navigation}) => ({
          headerTitle: 'Início',
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
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => navigation.navigate('Info')}>
              <SvgXml xml={infoIcon} width={20} height={20} />
            </TouchableOpacity>
          ),
        })}
        name="Home"
        component={Home}
      />
    </HomeStack.Navigator>
  );
};

export default HomeRoutes;
