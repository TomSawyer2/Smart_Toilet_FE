import React, { useState } from 'react';

import { ToiletInfo, UserInfo } from '@/typings';
import { ToiletContext, UserInfoContext } from '@/const/context';
import { IRouteComponentProps } from 'umi';

const Layout = (props: IRouteComponentProps) => {
  const [toiletInfo, setToiletInfo] = useState<ToiletInfo>({} as ToiletInfo);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <ToiletContext.Provider value={{ toiletInfo, setToiletInfo }}>
        {props.children}
      </ToiletContext.Provider>
    </UserInfoContext.Provider>
  );
};

export default Layout;
