import React, { useContext, useEffect, useState } from 'react';
import { Empty } from 'antd';

import ToiletList from '@/components/ToiletList';
import UserBar from '@/components/UserBar';
import DetailInfo from '@/components/DetailInfo';
import { CollapsedContext, ToiletContext } from '@/const/context';
import { ToiletInfo } from '@/typings';

import styles from './index.less';

const Layout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { toiletInfo, setToiletInfo } = useContext(ToiletContext);

  useEffect(() => {
    setToiletInfo({} as ToiletInfo);
  }, []);

  return (
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
              description="请在左侧选择公厕"
            />
          </div>
        ) : (
          <DetailInfo />
        )}
      </div>
    </div>
  );
};

export default Layout;
