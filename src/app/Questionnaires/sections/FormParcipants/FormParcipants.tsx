'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './formparci.module.scss';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

interface Participant {
  name: string;
  email: string;
  company: string;
  phone: string;
}

export default function FormParcipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const SERVER = process.env.NEXT_PUBLIC_BACKEND_URL!;

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await fetch(`${SERVER}/api/users`);
        if (!res.ok) throw new Error('Ошибка загрузки данных');
        const data = await res.json();
        setParticipants(data.reverse());
      } catch (err) {
        console.error('Ошибка:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [SERVER]);

  const perSlide = 10;
  const slides: Participant[][] = [];
  for (let i = 0; i < participants.length; i += perSlide) {
    slides.push(participants.slice(i, i + perSlide));
  }

  if (loading) return <div className={styles.FormParcipants}>Загрузка...</div>;
  if (participants.length === 0) return <div className={styles.FormParcipants}>Нет участников</div>;

  return (
    <div className={styles.FormParcipants}>
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
                <h5>Компания</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.company : styles.company2}>
                    {p.company}
                  </div>
                ))}
              </div>

              <div className={styles.phonenumbers}>
                <h5>Телефон</h5>
                {group.map((p, i) => (
                  <div key={i} className={i % 2 === 0 ? styles.phonenumber : styles.phonenumber2}>
                    {p.phone}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.tabletMobileList}>
              {group.map((p, i) => (
                <div key={i} className={styles.mobileItem}>
                  <div
                    className={styles.mobileHeader}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span className={styles.mobileTitle}>Имя</span>
                    <span className={styles.mobileName}>{p.name}</span>

                    <IoIosArrowDown
                      className={`${styles.arrow} ${
                        openIndex === i ? styles.arrowOpen : ''
                      }`}
                    />
                  </div>

                  {openIndex === i && (
                    <div className={styles.mobileContent}>
                      <p><b>Email:</b> {p.email}</p>
                      <p><b>Компания:</b> {p.company}</p>
                      <p><b>Телефон:</b> {p.phone}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}

        <div className={styles.customPrev}><IoIosArrowBack /></div>
        <div className={styles.customNext}><IoIosArrowForward /></div>
      </Swiper>
    </div>
  );
}