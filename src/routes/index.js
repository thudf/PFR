/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import {useAuth} from '../hooks/Auth';
import {colors} from '../global';

const Routes = () => {
  const {loading, user} = useAuth();
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.black,
        }}>
        <ActivityIndicator size="large" color={colors.grey} />
      </View>
    );
  }

  // return user ? <AppRoutes /> : <AuthRoutes />;
  return <AppRoutes />;
};

export default Routes;
