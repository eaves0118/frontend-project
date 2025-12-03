import React from "react";
import styles from "./style.module.scss";
import Avatar from "@mui/material/Avatar";
import Button from "../../ui/Button";

const DoctorCard = ({ src, name, expertise, des, onDetail }) => {
  return (
    <div className={styles.card__wrapper}>
      <div className={styles.card__container}>
        <Avatar sx={{ width: 80, height: 80 }} alt="Remy Sharp" src={src} />
        <h4 className={styles.card__doctor_name}>{name}</h4>
        <p className={styles.card__doctor_ex}>{expertise}</p>
        <p className={styles.card__doctor_des}>{des}</p>
        <div className={styles.card__doctor_option}>
          <Button content={"Chi tiết"} variant="outlined" onClick={onDetail} />
          <Button content={"Đăng ký khám"} variant="contained" />
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
