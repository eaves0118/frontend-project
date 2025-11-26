// components/DoctorCard.jsx
// Hiển thị từng bác sĩ dạng card: avatar, tên, chuyên khoa, mô tả ngắn
// Có nút xem chi tiết → gọi hàm onOpenModal của trang DoctorListPage

import styles from "./style.module.scss";
const DoctorCard = ({ doctor, onOpenModal }) => {
  return (
    <div className={styles.doctorCard}>
      {/* Ảnh bác sĩ */}
      <div className={styles.avatarBox}>
        <img src={doctor.avatar} alt={doctor.name} />
      </div>

      {/* Thông tin */}
      <h3 className={styles.doctorName}>{doctor.name}</h3>
      <p className={styles.specialty}>{doctor.specialty} – {doctor.hospital}</p>

      <p className={styles.shortDesc}>{doctor.shortDesc}</p>

      {/* Nút xem chi tiết */}
      <button
        className={styles.detailBtn}
        onClick={() => onOpenModal(doctor)}
      >
        Xem chi tiết
      </button>
    </div>
  );
};

export default DoctorCard;
