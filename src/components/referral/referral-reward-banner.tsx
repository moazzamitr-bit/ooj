"use client";

import Link from "next/link";
import { Shield, UserPlus } from "lucide-react";
import giftBackground from "@/assets/images/gift-background.png";
import rial100 from "@/assets/images/rial-100.png";
import rial500 from "@/assets/images/rial-500.png";
import styles from "@/components/referral/referral-reward-banner.module.css";

const rewardCopy =
  "هر دوستی که با دعوت تو عضو بشه ۵۰۰,۰۰۰ هزار تومان فوری به حسابت واریز می‌شه!";

const weeklyInviteLimit = "حداکثر ۱ دعوت موفق";

const fallingNotes: { src: string; className: string }[] = [
  { src: rial100.src, className: styles.note1 },
  { src: rial500.src, className: styles.note2 },
  { src: rial100.src, className: styles.note3 },
  { src: rial500.src, className: styles.note4 },
  { src: rial100.src, className: styles.note5 },
  { src: rial500.src, className: styles.note6 },
  { src: rial100.src, className: styles.note7 },
  { src: rial500.src, className: styles.note8 },
  { src: rial100.src, className: styles.note9 },
  { src: rial500.src, className: styles.note10 },
  { src: rial100.src, className: styles.note11 },
  { src: rial500.src, className: styles.note12 },
];

export function ReferralRewardBanner() {
  return (
    <section
      className={styles.inviteBanner}
      style={{ "--gift-bg": `url(${giftBackground.src})` } as React.CSSProperties}
      aria-label="کمپین دعوت ویژه"
    >
      <div className={styles.moneyRain} aria-hidden>
        {fallingNotes.map((note, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={note.src}
            alt=""
            className={`${styles.fallingNote} ${note.className}`}
            draggable={false}
          />
        ))}
      </div>

      <div className={styles.copyStack}>
        <h1 className={styles.title}>
          <span>۵۰۰,۰۰۰</span>
          <span className={styles.titleUnit}>هزار تومان</span>
        </h1>
        <h2 className={styles.subtitle}>جایزه نقدی هفتگی!</h2>

        <div className={styles.featureRow} aria-label="مراحل کمپین دعوت">
          <article className={`${styles.featureChip} ${styles.featureChipWide}`}>
            <span className={styles.chipIcon} aria-hidden>
              <UserPlus />
            </span>
            <span>{rewardCopy}</span>
          </article>
          <article className={`${styles.featureChip} ${styles.featureChipWide}`}>
            <span className={styles.chipIcon} aria-hidden>
              <Shield />
            </span>
            <span>{weeklyInviteLimit}</span>
          </article>
        </div>

        <Link href="/student/referral" className={styles.inviteButton}>
          <span>کلیک برای دعوت دوستات</span>
          <UserPlus aria-hidden />
        </Link>
      </div>
    </section>
  );
}
