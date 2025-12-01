'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Galadinner.module.scss';

import step1Icon from '@/../public/icons/Component 4.svg';
import step2Icon from '@/../public/icons/Component 4 (1).svg';

import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';

export default function Galadinner({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

const currentImage = currentStep === 1 ? step1Icon : step2Icon;
const handleStep1Submit = (data: any) => {
    setFormData(data);
    setCurrentStep(2);
  };


  const handleStep2Submit = async (selectedFile: File) => {
    setFile(selectedFile);
    setSubmitting(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('company', formData.company);
    form.append('phone', formData.phone);
    form.append('paymentFile', selectedFile);

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await fetch(`${BACKEND_URL}/api/step`, {
        method: 'POST',
        body: form,
      });

      const data = await res.json();

      if (res.ok) {
        alert('Регистрация прошла успешно!');
        setFormData({});
        setFile(null);
        setCurrentStep(1);
        onClose();
      } else {
        alert('Ошибка: ' + (data.message || 'Не удалось отправить данные.'));
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка сети. Проверьте подключение или попробуйте позже.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <h3>Регистрация на гала-ужин</h3>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>

        <div className={styles.imageContainer}>
          <Image src={currentImage} alt={`Step ${currentStep}`} priority />
        </div>

        <div className={styles.content}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.4 }}
              >
                <Step1 onSubmit={handleStep1Submit} />
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <Step2 onSubmit={handleStep2Submit} />
                {submitting && (
                  <div className={styles.loadingOverlay}>
                    <div className={styles.spinner}></div>
                    <p>Отправка данных...</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}