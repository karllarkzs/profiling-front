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
export const useFetchMedicines = () => {
  return useQuery("medicines", async () => {
    const response = await axiosInstance.get("/medicines");
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
export const createMedicine = async (medicineData) => {
  try {
    const response = await axiosInstance.post("/medicines", {
      data: medicineData,
    });
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Error creating medicine:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
export const deleteMedicine = async (medicineId, refetch) => {
  try {
    const response = await axiosInstance.delete(`/medicines/${medicineId}`);
    refetch();
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Error deleting medicine:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const deleteCondition = async (conditionId) => {
  console.log("tes", conditionId);
  try {
    const response = await axiosInstance.put(`/conditions/${conditionId}`, {
      data: {
        isDeleted: true,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Error deleting condition:", error);
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
    console.error("Error creating medication:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export const editMedicine = async (id, data) => {
  try {
    console.log(id, data);
    const response = await axiosInstance.put(`/medicines/${id}`, {
      data: {
        med_brand: data.med_brand,
        med_generic: data.med_generic,
        med_type: data.med_type,
        med_dosage: data.med_dosage,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Error editing medicine:", error);
    throw error; // Rethrow the error to be caught by the caller
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

// export const createDiagnostic = async (formDataDiag, file) => {
//   try {
//     const response = await axiosInstance.post("/diagnostics", {
//       data: formDataDiag,
//     });

//     const diagnosticId = response.data.data.id;

//     console.log("respons", response.data);
//     const formData = new FormData();
//     formData.append("files", file);
//     formData.append("ref", "api::diagnostic.diagnostic");
//     formData.append("refId", diagnosticId);
//     formData.append("field", "diagnostic_file");
//     console.log("file", file);
//     try {
//       const response = await fetch("http://192.168.30.36:1337/api/upload", {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization:
//             "Bearer 8022475ad18182f091484c1cfaf234f690d20f2b7fc7a5fcb825d48f34340dade04afbd8854013c79d6b85fe26352b54471547bde318510500ba8708764dca1f69bd46504dfc9198b0930e392e735ac938f68615b28975d4b07944c45314ef89bed29405861e5059844ff7be38b6e4d3e7fa0490ff95e9d6f10d8b09cd50d259",
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to upload file");
//       }

//       console.log(response.body);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   } catch (error) {
//     // Handle error here
//     console.error("Error creating patient:", error);
//     throw error; // Rethrow the error to be caught by the caller
//   }
// };
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
