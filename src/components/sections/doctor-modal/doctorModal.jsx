import React from "react";
import styles from "./style.module.scss";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";

const DoctorModal = ({ data, onClose }) => {
  console.log(data);
  return (
    <div className={styles.overlay}>
      <section className={styles.popup__wrapper}>
        <div className={styles.popup__close} onClick={onClose}>
          <CloseIcon />
        </div>
        <div className={styles.popup__profile}>
          <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src="" />
          <div className={styles.popup__doctor_info}>
            <h4 className={styles.popup__doctor_name}>{data.name}</h4>
            <p className={styles.popup__doctor_ex}>{data.expertise}</p>
          </div>
        </div>
        <div className={styles.popup__details}>
          <p className={styles.popup__des}>{data.description}</p>
          <p className={styles.popup__training}>
            <h5>Quá trình đào tạo</h5>
            <ul>
              {data.details.training.map((i, index) => (
                <li key={index}>{i}</li>
              ))}
            </ul>
          </p>
          <p className={styles.popup__work}>
            <h5>Quá trình công tác</h5>
            <ul>
              {data.details.experience.map((i, index) => (
                <li key={index}>{i}</li>
              ))}
            </ul>
          </p>
          <p className={styles.popup__specialized}>
            <h5>Khám, điều trị các bệnh</h5>
            <ul>
              {data.details.specialties.map((i, index) => (
                <li key={index}>{i}</li>
              ))}
            </ul>
          </p>
        </div>
      </section>
    </div>
  );
};

export default DoctorModal;
