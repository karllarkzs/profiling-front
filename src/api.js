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

export const createDiagnostic = async (formDataDiag, file) => {
  try {
    const response = await axiosInstance.post("/diagnostics", {
      data: formDataDiag,
    });

    const diagnosticId = response.data.data.id;

    console.log("respons", response.data);
    const formData = new FormData();
    formData.append("files", file);
    formData.append("ref", "api::diagnostic.diagnostic");
    formData.append("refId", diagnosticId);
    formData.append("field", "diagnostic_file");
    console.log("file", file);
    try {
      const response = await fetch(
        "https://profiling-2024-45cbe2fd9ee2.herokuapp.com/api/upload",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization:
              "Bearer 56a9633bd0a665b317a390299fc1ddc21ab536ed3dbe39550c5cfb72ca573b91cb7d0edb58c8e4782841bd3c90f79d79c21db12cb6a7b1190b2c377812d67b5fdf629c88c5c8e522f1db78892c9da827b0933e5a466bf7cfe700b1359b475462ba68d9bded424efa6f3efd1da5d8db69ab4e6e942a8c715b217f31739b485af1",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      console.log(response.body);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  } catch (error) {
    // Handle error here
    console.error("Error creating patient:", error);
    throw error; // Rethrow the error to be caught by the caller
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
