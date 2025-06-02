import axiosInstance from "./axiosIntance";

export const updateProfle = async (formData: FormData) => {
  try {
    const response = await axiosInstance.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
