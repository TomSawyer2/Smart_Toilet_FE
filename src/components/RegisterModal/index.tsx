import React from 'react';

import { Button, Form, Input, Modal, message } from 'antd';
import { RegisterParams } from '@/services/user';

import styles from './index.less';

interface RegisterModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const RegisterModal = (props: RegisterModalProps) => {
  const { visible, setVisible } = props;
  const [form] = Form.useForm();

  const handleLogin = (values: RegisterParams & { password2: string }) => {
    const { password2, password } = values;
    if (password !== password2) {
      message.error('两次输入的密码不一致');
      return;
    }
    console.log(values);
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
          <Form.Item
            label="确认密码"
            name="password2"
            rules={[{ required: true, message: '请再次输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div className={styles.footer}>
              <Button
                htmlType="submit"
                type="primary"
              >
                注册
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default RegisterModal;
