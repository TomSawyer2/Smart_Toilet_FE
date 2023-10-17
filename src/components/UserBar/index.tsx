import React, { useContext, useState } from 'react';
import { Dropdown, MenuProps, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { history } from 'umi';

import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import { UserInfoContext } from '@/const/context';
import { UserInfo } from '@/typings';

import styles from './index.less';

const UserBar = () => {
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [registerModalVisible, setRegisterModalVisible] = useState<boolean>(false);

  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  const items: MenuProps['items'] = [
    {
      label: '用户反馈',
      key: '1',
    },
    {
      label: '设备管理',
      key: '2',
    },
    {
      label: '用户管理',
      key: '3',
    },
    {
      label: '退出登录',
      key: '4',
      danger: true,
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case '1':
        history.push('/admin#feedback');
        break;
      case '2':
        history.push('/admin#device');
        break;
      case '3':
        history.push('/admin#user');
        break;
      case '4':
        message.success('退出登录');
        localStorage.removeItem('token');
        setUserInfo({} as UserInfo);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      {userInfo.permission ? (
        <Dropdown menu={{ items, onClick }}>
          <div className={styles.dropdown}>
            <UserOutlined />
            <span style={{ marginLeft: 8 }}>{userInfo.username}</span>
          </div>
        </Dropdown>
      ) : (
        <>
          <span>管理员</span>
          <span
            className={styles.highlight}
            style={{ marginLeft: 6 }}
            onClick={() => setRegisterModalVisible(true)}
          >
            注册{'>'}
          </span>
          <RegisterModal
            visible={registerModalVisible}
            setVisible={setRegisterModalVisible}
          />
          <span
            className={styles.highlight}
            style={{ marginLeft: 6 }}
            onClick={() => setLoginModalVisible(true)}
          >
            登录{'>'}
          </span>
          <LoginModal
            visible={loginModalVisible}
            setVisible={setLoginModalVisible}
          />
        </>
      )}
    </div>
  );
};

export default UserBar;
