import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Table, Image, Tabs, Tab, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { FiUser, FiMail, FiStar, FiClock, FiDollarSign, FiEdit3, FiCheck, FiX, FiCamera } from "react-icons/fi";
import axiosClient from "@/services/api"; // hoặc đường dẫn đúng của bạn

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editMode, setEditMode] = useState(""); // "bio" | "schedule" | "fee" | "avatar" | "email"
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/doctors/me"); // API thật
        const data = res.data;

        setDoctor(data);
        setOriginalData(JSON.parse(JSON.stringify(data))); // deep clone
      } catch (err) {
        console.error("Lỗi tải hồ sơ bác sĩ:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  const saveChanges = async () => {
    setSaving(true);
    try {
      await axiosClient.put("/doctors/me", doctor); // GỌI API THẬT ĐỂ LƯU
      setShowSuccess(true);
      setOriginalData(JSON.parse(JSON.stringify(doctor)));
      setEditMode("");
      setAvatarPreview(null);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      alert("Lưu thất bại! Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setDoctor(JSON.parse(JSON.stringify(originalData)));
    setEditMode("");
    setAvatarPreview(null);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setDoctor((prev) => ({
        ...prev,
        profile: { ...prev.profile, avatarUrl: reader.result },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleScheduleChange = (day, field, value) => {
    const updated = doctor.schedules.map((item) =>
      item.day === day ? { ...item, [field]: value } : item
    );
    setDoctor({ ...doctor, schedules: updated });
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const vietnameseDays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];

  // Loading
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" style={{ width: "4.5rem", height: "4.5rem" }} />
        <p className="mt-4 fs-4 text-muted">Đang tải hồ sơ bác sĩ...</p>
      </div>
    );
  }

  // Không có dữ liệu
  if (!doctor) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center py-5">
          Không tìm thấy thông tin bác sĩ
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {showSuccess && (
        <Alert variant="success" className="text-center fw-bold fs-5">
          Cập nhật hồ sơ thành công!
        </Alert>
      )}

      {/* Header + Avatar */}
      <div className="text-center mb-5">
        <div className="position-relative d-inline-block">
          <Image
            src={avatarPreview || doctor.profile?.avatarUrl || "https://i.pravatar.cc/400"}
            roundedCircle
            width={220}
            height={220}
            className="shadow-lg border border-5 border-white"
          />
          {editMode !== "avatar" && (
            <Button
              size="sm"
              variant="primary"
              className="position-absolute bottom-0 end-0 translate-middle"
              style={{ borderRadius: "50%", width: "48px", height: "48px" }}
              onClick={() => setEditMode("avatar")}
            >
              <FiCamera size={20} />
            </Button>
          )}
        </div>

        {editMode === "avatar" && (
          <div className="mt-4">
            <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
            <div className="mt-3">
              <Button variant="success" onClick={saveChanges} disabled={saving}>
                <FiCheck /> Lưu ảnh
              </Button>{" "}
              <Button variant="secondary" onClick={cancelEdit}>
                <FiX /> Hủy
              </Button>
            </div>
          </div>
        )}

        <h2 className="mt-4 fw-bold text-primary">{doctor.profile?.fullName}</h2>
        <p className="text-muted fs-5">
          {doctor.specialty} • {doctor.yearsExperience} năm kinh nghiệm
        </p>
        <Badge bg="success" pill className="px-4 py-2 fs-5">
          Đang hoạt động
        </Badge>
        <div className="mt-3 fs-4 text-warning">
          <FiStar /> {doctor.rating || 0} ({doctor.reviewCount || 0} đánh giá)
        </div>
      </div>

      <Row className="g-5">
        {/* Thông tin nhanh bên trái */}
        <Col lg={4}>
          <Card className="shadow border-0">
            <Card.Body>
              <h5 className="text-primary fw-bold mb-4">
                <FiUser className="me-2" />
                Thông tin bác sĩ
              </h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="py-3">
                  <strong>Giấy phép:</strong> {doctor.licenseNumber || "Chưa cập nhật"}
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Email:</strong> {doctor.email}
                </ListGroup.Item>
                <ListGroup.Item className="py-3">
                  <strong>Phí tư vấn (30p):</strong>
                  <span className="text-success fs-5 fw-bold ms-2">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(doctor.fee || 0)}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Tabs chỉnh sửa */}
        <Col lg={8}>
          <Tabs defaultActiveKey="bio" className="mb-4" justify fill>
            {/* TAB GIỚI THIỆU */}
            <Tab eventKey="bio" title={<><FiUser className="me-2" />Giới thiệu</>}>
              <Card className="shadow-sm border-0">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Giới thiệu bản thân</h5>
                  {editMode !== "bio" ? (
                    <Button size="sm" variant="outline-primary" onClick={() => setEditMode("bio")}>
                      <FiEdit3 /> Chỉnh sửa
                    </Button>
                  ) : (
                    <div>
                      <Button size="sm" variant="success" onClick={saveChanges} disabled={saving}>
                        <FiCheck /> Lưu
                      </Button>{" "}
                      <Button size="sm" variant="secondary" onClick={cancelEdit}>
                        <FiX /> Hủy
                      </Button>
                    </div>
                  )}
                </Card.Header>
                <Card.Body>
                  {editMode === "bio" ? (
                    <Form.Control
                      as="textarea"
                      rows={8}
                      value={doctor.bio || ""}
                      onChange={(e) => setDoctor({ ...doctor, bio: e.target.value })}
                    />
                  ) : (
                    <p className="lh-lg text-muted fs-5">{doctor.bio || "Chưa có giới thiệu"}</p>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            {/* TAB LỊCH KHÁM */}
            <Tab eventKey="schedule" title={<><FiClock className="me-2" />Lịch làm việc</>}>
              <Card className="shadow-sm border-0">
                <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                  <h5 className="mb-0 fw-bold">Lịch khám trong tuần</h5>
                  {editMode !== "schedule" ? (
                    <Button size="sm" variant="outline-primary" onClick={() => setEditMode("schedule")}>
                      <FiEdit3 className="me-1" />
                      Chỉnh sửa
                    </Button>
                  ) : (
                    <div>
                      <Button size="sm" variant="success" onClick={saveChanges} disabled={saving}>
                        <FiCheck className="me-1" />
                        Lưu
                      </Button>{" "}
                      <Button size="sm" variant="secondary" onClick={cancelEdit}>
                        <FiX className="me-1" />
                        Hủy
                      </Button>
                    </div>
                  )}
                </Card.Header>

                <Card.Body className="p-0">
                  <Table bordered hover responsive className="mb-0 text-center align-middle">
                    <thead className="table-primary">
                      <tr>
                        <th style={{ width: "15%" }}>Thứ</th>
                        <th style={{ width: "15%" }}>Trạng thái</th>
                        <th>Giờ khám</th>
                        <th style={{ width: "20%" }}>Số bệnh nhân tối đa</th>
                      </tr>
                    </thead>
                    <tbody>
                      {daysOfWeek.map((day, i) => {
                        const sched = doctor.schedules?.find((s) => s.day === day) || { active: false };

                        return (
                          <tr key={i}>
                            {/* Thứ trong tuần */}
                            <td>
                              <strong>{vietnameseDays[i]}</strong>
                            </td>

                            {/* Trạng thái (switch khi đang sửa) */}
                            <td>
                              {editMode === "schedule" ? (
                                <Form.Check
                                  type="switch"
                                  checked={sched.active}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      // Bật lịch – mặc định 08:00–12:00, 10 bệnh nhân
                                      const updated = doctor.schedules.filter((s) => s.day !== day);
                                      updated.push({
                                        day,
                                        start: "08:00",
                                        end: "12:00",
                                        maxPatients: 10,
                                        active: true,
                                      });
                                      setDoctor({ ...doctor, schedules: updated });
                                    } else {
                                      // Tắt lịch
                                      setDoctor({
                                        ...doctor,
                                        schedules: doctor.schedules.filter((s) => s.day !== day),
                                      });
                                    }
                                  }}
                                />
                              ) : (
                                <Badge bg={sched.active ? "success" : "secondary"} pill>
                                  {sched.active ? "Làm việc" : "Nghỉ"}
                                </Badge>
                              )}
                            </td>

                            {/* Giờ khám */}
                            <td>
                              {sched.active ? (
                                editMode === "schedule" ? (
                                  <div className="d-flex justify-content-center gap-2">
                                    <Form.Control
                                      type="time"
                                      value={sched.start || "08:00"}
                                      onChange={(e) => handleScheduleChange(day, "start", e.target.value)}
                                      style={{ width: "110px" }}
                                    />
                                    <span className="align-self-center">–</span>
                                    <Form.Control
                                      type="time"
                                      value={sched.end || "12:00"}
                                      onChange={(e) => handleScheduleChange(day, "end", e.target.value)}
                                      style={{ width: "110px" }}
                                    />
                                  </div>
                                ) : (
                                  `${sched.start} – ${sched.end}`
                                )
                              ) : (
                                "—"
                              )}
                            </td>

                            {/* Số bệnh nhân tối đa */}
                            <td>
                              {sched.active ? (
                                editMode === "schedule" ? (
                                  <Form.Control
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={sched.maxPatients || 10}
                                    onChange={(e) => handleScheduleChange(day, "maxPatients", Number(e.target.value))}
                                    style={{ width: "80px", margin: "0 auto" }}
                                  />
                                ) : (
                                  <strong>{sched.maxPatients}</strong>
                                )
                              ) : (
                                "—"
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab>

            {/* TAB PHÍ KHÁM */}
            <Tab eventKey="fee" title={<><FiDollarSign className="me-2" />Phí khám</>}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <h5>Phí tư vấn trực tuyến (30 phút)</h5>
                  {editMode === "fee" ? (
                    <InputGroup className="w-50 mt-3">
                      <Form.Control
                        type="number"
                        value={doctor.fee}
                        onChange={(e) => setDoctor({ ...doctor, fee: Number(e.target.value) })}
                      />
                      <InputGroup.Text>VND</InputGroup.Text>
                    </InputGroup>
                  ) : (
                    <h2 className="text-success fw-bold mt-3">
                      {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(doctor.fee)}
                    </h2>
                  )}
                  <div className="mt-4">
                    {editMode !== "fee" ? (
                      <Button variant="outline-primary" onClick={() => setEditMode("fee")}>
                        <FiEdit3 /> Cập nhật phí
                      </Button>
                    ) : (
                      <>
                        <Button variant="success" onClick={saveChanges} disabled={saving}>
                          <FiCheck /> Lưu
                        </Button>{" "}
                        <Button variant="secondary" onClick={cancelEdit}>
                          <FiX /> Hủy
                        </Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorProfile;