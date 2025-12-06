import React from "react";
import styles from "./style.module.scss";
const StatsCard = ({ title, value, percent, icon, status }) => {
  return (
    <section className={styles.stats__wrapper}>
      <div className={styles.stats__head}>
        <span className={styles.stats__title}>{title}</span>
        <span className={styles.stats__icon}>{icon}</span>
      </div>
      <div className={styles.stats__bot}>
        <p className={styles.stats__value}>{value}</p>
        <div className={styles.stats__status}>
          {status} {percent}% from last month
        </div>
      </div>
    </section>
  );
};

const StatsCardCustom = ({ title, stats }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.grid}>
        {stats.map((item, index) => (
          <div key={index} className={`${styles.card} ${styles[item.type]}`}>
            <p className={styles.label}>{item.label}</p>
            <h2 className={styles.value}>{item.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export { StatsCard, StatsCardCustom };
