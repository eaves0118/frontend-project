import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Switch, FormControlLabel
} from "@mui/material";
import { useEffect, useState } from "react";
import { doctorApi } from "@/services/api";
import { toast } from "react-toastify";

export default function EditDoctorDialog({ open, onClose, doctorData, onSuccess }) {
  const [form, setForm] = useState({
    licenseNumber: "",
    isActive: true
  });

  useEffect(() => {
    if (doctorData) {
      setForm({
        licenseNumber: doctorData.licenseNumber || "",
        isActive: Boolean(doctorData.isActive)
      });
    }
  }, [doctorData]);

  const handleSubmit = async () => {
    try {
      const payload = {
        licenseNumber: form.licenseNumber,
        isActive: form.isActive
      };

      await doctorApi.update(doctorData.id, payload);
      toast.success("Cập nhật thành công!");
      onSuccess && onSuccess();
      onClose();

    } catch (err) {
      toast.error("Cập nhật thất bại!");
      console.log(err.response?.data || err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Cập nhật bác sĩ</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>

        <TextField
          label="Mã chứng chỉ hành nghề"
          value={form.licenseNumber}
          onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
          }
          label="Đang hoạt động"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant="contained" onClick={handleSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
