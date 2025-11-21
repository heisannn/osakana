'use client';

import { useEffect, useState } from 'react';
import styles from './DisplayCombo.module.css';

interface DisplayComboProps {
  combo: number;
}

const DisplayCombo: React.FC<DisplayComboProps> = ({ combo }) => {
  const [prevCombo, setPrevCombo] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (combo > prevCombo) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 500);
      setPrevCombo(combo);
      return () => clearTimeout(timeout);
    } else {
      setPrevCombo(combo);
    }
  }, [combo, prevCombo]);

  if (combo === 0) return null;

  return (
    <div className={styles.container}>
      <span className={`${styles.comboNumber} ${animate ? styles.animate : ''}`}>
        {combo}
      </span>
      <span className={`${styles.comboText} ${animate ? styles.animate : ''}`}>
        COMBO
      </span>
    </div>
  );
};

export default DisplayCombo;
