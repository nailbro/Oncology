"use client";
import styles from "./Hero.module.scss";

export default function Modal({ open, onClose,  onSelect, }: { open: boolean; onClose: () => void;   onSelect: (value: string) => void; }) {
    if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>×</button>
        <div className={styles.buttons}>
          <button className={styles.item} onClick={() => onSelect("become")}>
            Стать участником
          </button>

          <button className={styles.item} onClick={()=> onSelect("galadinner")}>
            Гала-ужин
          </button>

          <button className={styles.item}onClick={() => onSelect("thesis")}>
            Тезис
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalBtn({ text }: { text: string }) {
  return <button className={styles.item}>{text}</button>;
}
