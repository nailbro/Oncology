"use client"
import Image from 'next/image'
import styles from './footer.module.scss'
import logo from '@/../public/icons/Frame 453.svg'
import { FaArrowUpLong } from 'react-icons/fa6'
import { FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa'
export default function Footer(){
      const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
    return(
        <footer className={styles.footer}>
            <div className={styles.column}>
               <button className={styles.up} onClick={scrollToTop} aria-label="Наверх">
          <FaArrowUpLong />
        </button>
            <div className={styles.logo}>
<Image src={logo} alt='logo'/>
</div>
<ul>
    <a href="#1">
    <li>О конференции</li>
    </a>
    <li>Спикеры</li>
    <li>Партнёры</li>
    <a href="#4">
    <li>Контакты</li>
    </a>
</ul>
<div className={styles.message}>
    <i><FaWhatsapp size={32}/></i>
    <i><FaInstagram size={32}/></i>
    <i><FaYoutube size={32}/></i>
</div>
<span>© 2025 Medicine conference, Все права защищены.</span>
</div>
        </footer>
    )
}