"use client";

import { useEffect, useState } from "react";
import styles from "./combo.module.css";

export function Combo(props: { combo: number }) {
  const [prevCombo, setPrevCombo] = useState(0);
  const [animate, setAnimate] = useState(false);

  const { combo } = props;

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
      <span
        className={`${styles.comboNumber} ${animate ? styles.animate : ""}`}
      >
        {combo}
      </span>
      <span className={`${styles.comboText} ${animate ? styles.animate : ""}`}>
        COMBO
      </span>
    </div>
  );
}
