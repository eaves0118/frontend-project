import ClientLayout from "@components/Layouts/ClientLayout/ClientLayout";
import AdminLayout from "@components/Layouts/AdminLayout/AdminLayout";
import HomePage from "@pages/Client/HomePage/HomePage";
import AboutUsPage from "@pages/Client/HomePage/AboutUsPage"; 
import PatientProfile from "@pages/Client/Profile/PatientProfile";  
import DoctorProfile from "@pages/Client/Profile/DoctorProfile";
import Dashboard from "@pages/Admin/Dashboard/Dashboard";
import Patients from "@pages/Admin/Patients/Patients";
import AdminProfile from "@pages/Admin/Profile/AdminProfile";
import Doctors from "@pages/Admin/Doctors/Doctors";
import Schedule from "@pages/Admin/Schedule/Schedule";
import Reports from "@pages/Admin/Reports/Reports";
import Settings from "@pages/Admin/Settings/Settings";
import Login from "@components/Login/Login";
import Register from "@components/Register/Register";
import ProtectRoutes from "./ProtectRoutes";

const routes = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { path: "", element: <HomePage /> },
      
    
      { path: "vechungtoi", element: <AboutUsPage /> },  
      { path: "dang-nhap", element: <Login /> },
      { path: "dang-ky", element: <Register /> },
      { path: "hoso", element: <PatientProfile /> },
      { path: "hosobacsi", element: <DoctorProfile /> }
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectRoutes>
        <AdminLayout />
      </ProtectRoutes>
    ),
    children: [
      { path: "hoso", element: <AdminProfile /> },
      { path: "bang-dieu-khien", element: <Dashboard /> },
      { path: "benh-nhan", element: <Patients /> },
      { path: "bac-si", element: <Doctors /> },
      { path: "lich-lam-viec", element: <Schedule /> },
      { path: "bao-cao", element: <Reports /> },
      { path: "cai-dat", element: <Settings /> },
    ],
  },
];

export default routes;