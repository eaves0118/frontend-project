import React, { useEffect, useState } from "react";
import { TableBase } from "../../../components/ui/table";
import { specApi } from "../../../services/api";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DoctorStatistic from "../Doctors/DoctorStatistic";
import styles from "./style.module.scss";
import SpecialtyStatistic from "./SpecialtyStatistic";
const specialtyColumns = [
  { field: "code", headerName: "Mã chuyên khoa", width: 150 },
  { field: "name", headerName: "Tên chuyên khoa", width: 220 },
  { field: "category", headerName: "Danh mục", width: 180 },

  {
    field: "actions",
    headerName: "Thao tác",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <CreateOutlinedIcon
          style={{ cursor: "pointer", color: "#1976d2" }}
          onClick={() => console.log("Edit:", params.row)}
        />

        <DeleteOutlineOutlinedIcon
          style={{ cursor: "pointer", color: "#d32f2f" }}
          onClick={() => console.log("Delete:", params.row)}
        />
      </div>
    ),
  },
];




const Specialty = () => {
  const [specialty, setSpecialty] = useState([]);
  const totalSpec = specialty.length;

  const fetchSpecialty = async () => {
    try {
      const res = await specApi.getAll();
      setSpecialty(res.data);   
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSpecialty();
  }, []);

  console.log(specialty)

  return (
    <div className={styles.spec__wrapper}>
      <TableBase
        rows={specialty}
        columns={specialtyColumns}
        getRowId={(row) => row.code}
      />
        <div>
          <SpecialtyStatistic value={totalSpec}/>
        </div>
    </div>
  );
};

export default Specialty;
