import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, Select, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

import { FeedbackItem } from '@/typings';
import { getFeedbackList } from '@/services/admin';
import { FeedbackStatus } from '@/const/enums';
import { updateFeedback } from '@/services/feedback';
import { updateRoom } from '@/services/room';

import styles from './index.less';

interface ModalContentProps {
  feedbackInfo: FeedbackItem;
  status: number;
  setStatus: (status: number) => void;
}

const ModalContent = (props: ModalContentProps) => {
  const { feedbackInfo, status, setStatus } = props;

  return (
    <div>
      <div style={{ padding: '5px 0' }}>反馈公厕编号：{feedbackInfo.toiletId}</div>
      <div style={{ padding: '5px 0' }}>反馈坑位编号：{feedbackInfo.roomId}</div>
      <div style={{ padding: '5px 0' }}>
        <span>修改坑位状态：</span>
        <Select
          onChange={(e) => setStatus(Number(e))}
          value={status}
          style={{ width: '30%' }}
        >
          <Select.Option value={0}>正常</Select.Option>
          <Select.Option value={1}>已报修</Select.Option>
          <Select.Option value={2}>正在维修</Select.Option>
        </Select>
      </div>
    </div>
  );
};

const Feedback = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem>({} as FeedbackItem);
  const [status, setStatus] = useState<number>(0);

  const columns: ColumnsType<FeedbackItem> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '公厕编号',
      dataIndex: 'toiletId',
      key: 'toiletId',
    },
    {
      title: '坑位编号',
      dataIndex: 'roomId',
      key: 'roomId',
    },
    {
      title: '反馈内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        switch (text) {
          case 0:
            return '未处理';
          case 1:
            return '已处理';
          default:
            return '未知';
        }
      },
    },
    {
      title: '反馈时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => {
        return record.status === FeedbackStatus.UnProcessed ? (
          <div>
            <Button
              onClick={() => {
                setSelectedFeedback(record);
                setOpen(true);
              }}
            >
              修改坑位状态
            </Button>
            <Button
              onClick={() => handleProcess(record.id)}
              type="primary"
              style={{ marginLeft: 10 }}
            >
              标记处理
            </Button>
          </div>
        ) : (
          <div>
            <Button
              onClick={() => {
                setSelectedFeedback(record);
                setOpen(true);
              }}
            >
              修改坑位状态
            </Button>
          </div>
        );
      },
    },
  ];

  const handleProcess = async (feedbackId: number) => {
    Modal.confirm({
      title: '标记处理反馈',
      content: '确定标记处理该反馈吗？',
      onOk: async () => {
        await updateFeedback({ feedbackId, status: FeedbackStatus.Processed });
        message.success('标记处理成功');
        refreshList();
      },
    });
  };

  const handleChangeRoomStatus = async () => {
    await updateRoom({
      roomDbId: selectedFeedback.roomDbId,
      status: status,
    });
    message.success('修改坑位状态成功');
    setOpen(false);
    setSelectedFeedback({} as FeedbackItem);
    setStatus(0);
  };

  const refreshList = () => {
    fetchFeedbackList(page, pageSize);
  };

  const fetchFeedbackList = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    const res = await getFeedbackList({ page, pageSize });
    const { total, list } = res;
    setPage(page);
    setPageSize(pageSize);
    setTotal(total);
    setFeedbackList(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchFeedbackList(page, pageSize);
  }, []);

  return (
    <div className={styles.user}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={feedbackList}
        rowKey={(record) => record.id}
        pagination={{
          hideOnSinglePage: true,
          pageSize,
          current: page,
          total,
          onChange(page, pageSize) {
            fetchFeedbackList(page, pageSize);
          },
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
      <Modal
        title="修改坑位状态度"
        open={open}
        onOk={handleChangeRoomStatus}
        centered
        onCancel={() => {
          setOpen(false);
          setSelectedFeedback({} as FeedbackItem);
        }}
      >
        <ModalContent
          feedbackInfo={selectedFeedback}
          status={status}
          setStatus={setStatus}
        />
      </Modal>
    </div>
  );
};

export default Feedback;
