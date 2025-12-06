import React, { createContext, useState, useEffect } from "react";
import { doctorApi } from "@services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);

  const totalDoctors = doctors.length;
  const isActiveDoctor = doctors.filter((a) => a.isActive).length;

  const fetchDoctors = async () => {
    try {
      setLoadingDoctors(true);
      const res = await doctorApi.getAll();
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDoctors(false);
    }
  };

  const addDoctor = async (data) => {
    try {
      const res = await doctorApi.create(data);
      setDoctors((prev) => [...prev, res.data]);
    } catch (error) {
      throw error;
    }
  };

  const updateDoctor = async (id, data) => {
    try {
      const res = await doctorApi.update(id, data);
      setDoctors((prev) => prev.map((d) => (d.id === id ? res.data : d)));
    } catch (error) {
      throw error;
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await doctorApi.delete(id);
      setDoctors((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <UserContext.Provider
      value={{
        doctors,
        loadingDoctors,
        totalDoctors,
        isActiveDoctor,
        refreshDoctors: fetchDoctors,
        addDoctor,
        updateDoctor,
        deleteDoctor,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
