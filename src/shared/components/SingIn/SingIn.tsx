"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./SingIn.module.scss";

export default function SingIn() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [errorMessage, setErrorMessage] = useState<string | null>(null);
const [successMessage, setSuccessMessage] = useState<string | null>(null);
const [loading, setLoading] = useState(false);
const router = useRouter();

const SERVER = process.env.NEXT_PUBLIC_BACKEND_URL!;

const handleLogin = async () => {
if (!email || !password) {
setErrorMessage("Введите email и пароль");
return;
}


setLoading(true);
try {
  const res = await fetch(`${SERVER}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    setErrorMessage(data.message || "Неверный email или пароль");
    setTimeout(() => setErrorMessage(null), 2000);
  } else {
    localStorage.setItem("token", data.token);
    setSuccessMessage("Вы успешно вошли");

    setTimeout(() => {
      setSuccessMessage(null);
      router.push("/Questionnaires");
    }, 1500);
  }
} catch (err) {
  console.error(err);
  setErrorMessage("Ошибка сервера");
  setTimeout(() => setErrorMessage(null), 2000);
} finally {
  setLoading(false);
}


};

const handleKeyPress = (e: KeyboardEvent) => {
if (e.key === "Enter") {
e.preventDefault();
handleLogin();
}
};

useEffect(() => {
window.addEventListener("keydown", handleKeyPress);
return () => window.removeEventListener("keydown", handleKeyPress);
}, [email, password]);

return ( <div className={styles.singin}> <div className={styles.container}> <h3>Войти</h3>
<form
onSubmit={(e) => {
e.preventDefault();
handleLogin();
}}
>
<input
type="text"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
/> <div className={styles.passwordBox}>
<input
type={showPassword ? "text" : "password"}
placeholder="Пароль"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
<div
className={styles.icon}
onClick={() => setShowPassword(!showPassword)}
onMouseDown={(e) => e.preventDefault()}
>
{showPassword ? <AiOutlineEyeInvisible size={24} /> : <MdOutlineRemoveRedEye size={24} />} </div> </div> <div className={styles.btn}> <button type="submit" disabled={loading}>
{loading ? "Входим..." : "Войти"} </button> </div> </form>


    {errorMessage && <p className={styles.error}>{errorMessage}</p>}

    {successMessage && (
      <div className={styles.modalBackdrop}>
        <div className={styles.modalContent}>
          <p>{successMessage}</p>
        </div>
      </div>
    )}
  </div>
</div>


);
}