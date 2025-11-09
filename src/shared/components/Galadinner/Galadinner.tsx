"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Galadinner.module.scss";
import step1Icon from "@/../public/icons/Component 4.svg";
import step2Icon from "@/../public/icons/Component 4 (1).svg";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";

export default function Galadinner({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState<number>(1);

  if (!open) return null;

  const currentImage = currentStep === 1 ? step1Icon : step2Icon;
  const toggleStep = () => {
    setCurrentStep(currentStep === 1 ? 2 : 1);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Регистрация на гала-ужин</h3>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>

        <div className={styles.imageContainer} onClick={toggleStep} style={{ cursor: 'pointer' }}>
          <Image src={currentImage} alt={`Step ${currentStep}`} />
        </div>

        <div className={styles.content}>
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
        </div>
      </div>
    </div>
  );
}