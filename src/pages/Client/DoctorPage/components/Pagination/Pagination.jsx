import { useState } from "react";
import styles from "./style.module.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [jumpPage, setJumpPage] = useState("");

  const pages = [];
  const maxVisible = 5; // số trang hiển thị tối đa
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handleJump = () => {
    const pageNum = Number(jumpPage);
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpPage("");
    }
  };

  return (
    <div className={styles.paginationWrapper}>
      <div className={styles.pagination}>
        {/* Prev button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.navBtn}
        >
          Prev
        </button>

        {/* Page number buttons */}
        <div className={styles.pageList}>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`${styles.pageItem} ${
                currentPage === page ? styles.active : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.navBtn}
        >
          Next
        </button>

        {/* Jump to page input */}
        <div className={styles.jumpBox}>
          <input
            type="number"
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            placeholder={`${currentPage} / ${totalPages}`} // hiển thị tổng số trang
            min="1"
            max={totalPages}
          />
          <button onClick={handleJump}>Đi</button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
