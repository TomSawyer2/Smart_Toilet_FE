import React, { useContext, useState } from 'react';

import { FormOutlined, SyncOutlined } from '@ant-design/icons';
import { RoomInfo, ToiletInfo } from '@/typings';
import { Button, Input, Modal, Radio, RadioChangeEvent, Space } from 'antd';
import { SmellData } from '@/const/SmellData';
import { OccupiedData } from '@/const/OccupiedData';
import { ToiletContext, UserInfoContext, UserInfoContextProps } from '@/const/context';
import LineChart from '@/components/LineChart';

import styles from './index.less';

interface ModalContentProps {
  toiletInfo: ToiletInfo;
  roomInfo: RoomInfo;
  feedbackValue: number;
  setFeedbackValue: (value: number) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const ModalContent = (props: ModalContentProps) => {
  const {
    toiletInfo,
    roomInfo: info,
    feedbackValue,
    setFeedbackValue,
    inputValue,
    setInputValue,
  } = props;

  return (
    <div className={styles.feedback}>
      <div>反馈公厕名：{toiletInfo.name}</div>
      <div>反馈坑位编号：{info.roomId}</div>
      <div>反馈原因：</div>
      <div>
        <Radio.Group
          onChange={(e: RadioChangeEvent) => {
            setFeedbackValue(e.target.value);
          }}
          value={feedbackValue}
        >
          <Space direction="vertical">
            <Radio value={1}>门锁损坏</Radio>
            <Radio value={2}>异味严重</Radio>
            <Radio value={3}>
              其他
              {feedbackValue === 3 ? (
                <Input
                  style={{ width: 100, marginLeft: 10 }}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
              ) : null}
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  );
};

const calcTempText = (temp: number) => {
  if (temp < 10) {
    return <span className={styles.cold}>{temp}℃</span>;
  } else if (temp > 30) {
    return <span className={styles.hot}>{temp}℃</span>;
  } else {
    return <span className={styles.normal}>{temp}℃</span>;
  }
};

interface InfoProps {
  setMode: (mode: 'info' | 'history') => void;
}

const Info = (props: InfoProps) => {
  const { setMode } = props;
  const { toiletInfo } = useContext(ToiletContext);
  const [feedbackValue, setFeedbackValue] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomInfo>({} as RoomInfo);
  const [inputValue, setInputValue] = useState<string>('');
  const { userInfo } = useContext<UserInfoContextProps>(UserInfoContext);

  const handleFeedback = () => {
    console.log('submit', selectedRoom, feedbackValue, inputValue);
    setIsModalOpen(false);
    setSelectedRoom({} as RoomInfo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.info}>
          <span>{toiletInfo.name}</span>
          <span style={{ marginLeft: 20 }}>温度：{calcTempText(toiletInfo.temperture)}</span>
          <span style={{ marginLeft: 20 }}>湿度：{toiletInfo.humidity}%</span>
          {userInfo.permission && (
            <span style={{ marginLeft: 10 }}>
              <Button>
                <SyncOutlined />
                一键换气
              </Button>
            </span>
          )}
        </div>
        {userInfo.permission && (
          <span
            className={styles.history}
            onClick={() => setMode('history')}
          >
            历史数据{'>'}
          </span>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.bodyLeft}>
          {toiletInfo.rooms.map((room) => (
            <div
              className={room.occupied ? styles.roomOccupied : styles.roomEmpty}
              key={room.id}
            >
              <div
                className={styles.iconBox}
                onClick={() => {
                  setIsModalOpen(true);
                  setSelectedRoom(room);
                }}
              >
                <FormOutlined />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.bodyRight}>
          <div className={styles.chartItem}>
            <span>异味浓度曲线图</span>
            <div className={styles.chart}>
              <LineChart
                data={SmellData}
                name="异味浓度"
                color="#ff6666"
              />
            </div>
          </div>
          <div className={styles.chartItem}>
            <span>坑位占用率曲线图</span>
            <div className={styles.chart}>
              <LineChart
                data={OccupiedData}
                name="坑位占用率"
                color="#54c629"
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="反馈"
        open={isModalOpen}
        onOk={handleFeedback}
        centered
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedRoom({} as RoomInfo);
        }}
      >
        <ModalContent
          toiletInfo={toiletInfo}
          roomInfo={selectedRoom}
          feedbackValue={feedbackValue}
          setFeedbackValue={setFeedbackValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </Modal>
    </div>
  );
};

export default Info;
