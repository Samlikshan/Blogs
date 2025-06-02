import axiosInstance from "./axiosIntance";

export const createBlogService = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(`/blog`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const listAllPostsService = async () => {
  try {
    const response = await axiosInstance.get("/blog");
    return response;
  } catch (error) {
    return error.response;
  }
};

export const listUserBlogsServie = async () => {
  try {
    const response = await axiosInstance.get("/blog/profile");
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getBlogDetailsService = async (blogId: string) => {
  try {
    const response = await axiosInstance.get(`/blog/${blogId}`);
    return response;
  } catch (error) {
    return error.resonse;
  }
};

export const updateBlogService = async (blogId: string, formData: FormData) => {
  try {
    const response = await axiosInstance.patch(`/blog/${blogId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.resonse;
  }
};

export const deleteBlogService = async (blogId: string) => {
  try {
    const response = await axiosInstance.delete(`/blog/${blogId}`);
    return response;
  } catch (error) {
    console.log(error)
    return error.resonse;
  }
};
