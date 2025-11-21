"use client";

import { useState } from "react";

type InputFormProps = {
  onSubmitAction: (formData: FormData) => Promise<void>;
  buttonText: string;
};

export function InputForm({ onSubmitAction, buttonText }: InputFormProps) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      await onSubmitAction(formData);
      setMessage("データを保存しました。NFCタグをスキャンしてください。");
    } catch (error) {
      setMessage(`エラー: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: "400px",
        border: "1px solid #ccc",
      }}
    >
      <div>
        <label
          htmlFor="string"
          style={{ display: "block", marginBottom: "0.5rem" }}
        >
          {buttonText}
        </label>
        <input
          id="input"
          name="input"
          type="string"
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        style={{ padding: "10px", cursor: "pointer" }}
      >
        {loading ? "保存中..." : "確定"}
      </button>
      {message && (
        <p style={{ color: loading ? "blue" : "green" }}>{message}</p>
      )}
    </form>
  );
}
