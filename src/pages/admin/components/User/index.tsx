import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UserInfo } from '@/typings';

const User = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserInfo[]>([]);

  const columns: ColumnsType<UserInfo> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '权限',
      dataIndex: 'permission',
      key: 'permission',
    },
  ];

  const fetchUserList = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    // const res = await getAdminUserInfo({ page, pageSize });
    // const { total, userList } = res;
    const total = 1;
    const userList: UserInfo[] = [
      {
        id: 1,
        username: 'admin',
        permission: 1,
      },
    ];
    setPage(page);
    setPageSize(pageSize);
    setTotal(total);
    setUserList(userList);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserList(page, pageSize);
  }, []);

  return (
    <div className={styles.user}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={userList}
        rowKey={(record) => record.id}
        pagination={{
          hideOnSinglePage: true,
          pageSize,
          current: page,
          total,
          onChange(page, pageSize) {
            fetchUserList(page, pageSize);
          },
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`,
        }}
      />
    </div>
  );
};

export default User;
