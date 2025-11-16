"use client"
import { useState } from 'react';
import styles from './qustionaires.module.scss'
import Participants from '../sections/Participants/Participants';
import Schedule from '../sections/Schedule/Schedule';
export default function Qustionaires(){
      const [activeBlock, setActiveBlock] = useState<"participants" | "Schedule" >("participants");

    return(
        <div className={styles.qustionaires}>
            <div className={styles.container}>
      <h4 className={activeBlock === "participants" ? styles.active : ""} onClick={() => setActiveBlock("participants")}>Анкеты</h4>
      <h4 className={activeBlock === "Schedule" ? styles.active : ""} onClick={() => setActiveBlock("Schedule")}>Расписание</h4>
</div>
<div className={styles.diviler}></div>
      {activeBlock === "participants" && <Participants key="participants" />}
      {activeBlock === "Schedule" && <Schedule key="Schedule"/>}
        </div>
    )
}