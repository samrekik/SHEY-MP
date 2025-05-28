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
//edit status product
export const EditStatusProduct = async (id,status) => {
  try {
    const response = await axiosInstance.put(
      `/product/edit-product-status/${id}`,
      {status}
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
export const getAllProduct = async (filters) => {
  try {
    const response = await axiosInstance.post("/product/get-product", filters);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
//upload product image
export const UploadProductImage=async(payload)=>{
  try {
    const response =await axiosInstance.post('/product/upload-image-to-product',payload)
    return response.data
  } catch (error) {
    return error.message;
  }
}