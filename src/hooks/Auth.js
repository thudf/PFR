import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

const AuthContext = createContext({});

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider');
  }

  return context;
}

export const AuthProvider = ({children}) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(false);
  const [updatePasswordError, setUpdatePasswordError] = useState(false);

  const loadStoragedData = useCallback(async () => {
    const [token, user] = await AsyncStorage.multiGet([
      '@carolinaBandeiraApp:token',
      '@carolinaBandeiraApp:user',
    ]);

    if (token[1] && user[1]) {
      api.defaults.headers.authorization = `Bearer ${token[1]}`;
      setData({token: token[1], user: JSON.parse(user[1])});
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadStoragedData();
  }, [loadStoragedData]);

  useEffect(() => {
    if (data.user && !data.user.name) {
      setProfile(false);
    } else {
      setProfile(true);
    }

    if (data.token) {
      console.log('token: ', data.token);
    }
  }, [data]);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@carolinaBandeiraApp:token',
      '@carolinaBandeiraApp:user',
    ]);
    setData({});
  }, []);

  const updateUser = useCallback(
    async user => {
      setUpdateUserError(false);
      try {
        const response = await api.put(`/users/${user.id}`, user);
        setData({user: {...response.data}, token: data.token});
        await AsyncStorage.multiSet([
          ['@carolinaBandeiraApp:user', JSON.stringify(response.data)],
        ]);
      } catch (err) {
        console.log(err.response.data);
        setUpdateUserError(true);
      }
    },
    [data],
  );

  const clearUpdateUserError = useCallback(() => {
    setUpdateUserError(false);
  }, []);

  const updatePassword = useCallback(
    async user => {
      setUpdatePasswordError(false);
      try {
        const response = await api.put(`/users/${user.id}`, user);
        setData({user: {...response.data}, token: data.token});
        await AsyncStorage.multiSet([
          ['@carolinaBandeiraApp:user', JSON.stringify(response.data)],
        ]);
      } catch (err) {
        console.log(err.response.data);
        setUpdatePasswordError(true);
      }
    },
    [data],
  );

  const clearUpdatePasswordError = useCallback(() => {
    setUpdatePasswordError(false);
  }, []);

  const setUser = useCallback(
    async user => {
      setData({user, token: data.token});
      await AsyncStorage.multiSet([
        ['@carolinaBandeiraApp:user', JSON.stringify(user)],
      ]);
    },
    [data],
  );

  const signIn = useCallback(async ({email, password}) => {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });
      const {token, user} = response.data;
      // if (user.active && user.type === 'medic') {
      if (user.active) {
        api.defaults.headers.authorization = `Bearer ${token.token}`;

        await AsyncStorage.multiSet([
          ['@carolinaBandeiraApp:token', token.token],
          ['@carolinaBandeiraApp:user', JSON.stringify(user)],
        ]);
        setData({token: token.token, user});
      } else {
        throw new Error('Usuário não ativo');
      }
    } catch (err) {
      console.log(err.reponse);
      throw new Error();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        profile,
        signIn,
        signOut,
        loading,
        setUser,
        token: data.token,
        updateUser,
        updateUserError,
        clearUpdateUserError,
        updatePassword,
        updatePasswordError,
        clearUpdatePasswordError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
