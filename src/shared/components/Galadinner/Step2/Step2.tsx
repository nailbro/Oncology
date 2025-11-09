"use client"
import Image from 'next/image';
import { useRef } from 'react';
import styles from './Step2.module.scss';
import qrcode from '@/../public/assets/QR Code.svg';

export default function Step2() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();  
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log('Выбран файл:', e.target.files[0]);
    }
  };

  return (
    <div className={styles.step}>
      <h3>Оплатите вход по QR и прикрепите чек *</h3>
      <div className={styles.qrcode}>
        <Image src={qrcode} alt="qrcode" />
      </div>
      <div className={styles.btn}>
        <button type="button" onClick={handleClick} className={styles.fileButton}>
          Выбрать файл
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
