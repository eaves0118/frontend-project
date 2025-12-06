import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import Button from "../../../components/ui/button";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "@/providers/UserProvider";
import { TableBase } from "../../../components/ui/table";
import { GridToolbarContainer } from "@mui/x-data-grid";

const Patients = () => {
  const { patients, loadingPatients, refreshPatients, deletePatient } =
    useContext(UserContext);

  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState([]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Chưa có";
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "Không hợp lệ"
      : date.toLocaleDateString("vi-VN");
  };

  // Map patients từ context
  useEffect(() => {
    const mapped = patients.map((p) => ({
      id: p.id,
      fullName: p.fullName || "",
      email: p.email || "",
      gender:
        p.gender === "Male" ? "Nam" : p.gender === "Female" ? "Nữ" : "Khác",
      dateOfBirth: formatDate(p.dateOfBirth),
      originalDate: p.dateOfBirth,
    }));
    setRows(mapped);
  }, [patients]);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bệnh nhân này?")) return;

    try {
      await deletePatient(id);
      alert("Xóa thành công!");
    } catch (error) {
      alert("Xóa thất bại!");
    }
  };

  const filteredRows = rows.filter(
    (row) =>
      row.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "Họ và tên", flex: 1, minWidth: 220 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 240 },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 110,
      align: "center",
      headerAlign: "center",
    },
    { field: "dateOfBirth", headerName: "Ngày sinh", width: 130 },
    {
      field: "actions",
      headerName: "Xóa",
      width: 100,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title="Xóa bệnh nhân">
          <Button content={"Xóa"} onClick={() => handleDelete(params.row.id)} />
          <DeleteIcon fontSize="small" />
        </Tooltip>
      ),
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer sx={{ justifyContent: "flex-end", p: 2 }}>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Tìm tên hoặc email..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: 320 }}
      />
      <Button variant="contained" sx={{ ml: 2 }} onClick={refreshPatients}>
        Làm mới
      </Button>
    </GridToolbarContainer>
  );

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">Danh sách Bệnh nhân</Typography>
        <div style={{ width: "250px" }}>
          <Button
            content="+ Bệnh nhân"
            variant="contained"
            onClick={() => setOpenCreate(true)}
          />
        </div>
      </Box>
      <Paper sx={{ overflow: "hidden" }}>
        <Box sx={{ height: 700, width: "100%" }}>
          <TableBase
            rows={filteredRows}
            columns={columns}
            loading={loadingPatients}
            rowHeight={60}
            getRowId={(row) => row.id}
            components={{ Toolbar: CustomToolbar }}
            pageSizeOptions={[10, 25, 50]}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#f5f5f5",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </Paper>
    </>
  );
};

export default Patients;
