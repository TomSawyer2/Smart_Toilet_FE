import React from 'react';

import styles from './index.less';

const UserBar = () => {
  return (
    <div className={styles.container}>
      <span>管理员</span>
      <span
        className={styles.highlight}
        style={{ marginLeft: 6 }}
      >
        注册{'>'}
      </span>
      <span
        className={styles.highlight}
        style={{ marginLeft: 6 }}
      >
        登录{'>'}
      </span>
    </div>
  );
};

export default UserBar;
