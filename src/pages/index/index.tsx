import React, { useContext, useState } from 'react';

import styles from './index.less';
import ToiletList from '@/components/ToiletList';
import UserBar from '@/components/UserBar';
import { Empty } from 'antd';
import DetailInfo from '@/components/DetailInfo';
import { CollapsedContext, ToiletContext } from '@/const/context';

const Layout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { toiletInfo } = useContext(ToiletContext);
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
