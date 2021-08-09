import React, {useEffect, useState, useRef} from 'react';
import 'react-native-gesture-handler';
import {StatusBar, Animated} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';

import './services/window.js';

import AppProvider from './hooks';
import Routes from './routes';

import {colors} from './global';
import logoImg from './assets/logo.png';

import {AnimatedView, InnerView, Logo} from './styles';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  });

  if (loading) {
    return (
      <>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.black}
          translucent
        />
        <InnerView>
          <AnimatedView style={{opacity: fadeAnim}}>
            <Logo source={logoImg} />
          </AnimatedView>
        </InnerView>
      </>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.black}
        translucent
      />
      <AppProvider>
        <Provider>
          <InnerView>
            <Routes />
          </InnerView>
        </Provider>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
