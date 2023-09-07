import React, { useContext, useState } from 'react';
import { ToiletContext } from '@/const/context';
import { Select } from 'antd';

import styles from './index.less';
import ToiletChart from './components/ToiletChart';
import RoomChart from './components/RoomChart';

interface HistoryProps {
  setMode: (mode: 'info' | 'history') => void;
}

const History = (props: HistoryProps) => {
  const { setMode } = props;
  const { toiletInfo } = useContext(ToiletContext);
  const [currentShowInfo, setCurrentShowInfo] = useState<string>('all');

  const handleSelectChange = (e: string) => {
    setCurrentShowInfo(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span
          className={styles.history}
          onClick={() => setMode('info')}
        >
          {'<'}返回
        </span>
        <div className={styles.info}>
          <span>{toiletInfo.name}</span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyHeader}>
          <Select
            className={styles.select}
            value={currentShowInfo}
            onChange={(e) => handleSelectChange(e)}
          >
            <Select.Option value="all">整体数据</Select.Option>
            {toiletInfo.rooms.map((room) => {
              return (
                <Select.Option
                  value={room.id}
                  key={room.id}
                >
                  坑位{room.id}
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <div className={styles.bodyChart}>
          {currentShowInfo === 'all' ? (
            <ToiletChart />
          ) : (
            <RoomChart
              roomId={Number(currentShowInfo)}
              toiletId={toiletInfo.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
