import React from 'react';

import {AuthProvider} from './Auth';
import {ChatHeaderProvider} from './ChatHeader';

const AppProvider = ({children}) => {
  return (
    <AuthProvider>
      <ChatHeaderProvider>{children}</ChatHeaderProvider>
    </AuthProvider>
  );
};

export default AppProvider;
