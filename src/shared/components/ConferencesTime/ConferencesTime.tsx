import styles from './ConferencesTime.module.scss'
export default function ConferencesTime(){
    return(
        <div className={styles.conferencestime}>
            <h2>До конференции осталось:</h2>
            <div className={styles.times}>
<div className={styles.time}>
    <h4>28</h4>
    <span>дней</span>
</div>
<div className={styles.diviler}></div>
<div className={styles.time}>
    <h4>16</h4>
    <span>часов</span>
</div>
<div className={styles.diviler}></div>
<div className={styles.time}>
    <h4>30</h4>
    <span>минут</span>
</div>
            </div>
        </div>
    )
}