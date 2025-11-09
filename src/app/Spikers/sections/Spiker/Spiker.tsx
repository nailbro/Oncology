"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";

import styles from "./Spiker.module.scss";

import kaz from "@/../public/assets/Rectangle 4.png";
import kaz2 from "@/../public/assets/image (5).png";
import bala from "@/../public/assets/image (1).png";
import kaz3 from "@/../public/assets/image (2).png";
import kaz4 from "@/../public/assets/image (3).png";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const data = [
  { img: kaz, name: "Карина Закирова", pos: "Руководитель университетской клиники", company: "Zack`s company" },
  { img: kaz2, name: "Карина Закирова", pos: "Руководитель университетской клиники", company: "Zack`s company" },
  { img: bala, name: "Карина Закирова", pos: "Руководитель университетской клиники", company: "Zack`s company" },
  { img: kaz3, name: "Карина Закирова", pos: "Руководитель университетской клиники", company: "Zack`s company" },
  { img: kaz4, name: "Карина Закирова", pos: "Руководитель университетской клиники", company: "Zack`s company" }
];

export default function Spiker() {
  const [activeNav, setActiveNav] = useState<"prev" | "next" | null>(null);

  return (
    <section className={styles.spiker}>
      <div className={styles.container}>
<div className={styles.top}>
  <h3>Наши лучшие спикеры страны!</h3>      
  <div className={styles.arrows}>
    <button
      className={`${styles.btn} swiper-button-prev ${activeNav === "prev" ? styles.active : ""}`}
      onClick={() => setActiveNav("prev")}
    >
      <FaArrowLeftLong size={24} />
    </button>

    <button
      className={`${styles.btn} swiper-button-next ${activeNav === "next" ? styles.active : ""}`}
      onClick={() => setActiveNav("next")}
    >
      <FaArrowRightLong size={24} />
    </button>
  </div>
</div>
        <Swiper
          slidesPerView={3}
          spaceBetween={50}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }}
          modules={[Navigation]}
          className={styles.boxs}
        >
          {data.map((item, i) => (
            <SwiperSlide key={i}>
              <div className={styles.box}>
                <Image src={item.img} alt={item.name} />
                <div className={styles.text}>
                  <h4>{item.name}</h4>
                  <p>{item.pos}</p>
                  <span>{item.company}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}
