import { useState, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { IoChatbubblesOutline } from "react-icons/io5";
import { doctors } from "@pages/Client/DoctorPage/mock/doctors";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState(0);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => doctors.map(() => []));

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      // chỉ scroll khi mở cửa sổ chat
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeDoctor, open]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const copy = [...messages];
    copy[activeDoctor].push({
      from: "me",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "/your-avatar.png",
    });
    setMessages(copy);
    setMessage("");

    setTimeout(() => {
      const reply = [...copy];
      reply[activeDoctor].push({
        from: "doctor",
        text: "Cảm ơn bạn! Tôi sẽ hỗ trợ ngay.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: doctors[activeDoctor].avatar,
      });
      setMessages(reply);
    }, 800);
  };

  const bookAppointment = () => {
    const copy = [...messages];
    copy[activeDoctor].push({
      from: "system",
      text: `📅 Yêu cầu đặt lịch gửi tới ${doctors[activeDoctor].name}.`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setMessages(copy);
  };

  // Handler để đóng về icon (minimize)
  const minimize = () => setOpen(false);

  // Prevent body from scrolling when chat open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      {/* Floating icon (only when closed) */}
      {!open && (
        <button
          className={styles.floatingBtn}
          aria-label="Mở chat"
          onClick={() => setOpen(true)}
        >
          <IoChatbubblesOutline className={styles.floatingIcon} />
        </button>
      )}

      {/* Full overlay chat (only when open) */}
      {open && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.container}>
            <header className={styles.header}>
              <div className={styles.headerLeft}>
                <div className={styles.headerTitle}>Tư vấn y tế trực tuyến</div>
                <div className={styles.headerSubtitle}>
                  {doctors[activeDoctor].name} —{" "}
                  {doctors[activeDoctor].specialty}
                </div>
              </div>

              <div className={styles.headerRight}>
                <button className={styles.bookBtn} onClick={bookAppointment}>
                  📅 Đặt lịch
                </button>
                <button
                  className={styles.minimizeBtn}
                  onClick={minimize}
                  aria-label="Thu nhỏ"
                >
                  ─
                </button>
                <button
                  className={styles.closeBtn}
                  onClick={() => setOpen(false)}
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>
            </header>

            <div className={styles.body}>
              <aside className={styles.sidebar}>
                <input
                  className={styles.search}
                  placeholder="Tìm kiếm bác sĩ..."
                />

                <div className={styles.list}>
                  {doctors.map((doc, idx) => (
                    <div
                      key={doc.id}
                      className={`${styles.listItem} ${
                        activeDoctor === idx ? styles.active : ""
                      }`}
                      onClick={() => setActiveDoctor(idx)}
                    >
                      <div className={styles.avatar}>
                        {/* fallback: show initials when avatar URL absent */}
                        {doc.avatar ? (
                          <img src={doc.avatar} alt={doc.name} />
                        ) : (
                          <span>
                            {(doc.name || "BS")
                              .split(" ")
                              .slice(-1)[0]
                              .slice(0, 2)}
                          </span>
                        )}
                        <span className={styles.onlineDot} />
                      </div>
                      <div className={styles.info}>
                        <div className={styles.name}>{doc.name}</div>
                        <div className={styles.spec}>{doc.specialty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              <section className={styles.chatPanel}>
                <div className={styles.messages}>
                  {messages[activeDoctor].length === 0 && (
                    <div className={styles.welcome}>
                      Xin chào! Tôi là {doctors[activeDoctor].name}. Tôi có thể
                      giúp gì cho bạn?
                    </div>
                  )}

                  {messages[activeDoctor].map((m, i) => (
                    <div
                      key={i}
                      className={`${styles.messageRow} ${
                        m.from === "me"
                          ? styles.msgMe
                          : m.from === "doctor"
                          ? styles.msgDoctor
                          : styles.msgSystem
                      }`}
                    >
                      {m.from !== "me" && m.from !== "system" && (
                        <img
                          src={m.avatar}
                          alt="avatar"
                          className={styles.msgAvatar}
                        />
                      )}

                      <div>
                        <div className={styles.msgBubble}>{m.text}</div>
                        <div className={styles.msgTime}>{m.time}</div>
                      </div>
                    </div>
                  ))}

                  <div ref={messagesEndRef} />
                </div>

                <div className={styles.footer}>
                  <button className={styles.attachBtn} type="button">
                    📎
                  </button>
                  <input
                    className={styles.input}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Nhập tin nhắn..."
                  />
                  <button className={styles.sendBtn} onClick={sendMessage}>
                    Gửi
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
