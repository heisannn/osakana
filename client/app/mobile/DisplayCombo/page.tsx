// app/mobile/DisplayCombo/page.tsx
'use client';

import React, { useState } from 'react';
import DisplayCombo from './components/DisplayCombo';

const DisplayComboPage: React.FC = () => {
  const [combo, setCombo] = useState(0);

  const increaseCombo = () => setCombo(prev => prev + 1);
  const resetCombo = () => setCombo(0);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Display Combo Page</h1>
      <DisplayCombo combo={combo} />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={increaseCombo} style={{ marginRight: '1rem' }}>
          Increase Combo
        </button>
        <button onClick={resetCombo}>Reset Combo</button>
      </div>
    </div>
  );
};

export default DisplayComboPage;
