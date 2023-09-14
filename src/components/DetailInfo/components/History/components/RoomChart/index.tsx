import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { RoomHistory } from '@/typings';
import dayjs from 'dayjs';
import { getRoomHistory } from '@/services/room';

interface RoomChartProps {
  toiletId: number;
  roomId: number;
}

const RoomChart = (props: RoomChartProps) => {
  const { toiletId, roomId } = props;
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [roomHistoryList, setRoomHistoryList] = useState<RoomHistory[]>([]);

  const columns: ColumnsType<RoomHistory> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '坑位编号',
      dataIndex: 'roomId',
      key: 'roomId',
    },
    {
      title: '关联的公厕id',
      dataIndex: 'toiletId',
      key: 'toiletId',
    },
    {
      title: '是否被占用',
      dataIndex: 'occupied',
      key: 'occupied',
    },
    {
      title: '维修状态',
      dataIndex: 'status',
      key: 'status',
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

  const fetchRoomHistoryList = useCallback(
    async (page: number, pageSize: number) => {
      setLoading(true);
      const res = await getRoomHistory({ page, pageSize, roomDbId: roomId });
      const { total, list } = res;
      setPage(page);
      setPageSize(pageSize);
      setTotal(total);
      setRoomHistoryList(list);
      setLoading(false);
    },
    [toiletId, roomId],
  );

  useEffect(() => {
    fetchRoomHistoryList(page, pageSize);
  }, [toiletId, roomId]);

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={roomHistoryList}
        rowKey={(record) => record.id}
        pagination={{
          hideOnSinglePage: true,
          pageSize,
          current: page,
          total,
          onChange(page, pageSize) {
            fetchRoomHistoryList(page, pageSize);
          },
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </div>
  );
};

export default RoomChart;
