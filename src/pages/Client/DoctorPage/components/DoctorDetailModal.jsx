// components/DoctorDetailModal.jsx
// Modal hiển thị chi tiết bác sĩ
// Nhận doctor (object), isOpen (boolean) và onClose (function)

import styles from "./style.module.scss";

const DoctorDetailModal = ({ doctor, isOpen, onClose }) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalBox}
        onClick={(e) => e.stopPropagation()} // Không đóng khi bấm vào nội dung
      >
        {/* Nút đóng */}
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        {/* Thông tin bác sĩ */}
        <div className={styles.modalHeader}>
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className={styles.modalAvatar}
          />
          <div>
            <h2 className={styles.modalName}>{doctor.name}</h2>
            <p className={styles.modalSpecialty}>
              {doctor.specialty} – {doctor.hospital}
            </p>
          </div>
        </div>

        {/* Mô tả đầy đủ */}
        <div className={styles.modalContent}>
          {doctor.fullDesc
            .trim()
            .split("\n")
            .map((line, index) => (
              <p key={index} className={styles.modalText}>
                {line.replace("- ", "• ")}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailModal;
