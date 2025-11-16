'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './Thesis.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Participant {
  name: string;
  email: string;
  company: string;
  phone: string;
  doc: string;
}

export default function Thesis() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  const SERVER = process.env.NEXT_PUBLIC_BACKEND_URL!;  // <-- ТУТ ПРАВИЛЬНО

  const fetchParticipants = async () => {
    try {
      const res = await fetch(`${SERVER}/api/thesis`); // <-- ИСПРАВЛЕНО
      const data = await res.json();
      setParticipants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  if (loading) return <div className={styles.Thesis}>Загрузка...</div>;
  if (participants.length === 0) return <div className={styles.Thesis}>Нет данных</div>;

  const perSlide = 10;
  const slides: Participant[][] = [];
  for (let i = 0; i < participants.length; i += perSlide) {
    slides.push(participants.slice(i, i + perSlide));
  }

  const truncateFileName = (name: string, maxLength = 25) => {
    return name.length > maxLength ? name.slice(0, maxLength - 3) + '...' : name;
  };

  return (
    <div className={styles.Thesis}>
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
        {slides.map((group, idx) => (
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
                  <div key={i} className={i % 2 === 0 ? styles.name : styles.name2}>{p.name}</div>
                ))}
              </div>

              <div className={styles.emails}>
                <h5>Email</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.email : styles.email2}>{p.email}</div>
                ))}
              </div>

              <div className={styles.companiya}>
                <h5>Компания</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.company : styles.company2}>{p.company}</div>
                ))}
              </div>

              <div className={styles.phonenumbers}>
                <h5>Телефон</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.phonenumber : styles.phonenumber2}>{p.phone}</div>
                ))}
              </div>

              <div className={styles.cheking}>
                <h5>Документ</h5>
                {group.map((p, i) => {
                  const decodedName = decodeURIComponent(p.doc);
                  const displayName = truncateFileName(decodedName);

                  return (
                    <div key={i} className={i % 2 === 0 ? styles.check : styles.check2}>
                      <a
                        href={`${SERVER}/uploads/${p.doc}`}
                        target="_blank"
                        rel="noreferrer"
                        title={decodedName}
                      >
                        {displayName}
                      </a>
                    </div>
                  );
                })}
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