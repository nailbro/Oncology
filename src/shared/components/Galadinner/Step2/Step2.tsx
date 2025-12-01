'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Step2.module.scss';
import qrcode from '@/../public/assets/photo_2025-12-01_14-11-08.jpg';

interface Step2Props {
  onSubmit: (file: File) => void;
  submitting?: boolean; 
}

export default function Step2({ onSubmit, submitting = false }: Step2Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleClick = () => {
    if (!submitting) fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      if (!allowedTypes.includes(file.type)) {
        setError('Можно загружать только JPG, PNG или PDF файл чека');
        e.target.value = '';
        return;
      }

      setError('');
      setSelectedFile(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setError('Пожалуйста, выберите файл перед отправкой');
      return;
    }
    onSubmit(selectedFile);
  };

  return (
    <div className={styles.step}>
      <h3>Оплатите вход по QR и прикрепите чек *</h3>

      <div className={styles.qrcode}>
        <Image src={qrcode} alt="QR-код для оплаты" />
      </div>

      {selectedFile && (
        <p className={styles.fileName}>{selectedFile.name}</p>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.btn}>
        {!selectedFile && (
          <div className={styles.center}>
            <button
              type="button"
              onClick={handleClick}
              className={styles.fileButton}
              disabled={submitting}
            >
              {submitting ? 'Загрузка...' : 'Выбрать файл'}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".jpg,.jpeg,.png,.pdf,.docx"
              onChange={handleChange}
            />
          </div>
        )}

        {selectedFile && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={styles.submitButton}
          >
            {submitting ? 'Отправка...' : 'Отправить'}
          </button>
        )}
      </div>
    </div>
  );
}