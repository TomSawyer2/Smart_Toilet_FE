import React, { useContext } from 'react';

import { Button, Form, Input, Modal } from 'antd';
import { LoginParams } from '@/services/user';

import styles from './index.less';
import { UserInfoContext } from '@/const/context';

interface LoginModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const LoginModal = (props: LoginModalProps) => {
  const { visible, setVisible } = props;
  const [form] = Form.useForm();

  const { setUserInfo } = useContext(UserInfoContext);

  const handleLogin = (values: LoginParams) => {
    console.log(values);
    setUserInfo({
      id: 1,
      username: 'admin',
      permission: 1,
    });
    setVisible(false);
  };

  return (
    <Modal
      title="登录"
      open={visible}
      footer={null}
      width={400}
      centered
      onCancel={() => setVisible(false)}
    >
      <div className={styles.container}>
        <Form
          form={form}
          onFinish={handleLogin}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div className={styles.footer}>
              <Button
                htmlType="submit"
                type="primary"
              >
                登录
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default LoginModal;
