import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {colors, fonts} from '../global';

import Home from '../pages/Home';

const App = createStackNavigator();

const AppRoutes = () => {
  return (
    <App.Navigator initialRouteName="Home">
      <App.Screen
        options={() => ({
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
        })}
        name="Home"
        component={Home}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
