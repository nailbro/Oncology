'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './header.module.scss';
import mask from '@/../public/assets/Mask group 1.svg';
import profile from '@/../public/icons/profile.svg';
import SingIn from '@/shared/components/SingIn/SingIn';
import Link from 'next/link';

export default function Header() {
  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const openSignin = () => setIsSigninOpen(true);
  const closeSignin = () => setIsSigninOpen(false);
  const toggleBurger = () => setIsBurgerOpen(!isBurgerOpen);
  const closeBurger = () => setIsBurgerOpen(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <a href="/">
          <Image src={mask} alt="mask" />
          </a>
          <ul className={styles.desktopMenu}>
            <a href="#1">
            <li>О конференции</li>
            </a>
            <Link href="/Spikers">
            <li>Спикеры</li>
            </Link>
            <li>Партнёры</li>
            <a href="#4">
            <li>Контакты</li>
            </a>
          </ul>

          <div className={styles.rightSection}>
            <Image
              src={profile}
              alt="profile"
              onClick={openSignin}
              className={styles.profile}
            />

            <div className={styles.mobileMenu}>
              <div
                className={`${styles.burger} ${isBurgerOpen ? styles.open : ''}`}
                onClick={toggleBurger}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              <ul className={`${styles.menu} ${isBurgerOpen ? styles.active : ''}`}>
                <a href="#1">
                <li onClick={closeBurger}>О конференции</li>
                </a>
                  <Link href="/Spikers">
                   <li onClick={closeBurger}>Спикеры</li>
            </Link>
         
                <li onClick={closeBurger}>Партнёры</li>
                <a href="#4">
                <li onClick={closeBurger}>Контакты</li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {isSigninOpen && (
        <div className={styles.modalBackdrop} onClick={closeSignin}>
          <div onClick={(e) => e.stopPropagation()}>
            <SingIn />
          </div>
        </div>
      )}
    </>
  );
}