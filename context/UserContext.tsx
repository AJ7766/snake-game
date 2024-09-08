import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserObjectProps } from '../src/types/types';

interface UserContextType {
  userList: UserObjectProps[];
  setUserList: React.Dispatch<React.SetStateAction<UserObjectProps[]>>;
  userScoreList: UserObjectProps[];
  setUserScoreList: React.Dispatch<React.SetStateAction<UserObjectProps[]>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userList, setUserList] = useState<UserObjectProps[]>([]);
  const [userScoreList, setUserScoreList] = useState<UserObjectProps[]>([]);

  return (
    <UserContext.Provider value={{ userList, setUserList, userScoreList, setUserScoreList }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('UserContext must be used within a UserProvider');
  }
  return context;
};