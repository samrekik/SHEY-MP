import { axiosInstance } from "./axiosInstance";
//add new product
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/product/add-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//edit product
export const EditProduct = async (id,payload) => {
  try {
    const response = await axiosInstance.put(
      `/product/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
     return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
//delete product
export const DeleteProduct = async (id,payload) => {
  try {
    const response = await axiosInstance.delete(
      `/product/delete-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
     return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
//get all product
export const getAllProduct = async (payload) => {
  try {
    const response = await axiosInstance.get("/product/get-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
