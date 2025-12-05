import React, { useEffect, useState } from "react";
import Table from "@components/ui/table";
import Button from "@components/ui/button";
import { doctorApi } from "@services/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip, Stack } from "@mui/material";
import EditDoctorDialog from "./EditDoctorDialog";

const Doctors = () => {
  const [doctor, setDoctor] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    doctorApi.getAll().then((res) => {
      const data = res.map((item, index) => ({
        id: item.id || index,
        avatar: item.avatarUrl,
        fullName: item.fullName,
        email: item.email,
        specialization: item.specialization?.name || "",
        licenseNumber: item.licenseNumber,
        isActive: item.isActive ? "Đang hoạt động" : "Ngừng",
      }));
      setDoctor(data);
    });
  }, []);

  const fetchDoctors = async () => {
    const res = await doctorApi.getAll();
    const data = res.map((item, index) => ({
      id: item.id || index,
      avatarUrl: item.avatarUrl,
      fullName: item.fullName,
      email: item.email,
      specialization: item.specialization?.name || "",
      licenseNumber: item.licenseNumber,
      isActive: item.isActive ? "Đang hoạt động" : "Ngừng",
    }));
    setDoctor(data);
  };

  useEffect(() => { fetchDoctors(); }, []);

  const handleOpenEdit = (row) => {
    setSelected(row);
    setOpenEdit(true);
  };

  const columns = [
    {
      field: "avatar",
      headerName: "Ảnh",
      width: 80,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="avatar"
          style={{
            width: 40,
            height: 40,
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      ),
    },
    { field: "id", headerName: "ID", width: 80 },
    { field: "fullName", headerName: "Họ tên", width: 200 },
    { field: "email", headerName: "Email", width: 230 },
    { field: "specialization", headerName: "Chuyên khoa", width: 180 },
    { field: "licenseNumber", headerName: "Mã chứng chỉ", width: 140 },
    { field: "isActive", headerName: "Trạng thái", width: 150 },

    {
      field: "actions",
      headerName: "Action",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Chỉnh sửa">
            <IconButton
              color="primary"
              onClick={() => handleOpenEdit(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Xóa">
            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <div style={{ width: "250px", margin: "15px 0px" }}>
        <Button content={"Thêm bác sĩ mới"} />
      </div>

      <Table columns={columns} rows={doctor} />

      <EditDoctorDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        doctorData={selected}
        onSuccess={fetchDoctors}
      />
    </div>
  );
};

export default Doctors;
