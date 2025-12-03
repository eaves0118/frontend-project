import React, { useState } from "react";
import styles from "./style.module.scss";
import BreadCrumb from "../../../components/ui/bread-crumb";
import { doctors } from "../../../data/constant";
import DoctorCard from "../../../components/sections/doctor-card/DoctorCard";
import DoctorModal from "../../../components/sections/doctor-modal/doctorModal";
const DoctorPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [filter, setFilter] = useState("Tất cả");

  const specialtyList = ["Tất cả", ...new Set(doctors.map((s) => s.specialty))];

  const filteredDoctors =
    filter === "Tất cả"
      ? doctors
      : doctors.filter((s) => s.specialty === filter);

  const handleOpenModal = (doctorData) => {
    setDoctor(doctorData);
    setIsOpen(true);
    console.log("Đã mở popup");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <section className={styles.doctors__team_container}>
      <div className={styles.doctors__team_bread}>
        <BreadCrumb
          items={[
            { label: "Trang chủ", to: "/" },
            { label: "Đội ngũ bác sĩ", to: "/doi-ngu-bac-si" },
          ]}
        />
      </div>
      <div className={styles.doctors__team_filter}>
        <select
          className={styles.filter__select}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {specialtyList.map((sp) => (
            <option value={sp} key={sp}>
              {sp}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.doctors__team_card}>
        {filteredDoctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            name={doctor.name}
            expertise={doctor.expertise}
            des={doctor.description}
            training={doctor.training}
            work={doctor.work}
            onDetail={() => handleOpenModal(doctor)}
          />
        ))}
      </div>
      {isOpen && (
        <DoctorModal data={doctor} onClose={() => handleCloseModal()} />
      )}
    </section>
  );
};

export default DoctorPage;
