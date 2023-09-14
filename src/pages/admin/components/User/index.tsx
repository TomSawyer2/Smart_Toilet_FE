import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Modal, Select, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { UserInfo } from '@/typings';
import { getUserList, updatePermission } from '@/services/admin';
import { UserInfoContext } from '@/const/context';

import styles from './index.less';

interface ModalContentProps {
  permission: number;
  setPermission: (permission: number) => void;
}

const ModalContent = (props: ModalContentProps) => {
  const { permission, setPermission } = props;
  return (
    <div>
      <span>新权限：</span>
      <Select
        value={permission}
        onChange={(e) => setPermission(e)}
      >
        <Select.Option value={0}>普通用户</Select.Option>
        <Select.Option value={1}>管理员</Select.Option>
        <Select.Option value={2}>超级管理员</Select.Option>
      </Select>
    </div>
  );
};

const User = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const { userInfo } = useContext(UserInfoContext);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserInfo>({} as UserInfo);
  const [permission, setPermission] = useState<number>(0);

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
      render: (text) => {
        switch (text) {
          case 0:
            return '普通用户';
          case 1:
            return '管理员';
          case 2:
            return '超级管理员';
          default:
            return '未知';
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => {
        return userInfo.permission === 2 && record.id !== userInfo.id ? (
          <Button
            onClick={() => {
              setOpen(true);
              setSelectedUser(record);
            }}
          >
            修改权限
          </Button>
        ) : (
          '--'
        );
      },
    },
  ];

  const handleChangePermission = async () => {
    await updatePermission({
      userId: selectedUser.id,
      permission,
    });
    message.success('权限修改成功');
    setOpen(false);
    setSelectedUser({} as UserInfo);
    setPermission(0);
    refreshList();
  };

  const refreshList = useCallback(() => {
    fetchUserList(page, pageSize);
  }, []);

  const fetchUserList = useCallback(async (page: number, pageSize: number) => {
    setLoading(true);
    const res = await getUserList({ page, pageSize });
    const { total, list } = res;
    setPage(page);
    setPageSize(pageSize);
    setTotal(total);
    setUserList(list);
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
      <Modal
        title="修改权限"
        open={open}
        onOk={handleChangePermission}
        centered
        onCancel={() => {
          setOpen(false);
          setSelectedUser({} as UserInfo);
        }}
      >
        <ModalContent
          permission={permission}
          setPermission={setPermission}
        />
      </Modal>
    </div>
  );
};

export default User;
