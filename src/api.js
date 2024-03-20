import axios from "axios";
import { useQuery } from "react-query";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const useFetchPatients = () => {
  return useQuery("patients", async () => {
    const response = await axiosInstance.get("/patients");
    return response.data;
  });
};

export const useFetchPatientById = (id) => {
  return useQuery(["patient", id], async () => {
    const response = await axiosInstance.get(`/patients/${id}`);
    return response.data;
  });
};

export const createPatient = async (patientData) => {
  try {
    const response = await axiosInstance.post("/patients", {
      data: patientData,
    });
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Error creating patient:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const createMedication = async (medicationData) => {
  try {
    const response = await axiosInstance.post("/medications", {
      data: medicationData,
    });
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Error creating patient:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const deleteCondition = async (conditionId) => {
  try {
    const response = await axiosInstance.put(`/conditions/${conditionId}`, {
      data: {
        isDeleted: true,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Error creating patient:", error);
    throw error;
  }
};

export const editCondition = async (
  conditionId,
  conditionName,
  conditionDescription
) => {
  console.log("name", conditionName);
  try {
    const response = await axiosInstance.put(`/conditions/${conditionId}`, {
      data: {
        name: conditionName,
        description: conditionDescription,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Error creating patient:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const createDiagnostic = async (formDataDiag, imagePath) => {
  try {
    await axiosInstance.post("/diagnostics", {
      data: { filePath: imagePath, ...formDataDiag }, // Include imagePath inside data
    });
  } catch (error) {
    console.error("Error creating diagnostic:", error);
    throw error;
  }
};
export const useFetchDiagnostics = () => {
  return useQuery("diagnostics", async () => {
    try {
      const response = await axiosInstance.get("/diagnostics");
      return response.data;
    } catch (error) {
      console.error("Error fetching diagnostics:", error);
      throw error;
    }
  });
};

export const createCondition = async (patientId, name, description) => {
  const url = `${process.env.REACT_APP_API_BASE_URL}conditions`;

  try {
    const response = await axiosInstance.post(url, {
      data: {
        patientId: patientId,
        name: name,
        description: description,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating condition:", error);
    throw error;
  }
};
export const useLogin = () => {
  const loginUser = async (loginData) => {
    try {
      const response = await axiosInstance.post("/auth/local", loginData);
      console.log("Login successful from api:", response.data);
      // Store the user's information in localStorage if needed
      localStorage.setItem("loggedInUser", JSON.stringify(response.data.user));
      return response.data; // Return the complete response data
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  return loginUser;
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
