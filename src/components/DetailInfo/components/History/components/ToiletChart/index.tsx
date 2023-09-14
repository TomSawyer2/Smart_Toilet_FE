import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ToiletHistory } from '@/typings';
import dayjs from 'dayjs';
import { getToiletHistory } from '@/services/toilet';
import { ToiletContext } from '@/const/context';

const ToiletChart = () => {
  const { toiletInfo } = useContext(ToiletContext);
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
      render: (text) => {
        return `${text ? text : '--'}°C`;
      },
    },
    {
      title: '湿度',
      dataIndex: 'humidity',
      key: 'humidity',
      render: (text) => {
        return `${text ? text : '--'}%`;
      },
    },
    {
      title: '异味浓度',
      dataIndex: 'airStatus',
      key: 'airStatus',
      render: (text) => {
        return `${text ? text : '--'}%`;
      },
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

  const fetchToiletHistoryList = useCallback(
    async (page: number, pageSize: number) => {
      setLoading(true);
      const res = await getToiletHistory({ page, pageSize, toiletId: toiletInfo.id });
      const { total, list } = res;
      setPage(page);
      setPageSize(pageSize);
      setTotal(total);
      setToiletHistoryList(list);
      setLoading(false);
    },
    [toiletInfo],
  );

  useEffect(() => {
    fetchToiletHistoryList(page, pageSize);
  }, [toiletInfo]);

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
