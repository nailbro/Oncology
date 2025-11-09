"use client"
import { useEffect, useState } from 'react';
import styles from './possibilities.module.scss';

const possibilitiesList = [
  'Фармацевтика',
  'Сестринское дело',
  'Стоматология',
  'Педиатрия',
  'Офтальмология',
  'Неврология',
  'Хирургия',
];

export default function Possibilities() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % possibilitiesList.length); // сменить текст
        setFade(true);
      }, 500);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.possibilities}>
      <h3>
        ВОЗМОЖНОСТИ <span>КОНФЕРЕНЦИИ</span>
      </h3>
      <div className={styles.text}>
        <p>
          Соберутся ведущие
          <br /> медицинские специалисты
          <br /> из таких областей, как:
        </p>
        <h4 className={`${fade ? styles.show : styles.hide}`}>
          {possibilitiesList[current]}
        </h4>
      </div>
    </section>
  );
}
