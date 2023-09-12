import React, { useCallback, useEffect, useState } from 'react';
import { IRouteComponentProps } from 'umi';
import { Spin } from 'antd';

import { ToiletInfo, UserInfo } from '@/typings';
import { ToiletContext, UserInfoContext } from '@/const/context';
import { getUserInfo } from '@/services/user';

const Layout = (props: IRouteComponentProps) => {
  const [toiletInfo, setToiletInfo] = useState<ToiletInfo>({} as ToiletInfo);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [initialLizing, setInitialLizing] = useState<boolean>(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = useCallback(async () => {
    try {
      setInitialLizing(true);
      const res = await getUserInfo();
      setUserInfo(res);
    } catch (error) {
      console.error(error);
    }
    setInitialLizing(false);
  }, [localStorage.getItem('token')]);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <ToiletContext.Provider value={{ toiletInfo, setToiletInfo }}>
        {initialLizing ? <Spin /> : props.children}
      </ToiletContext.Provider>
    </UserInfoContext.Provider>
  );
};

export default Layout;
