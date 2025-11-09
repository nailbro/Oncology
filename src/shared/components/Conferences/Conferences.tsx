'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './conferences.module.scss';
import video from '@/../public/assets/Frame 664.svg';

export default function Conferences() {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState('385px');
    const [isVideoOpen, setIsVideoOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (expanded && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight('385px');
    }
  }, [expanded]);

  return (
    <section id='1' className={styles.conferences}>
      <div className={styles.box}>
        <h3>О конференции</h3>

        <div
          ref={contentRef}
          className={styles.textWrapper}
          style={{ maxHeight: height }}
        >
          <p>
            Национальный центр онкологии и гематологии Кыргызской Республики приглашает специалистов 
            в области онкологии, хирургии, гематологии, химиотерапии, лучевой терапии и медицинской диагностики 
            принять участие в Научно-практической международной конференции «Наследие и будущее онкологии: 
            к 65-летию Национального центра онкологии и гематологии».
          </p>

          <p>
            На протяжении 65 лет Центр остается ведущим учреждением в сфере диагностики и лечения 
            злокачественных новообразований и заболеваний системы крови, внедряя инновационные технологии 
            и передовые научные разработки. В честь юбилея учреждение собирает ведущих специалистов 
            со всего мира для обсуждения актуальных тенденций и перспектив развития онкологической помощи.
          </p>

          <p>Программа конференции:</p>

          <p>
            📌 <strong>10 сентября — Преконгрессное мероприятие: Живая хирургия</strong><br />
            Накануне конференции состоится трансляция оперативных вмешательств, выполняемых ведущими 
            онкохирургами с использованием современных технологий. Участники смогут в режиме реального времени 
            ознакомиться с новейшими методиками и обсудить их с экспертами.
          </p>

          <p>
            📌 <strong>11–12 сентября — Пленарные заседания и научные доклады</strong><br />
            В основной программе конференции прозвучат доклады ведущих специалистов из разных стран, 
            которые представят результаты актуальных исследований и поделятся клиническим опытом по ключевым направлениям:
          </p>

          <ul>
            <li>Современные подходы к диагностике и лечению онкологических и гематологических заболеваний</li>
            <li>Детская онкология: современные вызовы и пути их решения</li>
            <li>Мультидисциплинарный подход в онкологии и гематологии</li>
            <li>Персонализированная терапия</li>
            <li>Новые технологии в лучевой, химио- и таргетной терапии</li>
            <li>Вопросы паллиативной помощи и качества жизни пациентов с онкогематологическими заболеваниями</li>
          </ul>

          <p>Ключевые цели конференции:</p>

          <ul>
            <li>Обсуждение современных стандартов и подходов к диагностике и лечению злокачественных новообразований и заболеваний крови.</li>
            <li>Представление передовых научных исследований и клинических решений.</li>
            <li>Укрепление международного сотрудничества и обмен опытом между специалистами.</li>
          </ul>

          <p>
            Дата проведения:<br />
            10 сентября 2025 года — преконгресс (живая хирургия)<br />
            11–12 сентября 2025 года — конференция
          </p>

          <p>
            Место проведения:<br />
            10 сентября — Национальный центр онкологии и гематологии, г. Бишкек<br />
            11–12 сентября — Отель Orion, г. Бишкек
          </p>

          <p>
            Конференция станет важной научно-практической площадкой для обмена знаниями, представления инновационных разработок 
            и интеграции новых технологий в клиническую практику. Приглашаем всех заинтересованных специалистов 
            в области онкологии и гематологии к участию!
          </p>
        </div>

        <button
          className={styles.readMore}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Свернуть' : 'Читать далее...'}
        </button>
      </div>
 <div className={styles.video}>
        {!isVideoOpen && (
          <div className={styles.videoPoster} onClick={() => setIsVideoOpen(true)}>
            <div className={styles.playButton}>
              <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <rect x="1" y="1" width="126" height="126" rx="63" fill="black" fillOpacity="0.2" />
                  <rect x="1" y="1" width="126" height="126" rx="63" stroke="white" strokeWidth="2" />
                  <path d="M106 64L43 100.373L43 27.6269L106 64Z" fill="white" />
                </g>
              </svg>
            </div>
            <Image src={video} alt="video" />
          </div>
        )}

        {isVideoOpen && (
          <div className={styles.videoPlayerWrapper}>
            <button className={styles.closeButton} onClick={() => setIsVideoOpen(false)}>×</button>
            <video
              src="/video/video_2025-04-30_23-54-24.mp4" 
     width={628}
     height={450}
              controls
              autoPlay
              className={styles.videoPlayer}
            />
          </div>
        )}
      </div>
    </section>
  );
}