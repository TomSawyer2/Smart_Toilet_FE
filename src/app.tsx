import React from 'react';
import { App, ConfigProvider } from 'antd';
import { history } from 'umi';

// @ts-ignore
export function onRouteChange({ location }) {
  if (location.pathname === '/') {
    history.push('/index');
  }
}

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
