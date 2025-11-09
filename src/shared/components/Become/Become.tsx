"use client";
import styles from "./Become.module.scss";
export default function BecomeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Стать участником</h3>
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
          <input type="number" required/>
          </div>
          </div>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
}
