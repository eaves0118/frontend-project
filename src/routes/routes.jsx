import ClientLayout from "@components/Layouts/ClientLayout/ClientLayout";
import HomePage from "@pages/Client/HomePage/HomePage";
import DoctorListPage from "@pages/Client/DoctorPage/DoctorPage"; // 👈 thêm trang bác sĩ

const routes = [
  {
    path: "/",
    element: ClientLayout,
    children: [
      { path: "", element: HomePage },
      { path: "doctors", element: DoctorListPage }, // 👈 route mới
    ],
  },
];

export default routes;
