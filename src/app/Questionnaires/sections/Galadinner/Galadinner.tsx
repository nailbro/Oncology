'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './Galadinner.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Participant {
  name: string;
  email: string;
  company: string;
  phone: string;
  check?: string;
}

export default function GaladinnerParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!backend) {
      console.error("❌ NEXT_PUBLIC_BACKEND_URL не найден!");
      return;
    }

    const fetchParticipants = async () => {
      try {
        const res = await fetch(`${backend}/api/step`);
        const data: Participant[] = await res.json();
        setParticipants(data.reverse());
      } catch (err) {
        console.error('Ошибка при получении участников:', err);
      }
    };

    fetchParticipants();
    const interval = setInterval(fetchParticipants, 5000);

    return () => clearInterval(interval);
  }, [backend]);

  const perSlide = 10;
  const slides: Participant[][] = [];
  for (let i = 0; i < participants.length; i += perSlide) {
    slides.push(participants.slice(i, i + perSlide));
  }

  if (!participants.length) return <p>Загрузка участников...</p>;

  return (
    <div className={styles.galadinner}>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        navigation={{
          nextEl: `.${styles.customNext}`,
          prevEl: `.${styles.customPrev}`,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} ${styles.bullet}">${index + 1}</span>`,
        }}
        style={{ height: '750px' }}
      >
        {slides.map((group: Participant[], idx: number) => (
          <SwiperSlide key={idx}>
            <div className={styles.container}>

              <div className={styles.numbers}>
                <h5>№</h5>
                {group.map((_, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.number : styles.number2}>
                    {i + 1 + idx * perSlide}
                  </div>
                ))}
              </div>

              <div className={styles.names}>
                <h5>Имя</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.name : styles.name2}>
                    {p.name}
                  </div>
                ))}
              </div>

              <div className={styles.emails}>
                <h5>Email</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.email : styles.email2}>
                    {p.email}
                  </div>
                ))}
              </div>

              <div className={styles.companiya}>
                <h5>Название компании</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.company : styles.company2}>
                    {p.company}
                  </div>
                ))}
              </div>

              <div className={styles.phonenumbers}>
                <h5>Номер</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.phonenumber : styles.phonenumber2}>
                    {p.phone}
                  </div>
                ))}
              </div>

              <div className={styles.cheking}>
                <h5>Чек</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.check : styles.check2}>
                    {p.check}
                  </div>
                ))}
              </div>

            </div>
          </SwiperSlide>
        ))}

        <div className={styles.customPrev}><IoIosArrowBack /></div>
        <div className={styles.customNext}><IoIosArrowForward /></div>
      </Swiper>
    </div>
  );
}