"use client";
import { useRef } from 'react';
import styles from './thesis.module.scss'
export default function Thesis({
      open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleClick = () => {
      fileInputRef.current?.click();  
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        console.log('Выбран файл:', e.target.files[0]);
      }
    };
  
    return(
        <div>
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Отправить тезис</h3>
        <button className={styles.close} onClick={onClose}>×</button>
        <form className={styles.form}>
            <div className={styles.flex}>
                <div className={styles.column}>
            <label htmlFor="">ФИO <span>*</span></label>
          <input type="text"  required/>
          </div>
           <div className={styles.column}>
          <label htmlFor="Email">Email<span>*</span></label>
          <input type="email" required/>
          </div>
          </div>
            <div className={styles.flex}>
                <div className={styles.column}>
          <label htmlFor="Название компании">Название компании<span>*</span></label>
          <input type="text" required/>
          </div>
              <div className={styles.column}>
          <label htmlFor="Номер">Номер<span>*</span></label>
          <input type="number"required/>
          </div>
          </div>
          <a href="">Требования к оформлению тезиса</a>
          <span>Прием тезисов: до 15 июля 2025 года.</span>
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
        </form>
      </div>
    </div>
        </div>
    )
}