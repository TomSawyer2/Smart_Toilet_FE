import React, { useState } from 'react';
import Info from './components/Info';
import History from './components/History';

import styles from './index.less';

const DetailInfo = () => {
  const [mode, setMode] = useState<'info' | 'history'>('info');

  return (
    <div className={styles.container}>
      {mode === 'info' ? <Info setMode={setMode} /> : <History setMode={setMode} />}
    </div>
  );
};

export default DetailInfo;
