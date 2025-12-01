import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import { FiMapPin } from 'react-icons/fi'
import { IoCallOutline } from 'react-icons/io5'
import styles from './Maps.module.scss'

export default function Maps() {
  return (
    <section id='4' className={styles.maps}>
      <div className={styles.box}>
        <h4>Будь в курсе 
          <br />новых событий
        </h4>
        <div className={styles.text}>
          <h4>10 СЕНТЯБРЯ</h4>
          <div className={styles.contacts}>
            <div className={styles.tell}>
              <i><IoCallOutline size={20} /></i>
              <a href="tel:+996999094300">
                <span>+996 999 094 300</span>
              </a>
            </div>

            <div className={styles.email}>
              <i><MdAlternateEmail size={20} /></i>
              <a href="mailto:ncogkr@gmail.com">
                <span>ncogkr@gmail.com</span>
              </a>
            </div>

            <div className={styles.local}>
              <i><FiMapPin size={20} /></i>
              <a href="https://go.2gis.com/zqFaU">
              <span>
                Национальный центр онкологии и гематологии, г. Бишкек
              </span>
              </a>
            </div>

            <div className={styles.mesange}>
      
              <a href="https://www.whatsapp.com/?lang=ru">
              <i><FaWhatsapp size={24} /></i>
              </a>
                      <a href="https://www.instagram.com/">
              <i><FaInstagram size={24} /></i>
              </a>
            </div>
          </div>
        </div>
      </div>
              <div className={styles.mapContainer}>
                    <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.687828168473!2d74.60344797649883!3d42.87128950492144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389ec83e516f1a8d%3A0x1dddc7f9e13b8475!2z0J3QtdCy0L7QutCw0Y8g0KHQvNC-0YLQtdC60YEg0Lgg0YHRgtCw0L3QtNGA0L7QstCwLCDQkdC-0LPRgNCw0YLQuNGC0LXQu9GM0L3Ri9C5INC_0YDQvtCz0L7RgNC-0LPRgNCw0YLQuNGC0LXQu9GM!5e0!3m2!1sru!2skg!4v1694793456789!5m2!1sru!2skg"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Национальный+центр+онкологии+и+гематологии,+Бишкек"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            Открыть маршрут в Google Картах
          </a>
        </div>
    </section>
  )
}