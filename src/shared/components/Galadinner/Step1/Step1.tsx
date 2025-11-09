import styles from './Step1.module.scss'
export default function Step1(){
    return(
<div className={styles.step}>
            <form className={styles.form}>
            <div className={styles.flex}>
                <div className={styles.column}>
            <label htmlFor="">ФИO <span>*</span></label>
          <input type="text"  required/>
          </div>
           <div className={styles.column}>
          <label htmlFor="Email">Email<span>*</span></label>
          <input type="email"required />
          </div>
          </div>
            <div className={styles.flex}>
                <div className={styles.column}>
          <label htmlFor="Название компании">Название компании<span>*</span></label>
          <input type="text" required/>
          </div>
              <div className={styles.column}>
          <label htmlFor="Номер">Номер<span>*</span></label>
          <input type="number" required/>
          </div>
          </div>
          <span>Стоимость участия: 3500 сом</span>
          <button type="submit">Отправить</button>
        </form>
</div>
    )
}