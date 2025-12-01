import styles from './Schedule.module.scss'
import node from '@/../public/icons/note-2.svg'
import clock from '@/../public/icons/clock.svg'
import gallery from '@/../public/icons/gallery.svg'
import Image from 'next/image'
export default function Schedule(){
    return(
        <div className={styles.Schedule}>
            <div className={styles.container}>
<h3>Расписание <span>и программа конференции</span></h3>
<div className={styles.box}>
    <h4>10-11-12 Сентября, Среда-Пятница </h4>
    <div className={styles.diviler}></div>
</div>
<div className={styles.box2}>
    <div className={styles.flex}>
<Image src={node} alt='node'/>
    <h4>Программа конференции</h4>
    <div className={styles.btn}>
     <a href="">
        <button>скачать</button>
        </a>
    </div>
    </div>
    <div className={styles.diviler}></div>
</div>
<div className={styles.box2}>
    <div className={styles.flex}>
    <Image src={clock} alt='clock'/>
    <h4>Расписание</h4>
    <div className={styles.btn}>
        <a href="">
        <button>скачать</button>
        </a>
    </div>
    </div>
    <div className={styles.diviler}></div>
</div>
<div className={styles.box2}>
       <div className={styles.flex}>
    <Image src={gallery} alt='gallery'/>
    <h4>Выставка</h4>
       <div className={styles.btn}>
        <a href="">
        <button>скачать</button>
        </a>
    </div>
    </div>
    <div className={styles.diviler}></div>
</div>
</div>
        </div>
    )
}