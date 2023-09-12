import React from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { history } from 'umi';

import { LoginParams, login } from '@/services/user';

import styles from './index.less';

interface LoginModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const LoginModal = (props: LoginModalProps) => {
  const { visible, setVisible } = props;
  const [form] = Form.useForm();

  const handleLogin = async (values: LoginParams) => {
    const { username, password } = values;
    const token = await login({ username, password });
    window.localStorage.setItem('token', token);
    message.success('登录成功！');
    setVisible(false);
    history.go(0);
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
