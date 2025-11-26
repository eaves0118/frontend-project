// =======================================================================
// 📄 DoctorListPage.jsx
// =======================================================================

import { useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";

import { doctors } from "./mock/doctors";

import FilterBar from "./components/Filters/DoctorFilters/FilterBar";
import DoctorCard from "./components/Cards/DoctorCard/DoctorCard";
import DoctorDetailModal from "./components/DoctorDetailModal";
import Pagination from "./components/Pagination/Pagination";

const DoctorListPage = () => {
  // ---------------- SEARCH + FILTER ----------------
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");

  // ---------------- MODAL ----------------
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setIsModalOpen(false);
  };

  // ---------------- PAGINATION ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 8;

  const specialties = useMemo(() => {
    return [...new Set(doctors.map((d) => d.specialty))];
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((d) => d.name.toLowerCase().includes(search.toLowerCase().trim()))
      .filter((d) => (specialty ? d.specialty === specialty : true))
      .filter((d) => (experience ? d.experience >= Number(experience) : true))
      .filter((d) => (rating ? d.rating >= Number(rating) : true));
  }, [search, specialty, experience, rating]);

  const totalPages = Math.ceil(filteredDoctors.length / PER_PAGE);

  const paginatedDoctors = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredDoctors.slice(start, start + PER_PAGE);
  }, [filteredDoctors, currentPage]);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, specialty, experience, rating]);

  // ---------------- RENDER ----------------
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Danh sách bác sĩ</h1>

      <FilterBar
        search={search}
        setSearch={setSearch}
        specialty={specialty}
        setSpecialty={setSpecialty}
        experience={experience}
        setExperience={setExperience}
        rating={rating}
        setRating={setRating}
        specialties={specialties}
      />

      <div className={styles.doctorGrid}>
        {paginatedDoctors.length > 0 ? (
          paginatedDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onOpenModal={openModal}
            />
          ))
        ) : (
          <p className={styles.noResult}>Không tìm thấy bác sĩ phù hợp.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={changePage}
        />
      )}

      {/* Modal chi tiết bác sĩ */}
      <DoctorDetailModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default DoctorListPage;
