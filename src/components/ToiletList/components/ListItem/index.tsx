import React from 'react';
import { ToiletInfo } from '@/typings';

import styles from './index.less';

interface ListItemProps {
  info: ToiletInfo;
  isSelected: boolean;
}

const ListItem = (props: ListItemProps) => {
  const { info, isSelected } = props;

  const getOccupiedStatus = () => {
    const { rooms } = info;
    let occupied = 0;
    const total = rooms.length;
    rooms.forEach((room) => {
      occupied += room.occupied;
    });
    if (occupied / total < 0.5) {
      return <span className={styles.empty}>空闲</span>;
    } else {
      return <span className={styles.busy}>拥挤</span>;
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: isSelected ? '#e4faeb' : '#fff',
      }}
    >
      <div className={styles.header}>
        <span className={styles.name}>{info.name}</span>
        <span className={styles.status}>{getOccupiedStatus()}</span>
      </div>
      <div className={styles.body}>
        {info.rooms.map((room, index) => (
          <div
            className={room.occupied === 1 ? styles.roomBusy : styles.roomEmpty}
            style={{ marginLeft: index === 0 ? 0 : 5 }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ListItem;
