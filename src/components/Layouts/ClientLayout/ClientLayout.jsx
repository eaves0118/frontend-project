// src/components/Layouts/ClientLayout/ClientLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default ClientLayout;
