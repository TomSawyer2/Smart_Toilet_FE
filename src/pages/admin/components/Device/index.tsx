import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { Device } from '@/typings';
import { getDeviceList } from '@/services/admin';

import styles from './index.less';

const DeviceList = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [deviceList, setDeviceList] = useState<Device[]>([]);

  const columns: ColumnsType<Device> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '编号',
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: '原始值',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const fetchDeviceList = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    const res = await getDeviceList({ page, pageSize });
    const { total, list } = res;
    setPage(page);
    setPageSize(pageSize);
    setTotal(total);
    setDeviceList(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDeviceList(page, pageSize);
  }, []);

  return (
    <div className={styles.user}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={deviceList}
        rowKey={(record) => record.id}
        pagination={{
          hideOnSinglePage: true,
          pageSize,
          current: page,
          total,
          onChange(page, pageSize) {
            fetchDeviceList(page, pageSize);
          },
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </div>
  );
};

export default DeviceList;
