import React, { useContext } from 'react';

import styles from './index.less';
import { ToiletContext } from '@/pages/layout';

const DetailInfo = () => {
  const { toiletInfo } = useContext(ToiletContext);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.info}>
          <span>{toiletInfo.name}</span>
          <span style={{ marginLeft: 20 }}>温度：{toiletInfo.temperture}℃</span>
          <span style={{ marginLeft: 20 }}>湿度：{toiletInfo.humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
