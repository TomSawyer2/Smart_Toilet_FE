import React, { useContext } from 'react';

import styles from './index.less';
import { Select, Input } from 'antd';
const { Search } = Input;
import { ToiletInfoList } from '@/const/ToiletList';
import ListItem from './components/ListItem';
import { CollapsedContext, ToiletContext } from '@/pages/layout';
import { ToiletInfo } from '@/typings';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Location } from '@/const/Location';

const ToiletList = () => {
  // 从全局context中获取数据
  const { toiletInfo, setToiletInfo } = useContext(ToiletContext);
  const { collapsed, setCollapsed } = useContext(CollapsedContext);

  const handleSelectChange = (e: string) => {
    console.log(e);
  };

  const onSearch = (e: string) => {
    console.log(e);
  };

  const handleSelectToilet = (item: ToiletInfo) => {
    setToiletInfo(item);
  };

  return (
    <div
      className={styles.container}
      style={{ width: collapsed ? 64 : 300 }}
    >
      <div className={styles.header}>
        {!collapsed ? (
          <>
            <Select
              defaultValue={Location[0]}
              style={{ width: 150 }}
              onChange={handleSelectChange}
              options={Location.map((item) => {
                return { value: item, label: item };
              })}
            />
            <Search
              placeholder="公厕名称"
              allowClear
              onSearch={onSearch}
              style={{ width: 100 }}
            />
            <div
              className={styles.iconBox}
              onClick={() => setCollapsed(!collapsed)}
            >
              <MenuFoldOutlined className={styles.icon} />
            </div>
          </>
        ) : (
          <div
            className={styles.iconBox}
            onClick={() => setCollapsed(!collapsed)}
          >
            <MenuUnfoldOutlined className={styles.icon} />
          </div>
        )}
      </div>
      <div
        className={styles.list}
        style={{ alignItems: collapsed ? 'center' : '' }}
      >
        {ToiletInfoList.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleSelectToilet(item)}
            >
              {!collapsed ? (
                <ListItem
                  info={item}
                  isSelected={toiletInfo.id === item.id}
                />
              ) : (
                <div
                  className={
                    toiletInfo.id === item.id ? styles.selectedCollapsedItem : styles.collapsedItem
                  }
                >
                  <div className={styles.name}>{item.name[0]}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToiletList;
