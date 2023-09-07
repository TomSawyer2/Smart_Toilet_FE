import React from 'react';
import { App, ConfigProvider } from 'antd';

export function rootContainer(container: any) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    >
      <App>{container}</App>
    </ConfigProvider>
  );
}
