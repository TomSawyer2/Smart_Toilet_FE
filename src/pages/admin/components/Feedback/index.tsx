import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FeedbackItem } from '@/typings';
import dayjs from 'dayjs';

const Feedback = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);

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
      title: '反馈时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  const fetchFeedbackList = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    // const res = await getAdminUserInfo({ page, pageSize });
    // const { total, userList } = res;
    const total = 1;
    const userList: FeedbackItem[] = [
      {
        id: 1,
        toiletId: 1,
        roomId: 1,
        content: '坑位堵塞',
        updateTime: '2021-05-01 12:00:00',
      },
    ];
    setPage(page);
    setPageSize(pageSize);
    setTotal(total);
    setFeedbackList(userList);
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
    </div>
  );
};

export default Feedback;
