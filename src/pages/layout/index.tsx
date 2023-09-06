import React, { useState } from 'react';

import styles from './index.less';
import ToiletList from '@/components/ToiletList';
import UserBar from '@/components/UserBar';
import { ToiletInfo } from '@/typings';
import { Empty } from 'antd';
import DetailInfo from '@/components/DetailInfo';

export interface ToiletContextProps {
  toiletInfo: ToiletInfo;
  setToiletInfo: (toiletInfo: ToiletInfo) => void;
}

export interface CollapsedContextProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
// 创建全局context
export const ToiletContext = React.createContext<ToiletContextProps>({} as ToiletContextProps);
export const CollapsedContext = React.createContext<CollapsedContextProps>(
  {} as CollapsedContextProps,
);
const Layout = () => {
  const [toiletInfo, setToiletInfo] = useState<ToiletInfo>({} as ToiletInfo);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
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
  );
};

export default Layout;
