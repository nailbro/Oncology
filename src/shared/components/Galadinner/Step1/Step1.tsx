'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Step1.module.scss';

interface Step1Props {
  onSubmit: (data: any) => void;
}

export default function Step1({ onSubmit }: Step1Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  });

  const validateName = (value: string) => {
    if (!/^[А-ЯЁа-яё\s]+$/.test(value)) return false;

    const words = value.trim().split(/\s+/);
    return words.length === 3;
  };

  const validatePhone = (value: string) => /^(\+996\d{9}|0\d{9})$/.test(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'name') {
      setErrors(prev => ({
        ...prev,
        name: validateName(value)
          ? ''
          : 'Введите ФИО полностью на русском языке',
      }));
    }
    if (name === 'phone') {
      setErrors(prev => ({
        ...prev,
        phone: validatePhone(value)
          ? ''
          : 'Номер должен начинаться с +996 или 0',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateName(formData.name)) {
      setErrors(prev => ({
        ...prev,
        name: 'Введите ФИО полностью (Имя Фамилия Отчество) на русском языке',
      }));
      return;
    }
    if (!validatePhone(formData.phone)) {
      setErrors(prev => ({
        ...prev,
        phone: 'Неверный формат номера телефона',
      }));
      return;
    }

    onSubmit(formData);
  };

  return (
    <motion.div
      className={styles.step}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.flex}>
          <div className={styles.column}>
            <label>
              ФИО <span>*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Иванов Иван Иванович"
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
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
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
              required
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className={styles.column}>
            <label>
              Номер <span>*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+996 или 0"
            />
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>
        </div>

        <div className={styles.priceInfo}>
          Стоимость участия: <strong>3500 сом</strong>
        </div>

        <button type="submit" className={styles.submitButton}>
          Далее
        </button>
      </form>
    </motion.div>
  );
}