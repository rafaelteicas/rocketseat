import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';
import React, { createContext, useEffect, useState } from 'react';

export type AuthContextDataProps = {
  user: UserDTO;
  isLoadingStorageUserData: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  updateUserProfile: (user: UserDTO) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingStorageUserData, setIsLoadingStorageUserData] = useState(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
    try {
      await storageUserSave(userData);
      await storageAuthTokenSave(token, refresh_token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUserData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });
      if (data.user && data.token && data.refresh_token) {
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUserData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingStorageUserData(true);
      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();
      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUserData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingStorageUserData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingStorageUserData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ user, isLoadingStorageUserData, signIn, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
