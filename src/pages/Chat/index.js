import React from 'react';
import {View, Text} from 'react-native';

import {colors, fonts} from '../../global';

const Chat = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: fonts.robotoBold,
          fontSize: 20,
          color: colors.white,
        }}>
        CHAT
      </Text>
    </View>
  );
};

export default Chat;
