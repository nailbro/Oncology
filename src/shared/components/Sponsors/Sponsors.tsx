'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import styles from './Sponsors.module.scss'
import Roche from '@/../public/sponsors/Frame 628.svg'
import Rosatom from '@/../public/sponsors/Frame 629.svg'
import Orion from '@/../public/sponsors/Frame 631.svg'
import Bowa from '@/../public/sponsors/Frame 630.svg'
import Implantcast from '@/../public/sponsors/Frame 635.svg'
import Coktoo from '@/../public/sponsors/Frame 639.svg'
import Kmma from '@/../public/sponsors/Frame 641.svg'
import Image from 'next/image'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

export default function Sponsors() {
  const sponsors = [Roche, Rosatom, Orion, Bowa, Implantcast, Coktoo, Kmma]

  return (
    <section className={styles.Sponsors}>
      <h3>Спонсоры</h3>
      <div className={styles.sliderWrapper}>
        <button className={styles.prevBtn}><FaArrowLeftLong /></button>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          navigation={{
            nextEl: `.${styles.nextBtn}`,
            prevEl: `.${styles.prevBtn}`,
          }}
          loop
          breakpoints={{
            1024: { slidesPerView: 5, spaceBetween: 20 },
            770: { slidesPerView: 4, spaceBetween: 20 },
            550: { slidesPerView: 3, spaceBetween: 15 },
                360: { slidesPerView: 3, spaceBetween: 10 }, 
            0: { slidesPerView: 2, spaceBetween: 10 },
          }}
        >
          {sponsors.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className={styles.slide}>
                <Image
                  src={logo}
                  alt={`Sponsor ${index + 1}`}
                  width={130}
                  height={130}
                  className={styles.sponsorImage}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className={styles.nextBtn}><FaArrowRightLong /></button>
      </div>
    </section>
  )
}