import React, { useContext, useState } from 'react';

import styles from './index.less';
import { ToiletContext } from '@/pages/layout';
import { FormOutlined } from '@ant-design/icons';
import { RoomInfo, ToiletInfo } from '@/typings';
import { Input, Modal, Radio, RadioChangeEvent, Space } from 'antd';

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
      <div>反馈坑位编号：{info.room_id}</div>
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

const DetailInfo = () => {
  const { toiletInfo } = useContext(ToiletContext);
  const [feedbackValue, setFeedbackValue] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<RoomInfo>({} as RoomInfo);
  const [inputValue, setInputValue] = useState<string>('');

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
          <span style={{ marginLeft: 20 }}>温度：{toiletInfo.temperture}℃</span>
          <span style={{ marginLeft: 20 }}>湿度：{toiletInfo.humidity}%</span>
        </div>
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
          </div>
          <div className={styles.chartItem}>
            <span>坑位占用率曲线图</span>
          </div>
        </div>
      </div>
      <Modal
        title="反馈"
        open={isModalOpen}
        onOk={handleFeedback}
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

export default DetailInfo;
