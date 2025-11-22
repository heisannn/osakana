"use client";

import { useState, useMemo } from "react";
import { saveIndexToCookie } from "../actions";
import styles from "./keypad.module.scss";

export function Keypad() {
  const numbers = useMemo(
    () => Array.from({ length: 10 }, (_, i) => i + 1),
    [],
  );

  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleNumberSelect = async (number: number) => {
    if (isSaving) {
      return;
    }

    const problemNumber = String(number);

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("input", problemNumber);

      await saveIndexToCookie(formData);

      setSelectedNumber(number);
    } catch (error) {
      // エラー処理
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {numbers.map((number) => (
          <button
            key={number}
            onClick={() => handleNumberSelect(number)}
            disabled={isSaving}
            className={`${styles.button} ${selectedNumber === number ? styles.selected : ""
              }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}
