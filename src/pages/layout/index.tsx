import React, { useState } from 'react';

import styles from './index.less';
import ToiletList from '@/components/ToiletList';
import UserBar from '@/components/UserBar';
import { ToiletInfo, UserInfo } from '@/typings';
import { Empty } from 'antd';
import DetailInfo from '@/components/DetailInfo';
import { CollapsedContext, ToiletContext, UserInfoContext } from '@/const/context';

const Layout = () => {
  const [toiletInfo, setToiletInfo] = useState<ToiletInfo>({} as ToiletInfo);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <ToiletContext.Provider value={{ toiletInfo, setToiletInfo }}>
        <div className={styles.container}>
          <div className={styles.left}>
            <CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
              <ToiletList />
              {!collapsed && <UserBar />}
            </CollapsedContext.Provider>
          </div>
          <div className={styles.right}>
            {!toiletInfo.id ? (
              <div className={styles.empty}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="请选择公厕"
                />
              </div>
            ) : (
              <DetailInfo />
            )}
          </div>
        </div>
      </ToiletContext.Provider>
    </UserInfoContext.Provider>
  );
};

export default Layout;
