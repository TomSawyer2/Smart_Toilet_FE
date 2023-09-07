import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ToiletHistory } from '@/typings';
import dayjs from 'dayjs';

const ToiletChart = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [toiletHistoryList, setToiletHistoryList] = useState<ToiletHistory[]>([]);

  const columns: ColumnsType<ToiletHistory> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '温度',
      dataIndex: 'temperature',
      key: 'temperature',
    },
    {
      title: '湿度',
      dataIndex: 'humidity',
      key: 'humidity',
    },
    {
      title: '异味浓度',
      dataIndex: 'airStatus',
      key: 'airStatus',
    },
    {
      title: '时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (text) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  const fetchToiletHistoryList = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    // const res = await getAdminUserInfo({ page, pageSize });
    // const { total, userList } = res;
    const total = 1;
    const toiletHistory: ToiletHistory[] = [
      {
        id: 1,
        name: '公厕1',
        temperature: 1,
        humidity: 1,
        airStatus: 1,
        updateTime: '2021-05-01 12:00:00',
      },
    ];
    setPage(page);
    setPageSize(pageSize);
    setTotal(total);
    setToiletHistoryList(toiletHistory);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchToiletHistoryList(page, pageSize);
  }, []);

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={toiletHistoryList}
        rowKey={(record) => record.id}
        pagination={{
          hideOnSinglePage: true,
          pageSize,
          current: page,
          total,
          onChange(page, pageSize) {
            fetchToiletHistoryList(page, pageSize);
          },
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </div>
  );
};

export default ToiletChart;
