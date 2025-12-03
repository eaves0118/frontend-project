import React from "react";
import styles from "./AboutUsPage.module.scss";

// Import ảnh (bạn có thể tải từ trang thật về hoặc dùng tạm ảnh có sẵn)
import MissionImg from "@images/doctor.png";     
import BackgroundImg from "@images/background.png";
import Value1 from "@images/b1.png";
import Value2 from "@images/b2.png";
import Value3 from "@images/b3.png";
import Value4 from "@images/b4.png";
import AppStore from "@images/vietnam.png";
import GooglePlay from "@images/vietnam.png";

const AboutUsPage = () => {
  return (
    <>
{/* 1. Sứ mệnh Doctor4U – Có ảnh nền background.png */}
<section className={styles.missionSection}>
  <div className={styles.missionGrid}>
    <div className={styles.missionText}>
      <h1 className={styles.title}>
        Sứ mệnh của <span>Doctor4U</span>
      </h1>
      <p>
        Tại Doctor4U, chúng tôi tin tưởng rằng mọi người đều có quyền nhận được các dịch vụ chăm sóc sức khỏe đáng tin cậy và thuận tiện. Vì vậy, chúng tôi nỗ lực sử dụng công nghệ kết hợp với đội ngũ bác sĩ giàu kinh nghiệm để cung cấp dịch vụ chăm sóc sức khỏe chất lượng, tiện lợi, mọi lúc mọi nơi.
      </p>
    </div>
    <div className={styles.missionImg}>
      <img src={MissionImg} alt="Bác sĩ Doctor4U" />
    </div>
  </div>
</section>

      {/* 2. Vì sao nên chọn Doctor4U? - 4 ô vuông */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Vì sao nên chọn <span>Doctor4U</span>?</h2>
          <div className={styles.valuesGrid}>
            {[
              { img: Value1, title: "Bác sĩ kinh nghiệm và thân thiện", desc: "Đội ngũ bác sĩ của chúng tôi gồm những chuyên gia hàng đầu tại các bệnh viện lớn nhiều năm." },
              { img: Value2, title: "Khám chữa bệnh mọi lúc mọi nơi", desc: "Với nền tảng công nghệ hiện đại, dễ dùng, bạn có thể được khám bệnh từ bất kì đâu có kết nối mạng." },
              { img: Value3, title: "Dễ dàng sử dụng, hỗ trợ nhanh chóng", desc: "Ứng dụng của Doctor4U dễ sử dụng với mọi lứa tuổi, và khi bạn cần, chúng tôi luôn sẵn sàng hỗ trợ." },
              { img: Value4, title: "Thông tin sức khỏe được lưu trữ hợp lý, lâu dài", desc: "Những thông tin bệnh án của bạn được lưu trữ trên hệ thống, dễ dàng truy cập và theo dõi từ tài khoản của bạn." },
            ].map((item, i) => (
              <div key={i} className={styles.valueCard}>
                <img src={item.img} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Câu hỏi thường gặp - Accordion style giống trang thật */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Câu hỏi thường gặp</h2>
          <div className={styles.faqList}>
            {[
              { q: "Doctor4U là gì?", a: "Doctor4U là nền tảng tư vấn và khám sức khỏe trực tuyến qua ứng dụng điện thoại hoặc website www.Doctor4U.vn." },
              { q: "Doctor4U có thể tư vấn chữa trị những tình trạng thường gặp nào?", a: "Các triệu chứng cảm cúm, bệnh lý về xoang, nhiễm trùng đường hô hấp, dị ứng, bệnh ngoài da, bệnh mãn tính và các tình trạng không cần cấp cứu." },
              { q: "Làm thế nào để đặt khám bác sĩ?", a: "Tải ứng dụng Doctor4U → Đăng ký tài khoản → Chọn bác sĩ → Đặt lịch → Bác sĩ sẽ gọi video cho bạn đúng giờ." },
              { q: "Dịch vụ của Doctor4U bao gồm những gì?", a: "Khám bệnh trực tuyến, chăm sóc bệnh mãn tính, tư vấn tâm lý, phương pháp phòng bệnh và nhiều dịch vụ khác." },
            ].map((item, i) => (
              <details key={i} className={styles.faqItem}>
                <summary>{i + 1}. {item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Giá trị cốt lõi - 3 ô lớn (bác sĩ, bệnh nhân, doanh nghiệp) */}
      <section className={styles.coreValuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Giá trị cốt lõi</h2>
          <div className={styles.coreGrid}>
            <div className={styles.coreCard}>
              <h3>Đối với bác sĩ</h3>
              <p>Tăng thu nhập, linh hoạt thời gian, tiếp cận nhiều bệnh nhân hơn</p>
            </div>
            <div className={styles.coreCard}>
              <h3>Đối với người khám</h3>
              <p>Tiết kiệm thời gian, chi phí, được bác sĩ giỏi khám tận tình</p>
            </div>
            <div className={styles.coreCard}>
              <h3>Đối với doanh nghiệp</h3>
              <p>Chăm sóc sức khỏe nhân viên hiệu quả, nâng cao năng suất làm việc</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Liên hệ với Doctor4U - Nền xanh lá + 3 cột */}
      <section className={styles.contactSection}>
        <div className={styles.contactOverlay}>
          <div className={styles.container}>
            <h2 className={styles.contactTitle}>Liên hệ với Doctor4U</h2>
            <div className={styles.contactGrid}>
              {/* Cột 1: Bác sĩ */}
              <div className={styles.contactCol}>
                <div className={styles.icon}>Doctor</div>
                <h3>Dành cho bác sĩ</h3>
                <p>Liên hệ để hợp tác và bắt đầu khám chữa bệnh tại Doctor4U</p>
                <div className={styles.phone}>024 32 212 212</div>
                <a href="tel:02432212212" className={styles.btn}>Liên hệ hợp tác</a>
              </div>

              {/* Cột 2: Doanh nghiệp */}
              <div className={styles.contactCol}>
                <div className={styles.icon}>Company</div>
                <h3>Khách hàng doanh nghiệp</h3>
                <p>Gia tăng quyền lợi và chăm sóc sức khỏe cho cán bộ, nhân viên của doanh nghiệp</p>
                <div className={styles.phone}>024 32 212 212</div>
                <a href="tel:02432212212" className={styles.btn}>Liên hệ hợp tác</a>
              </div>

              {/* Cột 3: Bệnh nhân */}
              <div className={styles.contactCol}>
                <div className={styles.icon}>Download</div>
                <h3>Dành cho bệnh nhân</h3>
                <p>Tải ứng dụng di động để lựa chọn bác sĩ, đặt lịch và khám bệnh, lưu đơn thuốc</p>
                <div className={styles.storeButtons}>
                  <img src={AppStore} alt="App Store" />
                  <img src={GooglePlay} alt="Google Play" />
                </div>
              </div>
            </div>
            <div className={styles.hotline}>
              Hỗ trợ: care@Doctor4U.vn | Hotline: <strong>024 32 212 212</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;