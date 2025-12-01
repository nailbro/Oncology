'use client';

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './Galadinner.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Participant {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  check?: string;
  confirmed?: boolean;
  confirming?: boolean;
}

export default function GaladinnerParticipants() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const SERVER = process.env.NEXT_PUBLIC_BACKEND_URL;
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const fetchParticipants = async () => {
    if (!SERVER) {
      console.error("❌ NEXT_PUBLIC_BACKEND_URL не задан");
      return;
    }

    try {
      console.log("Fetching participants from:", `${SERVER}/api/step`);
      
      const res = await fetch(`${SERVER}/api/step`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        console.error(`❌ Server responded with status ${res.status}`);
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`HTTP ${res.status}: ${errorData.message || 'Unknown error'}`);
      }

      const data: Participant[] = await res.json();
      
      if (Array.isArray(data)) {
        const filtered = data.filter((p: Participant) => p && p._id);
        setParticipants(filtered.reverse());
        console.log("✅ Fetched participants:", filtered.length);
      } else {
        console.warn("⚠️ Response is not an array:", data);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("❌ Ошибка при получении участников:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
    const interval = setInterval(() => {
      fetchParticipants();
    }, 5000);

    return () => clearInterval(interval);
  }, [SERVER]);

  const handleConfirm = async (p: Participant) => {
    if (!SERVER || !p.check) return;

    setParticipants(prev =>
      prev.map(item =>
        item._id === p._id ? { ...item, confirming: true } : item
      )
    );

    try {
      // Step 1: Send email
      const mailRes = await fetch(`${SERVER}/api/mail/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: p.email,
          name: p.name,
          check: p.check,
          participantId: p._id,
        }),
      });

      const mailData = await mailRes.json();
      if (!mailRes.ok) {
        throw new Error(mailData.message || `Email error: ${mailRes.status}`);
      }

      // Step 2: Confirm participant (if mail.router doesn't do it)
      const confirmRes = await fetch(`${SERVER}/api/step/${p._id}/confirm`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });

      const confirmData = await confirmRes.json();
      if (!confirmRes.ok) {
        throw new Error(confirmData.message || `Confirm error: ${confirmRes.status}`);
      }

      setParticipants(prev =>
        prev.map(item =>
          item._id === p._id ? { ...item, confirmed: true, confirming: false } : item
        )
      );

      alert(`✔ Пользователь ${p.name} подтверждён\n📧 Письмо отправлено на ${p.email}`);
    } catch (err: any) {
      console.error("❌ Confirm error:", err);
      
      setParticipants(prev =>
        prev.map(item =>
          item._id === p._id ? { ...item, confirming: false } : item
        )
      );

      alert(`❌ Ошибка: ${err.message || "Произошла ошибка при подтверждении"}`);
    }
  };

  const perSlide = 10;
  const slides: Participant[][] = [];
  for (let i = 0; i < participants.length; i += perSlide) {
    slides.push(participants.slice(i, i + perSlide));
  }

  if (isLoading) return <p>📋 Загрузка участников...</p>;
  if (!participants.length) return <p>⚠️ Участников не найдено</p>;

  return (
    <div className={styles.galadinner}>
      <Swiper
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} ${styles.bullet}">${index + 1}</span>`,
        }}
        style={{ height: "750px" }}
      >
        {slides.map((group: Participant[], idx: number) => (
          <SwiperSlide key={idx}>
            <div className={styles.container}>
              <div className={styles.numbers}>
                <h5>№</h5>
                {group.map((_, i: number) => (
                  <div key={i} className={i % 2 === 0 ? styles.number : styles.number2}>
                    {i + 1 + idx * perSlide}
                  </div>
                ))}
              </div>

              <div className={styles.names}>
                <h5>Имя</h5>
                {group.map((p: Participant) =>
                  p ? (
                    <div key={p._id} className={group.indexOf(p) % 2 === 0 ? styles.name : styles.name2}>
                      {p.name}
                    </div>
                  ) : null
                )}
              </div>

              <div className={styles.emails}>
                <h5>Email</h5>
                {group.map((p: Participant) =>
                  p ? (
                    <div key={p._id} className={group.indexOf(p) % 2 === 0 ? styles.email : styles.email2}>
                      {p.email}
                    </div>
                  ) : null
                )}
              </div>

              <div className={styles.companiya}>
                <h5>Компания</h5>
                {group.map((p: Participant) =>
                  p ? (
                    <div key={p._id} className={group.indexOf(p) % 2 === 0 ? styles.company : styles.company2}>
                      {p.company}
                    </div>
                  ) : null
                )}
              </div>

              <div className={styles.phonenumbers}>
                <h5>Телефон</h5>
                {group.map((p: Participant) =>
                  p ? (
                    <div key={p._id} className={group.indexOf(p) % 2 === 0 ? styles.phonenumber : styles.phonenumber2}>
                      {p.phone}
                    </div>
                  ) : null
                )}
              </div>

              <div className={styles.cheking}>
                <h5>Чек</h5>
                {group.map((p: Participant) =>
                  p ? (
                    <div key={p._id} className={group.indexOf(p) % 2 === 0 ? styles.check : styles.check2}>
                      {p.check && !p.confirmed ? (
                        <button
                          disabled={p.confirming}
                          className={styles.confirmButton}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleConfirm(p);
                          }}
                        >
                          {p.confirming ? "⏳ Подтверждение..." : "✓ Подтвердить"}
                        </button>
                      ) : p.confirmed ? (
                        <span className={styles.confirmedLabel}>✔ Подтвержден</span>
                      ) : (
                        <span>—</span>
                      )}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div ref={prevRef} className={styles.customPrev}>
          <IoIosArrowBack />
        </div>
        <div ref={nextRef} className={styles.customNext}>
          <IoIosArrowForward />
        </div>
      </Swiper>
    </div>
  );
}