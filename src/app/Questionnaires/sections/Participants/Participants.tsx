"use client";

import { useState } from "react";
import styles from "./participants.module.scss";
import FormParcipants from "../FormParcipants/FormParcipants";
import Galadinner from "../Galadinner/Galadinner";
import Thesis from "../Thesis/Thesis";

export default function Participants() {
  const [activeBlock, setActiveBlock] = useState<"participants" | "gala" | "tezis">("participants");

  return (
    <div className={styles.participants}>
      <button className={activeBlock === "participants" ? styles.active : ""} onClick={() => setActiveBlock("participants")}>Участники</button>
      <button className={activeBlock === "gala" ? styles.active : ""} onClick={() => setActiveBlock("gala")}>Гала-ужин</button>
      <button className={activeBlock === "tezis" ? styles.active : ""} onClick={() => setActiveBlock("tezis")}>Тезисы</button>

      {activeBlock === "participants" && <FormParcipants key="participants" />}
      {activeBlock === "gala" && <Galadinner key="gala"/>}
      {activeBlock === "tezis" && <Thesis key="tezis" />}
    </div>
  );
}