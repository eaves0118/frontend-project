import ClientLayout from "@components/Layouts/ClientLayout/ClientLayout";
import AdminLayout from "@components/Layouts/AdminLayout/AdminLayout";
import HomePage from "@pages/Client/HomePage/HomePage";
import Dashboard from "@pages/Admin/Dashboard/Dashboard";
import Login from "@components/Login/Login";
import Register from "@components/Register/Register";
const routes = [
  {
    path: "/",
    element: ClientLayout,
    children: [
      { path: "", element: HomePage },
      { path: "/dang-nhap", element: Login },
      { path: "/dang-ky", element: Register },
    ],
  },
  {
    path: "/admin",
    element: AdminLayout,
    children: [{ path: "", element: Dashboard }],
  },
];

export default routes;
