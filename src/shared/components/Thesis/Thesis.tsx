'use client';

import { useState, useRef } from 'react';
import styles from './thesis.module.scss';

interface ThesisProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function Thesis({ open, onClose, onSuccess }: ThesisProps) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'name') {
      const rusRegex = /^[А-ЯЁа-яё\s]*$/;
      setErrors(prev => ({ ...prev, name: rusRegex.test(value) ? '' : 'ФИО должно быть на русском языке' }));
    }

    if (name === 'phone') {
      const phoneRegex = /^(\+996\d{9}|0\d{9})$/;
      setErrors(prev => ({ ...prev, phone: phoneRegex.test(value) || !value ? '' : 'Номер должен начинаться с +996 или 0' }));
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileClick = () => fileInputRef.current?.click();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const rusRegex = /^[А-ЯЁа-яё\s]+$/;
    const phoneRegex = /^(\+996\d{9}|0\d{9})$/;

    if (!rusRegex.test(formData.name) || !phoneRegex.test(formData.phone) || !file) {
      alert('Проверьте правильность введённых данных и выберите файл .doc/.docx');
      return;
    }

    const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Можно загружать только .doc или .docx');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('company', formData.company);
    form.append('phone', formData.phone);
    form.append('file', file);

    setSubmitting(true);
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${BACKEND_URL}/api/thesis`, {
      method: 'POST',
      body: form, 
    });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message);
      }

      alert('Тезис успешно отправлен!');
      setFormData({ name: '', email: '', company: '', phone: '' });
      setFile(null);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      alert('Ошибка: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Отправить тезис</h3>
        <button className={styles.close} onClick={onClose}>×</button>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.flex}>
            <div className={styles.column}>
              <label>ФИO<span>*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              {errors.name && <div style={{ color: 'red', fontSize: 14 }}>{errors.name}</div>}
            </div>
            <div className={styles.column}>
              <label>Email<span>*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className={styles.flex}>
            <div className={styles.column}>
              <label>Название компании<span>*</span></label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} required />
            </div>
            <div className={styles.column}>
              <label>Номер<span>*</span></label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+996 или 0"
                required
              />
              {errors.phone && <div style={{ color: 'red', fontSize: 14 }}>{errors.phone}</div>}
            </div>
          </div>
<div className={styles.requirements}>
  <a  href="/assets/thesisRequire.docx">Требования к оформлению тезиса</a>
</div>
<div className={styles.Reception}>
  <span>Прием тезисов: до 15 июля 2025 года.</span>
</div>
          <div className={styles.fileContainer}>
            {!file && (
              <div className={styles.center}>
              <button type="button" onClick={handleFileClick} className={styles.fileButton}>
                Выбрать файл
              </button>
              </div>
            )}
            {file && (
              <>
                <div className={styles.center}>
                <div className={styles.thesis}>{file.name}</div>
                </div>
                    <div className={styles.center}>
                <button type="submit" disabled={submitting} className={styles.submitButton}>
                  {submitting ? 'Отправка...' : 'Отправить'}
                </button>
                </div>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".doc,.docx"
              onChange={handleFileChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
}