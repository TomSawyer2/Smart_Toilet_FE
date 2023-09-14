import React, { useCallback, useContext, useEffect, useState } from 'react';

import styles from './index.less';
import { Empty, Select, Spin, Tooltip } from 'antd';
// const { Search } = Input;
import ListItem from './components/ListItem';
import { ToiletInfo } from '@/typings';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Location } from '@/const/Location';
import { CollapsedContext, ToiletContext } from '@/const/context';
import { getToiletList } from '@/services/toilet';

const ToiletList = () => {
  const { toiletInfo, setToiletInfo } = useContext(ToiletContext);
  const { collapsed, setCollapsed } = useContext(CollapsedContext);
  const [selectedBuilding, setSelectedBuilding] = useState<string>('东九A栋');
  const [toiletInfoList, setToiletInfoList] = useState<ToiletInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchToiletInfoList();
  }, []);

  const fetchToiletInfoList = useCallback(async () => {
    setLoading(true);
    const res = await getToiletList();
    setToiletInfoList(res);
    setLoading(false);
  }, []);

  const handleSelectChange = useCallback((e: string) => {
    setSelectedBuilding(e);
    setToiletInfo({} as ToiletInfo);
  }, []);

  // const onSearch = (e: string) => {
  //   console.log(e);
  // };

  const handleSelectToilet = useCallback((item: ToiletInfo) => {
    setToiletInfo(item);
  }, []);

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
              value={selectedBuilding}
              onChange={handleSelectChange}
              options={Location.map((item) => {
                return { value: item, label: item };
              })}
            />
            {/* <Search
              placeholder="公厕名称"
              allowClear
              onSearch={onSearch}
              style={{ width: 100 }}
            /> */}
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
        {selectedBuilding === '东九A栋' ? (
          loading ? (
            <Spin />
          ) : (
            toiletInfoList.map((item, index) => {
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
                    <Tooltip
                      placement="right"
                      title={item.name}
                    >
                      <div
                        className={
                          toiletInfo.id === item.id
                            ? styles.selectedCollapsedItem
                            : styles.collapsedItem
                        }
                      >
                        <div className={styles.name}>{item.name[0]}</div>
                      </div>
                    </Tooltip>
                  )}
                </div>
              );
            })
          )
        ) : (
          <Empty
            description="暂无公厕数据"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </div>
    </div>
  );
};

export default ToiletList;
