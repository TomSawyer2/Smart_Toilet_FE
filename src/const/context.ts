import { ToiletInfo, UserInfo } from '@/typings';
import { createContext } from 'react';

export interface ToiletContextProps {
  toiletInfo: ToiletInfo;
  setToiletInfo: (toiletInfo: ToiletInfo) => void;
}

export interface CollapsedContextProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export interface UserInfoContextProps {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const ToiletContext = createContext<ToiletContextProps>({} as ToiletContextProps);
export const CollapsedContext = createContext<CollapsedContextProps>({} as CollapsedContextProps);
export const UserInfoContext = createContext<UserInfoContextProps>({} as UserInfoContextProps);
