"use client";

import { useState } from "react";
import styles from "./Contacts.module.scss";

export default function Contacts() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className={styles.contacts}>
      <form>
        <label>
          ФИО <span>*</span>
        </label>

        <input className={styles.fio} type="text" required />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.file}
          required
        />

        {preview && (
          <img src={preview} alt="preview" className={styles.preview} />
        )}
      </form>
    </div>
  );
}
