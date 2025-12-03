import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// Đã loại bỏ ArrowRightIcon vì không cần menu cấp 3 hover

const pages = [
  { content: "Đội ngũ bác sĩ", to: "/doi-ngu-bac-si" },
  { content: "Về chúng tôi", to: "/ve-chung-toi" },
  { content: "Liên hệ", to: "/lien-he" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openMegaMenu, setOpenMegaMenu] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleOpenMegaMenu = (content) => {
    setOpenMegaMenu(content);
  };
  const handleCloseMegaMenu = () => {
    setOpenMegaMenu(null);
  };

  const handleMenuClick = () => {
    handleCloseNavMenu();
    handleCloseMegaMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {pages.map((page, index) =>
                page.children ? (
                  <Box key={index}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography fontWeight="bold">{page.content}</Typography>
                    </MenuItem>

                    {page.children.map((child, i) => (
                      <MenuItem
                        key={i}
                        component={Link}
                        to={child.to}
                        onClick={handleMenuClick}
                        sx={{ pl: 4 }}
                      >
                        {child.content}
                      </MenuItem>
                    ))}
                  </Box>
                ) : (
                  <MenuItem
                    key={index}
                    component={Link}
                    to={page.to}
                    onClick={handleMenuClick}
                  >
                    <Typography>{page.content}</Typography>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) =>
              page.children ? (
                <Box
                  key={index}
                  sx={{ display: "inline-block", position: "relative" }}
                  onMouseEnter={() => handleOpenMegaMenu(page.content)}
                  onMouseLeave={handleCloseMegaMenu}
                >
                  <Button
                    color="inherit"
                    sx={{
                      my: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    {page.content} <ArrowDropDownIcon fontSize="small" />
                  </Button>

                  {openMegaMenu === page.content && (
                    <Box
                      sx={{
                        position: "absolute",
                        width: "200px",
                        top: "100%",
                        left: 0,
                        bgcolor: "background.paper",
                        boxShadow: 3,
                        display: "flex",
                        flexDirection: "column",
                        py: 1,
                        px: 2,
                        zIndex: 999,
                      }}
                    >
                      {page.children.map((child, i) => (
                        <Button
                          key={i}
                          component={Link}
                          to={child.to}
                          onClick={handleMenuClick}
                          sx={{
                            justifyContent: "flex-start",
                            width: "100%",
                            textTransform: "none",
                            px: 0,
                            color: "text.primary",
                            "&:hover": {
                              bgcolor: "action.hover",
                            },
                          }}
                        >
                          {child.content}
                        </Button>
                      ))}
                    </Box>
                  )}
                </Box>
              ) : (
                <Button
                  key={index}
                  component={Link}
                  to={page.to}
                  sx={{ my: 2, color: "white" }}
                >
                  {page.content}
                </Button>
              )
            )}
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            {!isLoggedIn ? (
              <>
                <Button color="inherit" component={Link} to="/dang-nhap">
                  Đăng nhập
                </Button>
                <Button color="inherit" component={Link} to="/dang-ky">
                  Đăng ký
                </Button>
              </>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography>{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
