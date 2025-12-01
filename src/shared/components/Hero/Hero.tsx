"use client";
import { useState } from "react";
import styles from "./Hero.module.scss";
import Modal from "./Modal";
import BecomeModal from "../Become/Become";
import Galadinner from "../Galadinner/Galadinner";
import Thesis from "../Thesis/Thesis";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);    
  const [isBecome, setIsBecome] = useState(false);
  const [gyneOpen, setGyneOpen] = useState(false); 
  const [isThesis, setIsThesis] = useState(false);
    const [isGaladinner, setIsGaladinner] = useState(false);
  const handleSelect = (value: string) => {
    setIsOpen(false);

    if (value === "become") {
      setIsBecome(true);
    }
      else if (value === "thesis") {
      setIsThesis(true);
    }
          if (value === "galadinner") {
      setIsGaladinner(true);
    }
  };

  return (
    <section className={styles.hero}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.videoBackground}
      >
        <source src="/video/video_2025-11-04_11-00-52 (2).mp4" type="video/mp4" />
        Ваш браузер не поддерживает видеофон.
      </video>

      <div className={styles.container}>
        <h1>
          Наследие и будущее онкологии:
          <br /> к 65-летию Национального Центра
          <br /> Онкологии и Гематологии.
        </h1>

        <p>Научно-практическая Международная Конференция.</p>

        <div className={styles.bishkek}>
          <div className={styles.column}>
            <div className={styles.days}>10-11-12</div>
            <div className={styles.month_row}>Сентября 2025</div>
          </div>
          <div className={styles.city}>г. Бишкек, Кыргызстан</div>
        </div>

        <div className={styles.btn}>
          <button onClick={() => setIsOpen(true)}>
            Зарегистрироваться
          </button>
        </div>
      </div>
      <div className={styles.Gynecology}>
        <div className={`${styles.boxWrapper} ${gyneOpen ? styles.open : ""}`}>
          <button
            onClick={() => setGyneOpen(!gyneOpen)}
            className={styles.gyneButton}
          >
            Гинекология в 2025
          </button>

          <div className={styles.innerBox}>
            <div className={styles.box}>
              <span>
                <span className={styles.label}>Дата:</span> 14.12.2025
              </span>
            </div>
            <div className={styles.box}>
              <span>
                <span className={styles.label}>Место:</span> ДК (ул. Раззакова 15)
              </span>
            </div>
            <div className={styles.btn_2}>
              <a href="">
              <button>Узнать больше</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelect}
      />

      <BecomeModal
        open={isBecome}
        onClose={() => setIsBecome(false)}
      />
            <Thesis
        open={isThesis}
        onClose={() => setIsThesis(false)}
      />
                  <Galadinner
        open={isGaladinner}
        onClose={() => setIsGaladinner(false)}
      />
    </section>
  );
}