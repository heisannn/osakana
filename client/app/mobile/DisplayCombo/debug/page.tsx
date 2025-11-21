// app/mobile/DisplayCombo/debug/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import DisplayCombo from '../components/DisplayCombo';

const DebugDisplayComboPage: React.FC = () => {
  const [combo, setCombo] = useState(0);

  // デバッグ用: 0.5秒ごとにコンボを増やす
  useEffect(() => {
    const interval = setInterval(() => {
      setCombo(prev => (prev < 10 ? prev + 1 : 0)); // 10コンボでリセット
    }, 500);

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Debug Display Combo</h1>
      <DisplayCombo combo={combo} />
    </div>
  );
};

export default DebugDisplayComboPage;
