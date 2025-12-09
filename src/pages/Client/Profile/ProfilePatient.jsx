import React, { useContext, useState, useEffect } from "react";
import styles from "./style.module.scss";
import {
  TextField,
  Avatar,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  Paper
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../../../providers/AuthProvider";
import { patientApi } from "../../../services/api";
const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user?.avatarUrl || "/avatars/default.jpg"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    username: user?.username || "",
    phone: user?.phone || "",
    bio: user?.bio || ""
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {

    try {
      const res = await patientApi.getbyId(user.id);
      setUserData(res);
      console.log(res);
      setFormData({
        fullName: res.fullName,
        email: res.email,
        username: res.username,
        phone: res.phone,
        bio: res.bio,
      });

      setAvatarPreview(res.avatarUrl ?? "/avatars/default.jpg");
    } catch (e) {
      console.error("Error fetching user", e);
    }
  };
  if (!user) return null;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName || "",
      email: user.email || "",
      username: user.username || "",
      phone: user.phone || "",
      bio: user.bio || ""
    });
    setIsEditing(false);
  };

  return (
    <Box className={styles.container}>
      {successMessage && (
        <Alert
          severity="success"
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      )}

      <Grid container spacing={3} wrap="nowrap">
        <Grid item sx={{ minWidth: "auto" }}>
          <Card className={styles.profileCard} elevation={0}>
            <CardContent sx={{ p: 3, textAlign: "center" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                  src={avatarPreview}
                  alt={user.fullName}
                  sx={{
                    width: 150,
                    height: 150,
                    border: "4px solid white",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    mb: 2
                  }}
                />
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: -8,
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": { backgroundColor: "primary.dark" },
                    width: 40,
                    height: 40
                  }}
                >
                  <EditOutlinedIcon fontSize="small" />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </IconButton>
              </Box>

              <Typography variant="h5" fontWeight={600} gutterBottom>
                {user.fullName}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1
                }}
              >
                <EmailOutlinedIcon fontSize="small" />
                {user.email}
              </Typography>

              <Box sx={{
                display: "inline-block",
                backgroundColor: "primary.lighter",
                color: "primary.main",
                px: 2,
                py: 0.5,
                borderRadius: 20,
                fontWeight: 500,
                fontSize: "0.875rem",
                mb: 3
              }}>
                {user.userType}
              </Box>

              <Divider sx={{ my: 3 }} />
            </CardContent>
          </Card>

          {/* Account Info Card */}
          <Card className={styles.infoCard} elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Account Information
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  User ID
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {user.id}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Member Since
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Last Login
                </Typography>
                <Typography variant="body2" fontWeight={500}>
                  {new Date(user.lastLogin).toLocaleString()}
                </Typography>
              </Box>
              
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Form */}
        <Grid item sx={{ minWidth: "auto" }}>
          <Card className={styles.formCard} elevation={0}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
              }}>
                <Typography variant="h5" fontWeight={600}>
                  Edit Profile
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<CancelOutlinedIcon />}
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={isLoading ? <CircularProgress size={20} /> : <SaveOutlinedIcon />}
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<EditOutlinedIcon />}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <PersonOutlineOutlinedIcon
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                      ),
                    }}
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <BadgeOutlinedIcon
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                      ),
                    }}
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    InputProps={{
                      startAdornment: (
                        <EmailOutlinedIcon
                          sx={{ mr: 1, color: "text.secondary" }}
                        />
                      ),
                    }}
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    placeholder="+84 123 456 789"
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="medium"
                    multiline
                    rows={4}
                    placeholder="Tell us about yourself..."
                    disabled={!isEditing || isLoading}
                    sx={{ mb: 3 }}
                  />
                </Grid>
              </Grid>

              {/* Password Change Section */}
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Password Settings
                </Typography>
              </Divider>

              <Button
                variant="outlined"
                startIcon={<LockOutlinedIcon />}
                sx={{ mt: 1 }}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;