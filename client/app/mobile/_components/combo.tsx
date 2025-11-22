"use client";

import styles from "./combo.module.scss";

export function Combo(props: { combo: number }) {
  const { combo } = props;

  return (
    <div className={`${styles.container} ${combo > 0 ? styles.animate : ""}`}>
      <span
        className={`${styles.comboNumber} ${combo > 0 ? styles.animate : ""}`}
      >
        {combo}
      </span>
      <span
        className={`${styles.comboText} ${combo > 0 ? styles.animate : ""}`}
      >
        コンボ！
      </span>
    </div>
  );
}
