import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {createStackNavigator} from '@react-navigation/stack';

import {colors, fonts} from '../global';
import arrowLeftIcon from '../assets/carolinaBandeiraIcons/IconesAuxiliares/white/arrow_left.svg';

import TabRoutes from './tab.routes';
import Info from '../pages/Info';

const App = createStackNavigator();

const AppRoutes = () => {
  return (
    <App.Navigator initialRouteName="MainBottom">
      <App.Screen
        options={{headerShown: false}}
        name="MainBottom"
        component={TabRoutes}
      />
      <App.Screen
        options={({navigation}) => ({
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
        name="Info"
        component={Info}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
