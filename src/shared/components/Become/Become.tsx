"use client";

import { useState } from "react";
import styles from "./Become.module.scss";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
}

export default function BecomeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      const nameParts = value.trim().split(/\s+/);
      setErrors((prev) => ({
        ...prev,
        name:
          value.length === 0
            ? "ФИО обязательно"
            : nameParts.length !== 3
            ? "Введите Фамилию, Имя и Отчество"
            : undefined,
      }));
    }

    if (name === "phone") {
      const phoneRegex = /^(?:\+996\d{9}|0\d{9})$/;
      setErrors((prev) => ({
        ...prev,
        phone:
          value.length === 0
            ? "Номер телефона обязателен"
            : !phoneRegex.test(value)
            ? "Номер должен начинаться с +996 или 0 и быть корректным"
            : undefined,
      }));
    }
  };

  const validateForm = () => {
    const nameParts = formData.name.trim().split(/\s+/);
    const phoneRegex = /^(?:\+996\d{9}|0\d{9})$/;

    const newErrors: typeof errors = {};
    if (nameParts.length !== 3) newErrors.name = "Введите Фамилию, Имя и Отчество";
    if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Телефон должен начинаться с +996 или 0 и быть корректным";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Данные успешно отправлены!");
        setFormData({ name: "", email: "", company: "", phone: "" });
        setErrors({});
        onClose();
      } else {
        alert("Ошибка при отправке: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сети, попробуйте позже");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Стать участником</h3>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.flex}>
            <div className={styles.column}>
              <label>
                ФИO <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.column}>
              <label>
                Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles.column}>
              <label>
                Название компании <span>*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.column}>
              <label>
                Номер <span>*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className={styles.error}>{errors.phone}</p>}
            </div>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
    </div>
  );
}