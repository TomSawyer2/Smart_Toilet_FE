import { UserInfoContextProps, UserInfoContext } from '@/const/context';
import { Menu, message } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { history } from 'umi';
import { LeftOutlined } from '@ant-design/icons';
import User from './components/User';
import Feedback from './components/Feedback';
import DeviceList from './components/Device';
import './index.less';

const Admin = () => {
  const { userInfo } = useContext<UserInfoContextProps>(UserInfoContext);
  if (!userInfo.permission) {
    message.warning('您没有权限访问该页面');
    history.push('/index');
    return null;
  }

  const [selectedKey, setSelectedKey] = useState<string>('1');

  const handleMenuChange = (e: { key: string }) => {
    const { key } = e;
    setSelectedKey(key);
    switch (key) {
      case '0':
        history.push('/index');
        break;
      case '1':
        history.push('/admin#feedback');
        break;
      case '2':
        history.push('/admin#device');
        break;
      case '3':
        history.push('/admin#user');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#feedback') {
      handleMenuChange({ key: '1' });
    } else if (hash === '#device') {
      handleMenuChange({ key: '2' });
    } else if (hash === '#user') {
      handleMenuChange({ key: '3' });
    } else {
      handleMenuChange({ key: '1' });
    }
  }, [window.location.hash]);

  return (
    <div className="admin">
      <div className="admin-left">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          theme="dark"
          style={{ width: 200, height: `100vh` }}
          items={[
            {
              key: '0',
              title: '返回首页',
              label: '返回首页',
              icon: <LeftOutlined />,
            },
            {
              key: '1',
              title: '用户反馈',
              label: '用户反馈',
            },
            {
              key: '2',
              title: '设备管理',
              label: '设备管理',
            },
            {
              key: '3',
              title: '用户管理',
              label: '用户管理',
            },
          ]}
          onClick={(e) => handleMenuChange(e)}
        />
      </div>
      <div className="admin-info">
        {selectedKey === '1' && <Feedback />}
        {selectedKey === '2' && <DeviceList />}
        {selectedKey === '3' && <User />}
      </div>
    </div>
  );
};

export default Admin;
