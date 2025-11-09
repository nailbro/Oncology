"use client";

import { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./SingIn.module.scss";

export default function SingIn() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.singin}>
      <div className={styles.container}>
        <h3>Войти</h3>
        <form>
          <input type="text" placeholder="Логин" required />
          <div className={styles.passwordBox}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              required
            />

            <div
              className={styles.icon}
              onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? <AiOutlineEyeInvisible size={24} /> : <MdOutlineRemoveRedEye size={24} />}
            </div>
          </div>

          <div className={styles.btn}>
            <button>Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
}