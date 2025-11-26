// components/FilterBar.jsx
// Thanh tìm kiếm + lọc theo chuyên khoa + kinh nghiệm + đánh giá
// Component này nhận props từ DoctorListPage để truyền giá trị lọc ra ngoài

import styles from "./style.module.scss";

const FilterBar = ({
  search,
  setSearch,
  specialty,
  setSpecialty,
  experience,
  setExperience,
  rating,
  setRating,
  specialties,
}) => {
  return (
    <div className={styles.filterBar}>
      {/* Ô tìm kiếm */}
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Tìm bác sĩ theo tên..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lọc chuyên khoa */}
      <select
        className={styles.selectBox}
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      >
        <option value="">Tất cả chuyên khoa</option>
        {specialties.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>

      {/* Lọc kinh nghiệm */}
      <select
        className={styles.selectBox}
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      >
        <option value="">Kinh nghiệm</option>
        <option value="5">Từ 5 năm trở lên</option>
        <option value="10">Từ 10 năm trở lên</option>
        <option value="20">Từ 20 năm trở lên</option>
      </select>

      {/* Lọc đánh giá */}
      <select
        className={styles.selectBox}
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="">Đánh giá</option>
        <option value="3">Từ 3 sao</option>
        <option value="4">Từ 4 sao</option>
        <option value="4.5">Từ 4.5 sao</option>
      </select>
    </div>
  );
};

export default FilterBar;
