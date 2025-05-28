/* eslint-disable no-undef */
import { App, Button, Upload } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { EditProduct, UploadProductImage } from "../../apicalls/product";

export default function Images({
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const [file, setFile] = useState(null);
  const [showPreview,setShowPreview]=useState(true)
  const [images, setImages] = useState(selectedProduct.images);
  const deleteImage =async(image)=>{
    try{
      const updateIamge=images.filter((img)=>img!==image)
      const upadetProduct={...selectedProduct,image:updateIamge}
      const response=await EditProduct(selectedProduct._id,upadetProduct)
      if(response.success){
        message.success(response.message)
        setImages(updateIamge)
        getData();
      }else{throw new Error(response.message)}
dispatch(SetLoader(true));
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
    

  }
  const upload = async () => {
    try {
      dispatch(SetLoader(true));
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images,response.data])
           setShowPreview(false)
           setFile(null)
        getData();
      } else {
        message.error(error.message);
      }
      //upload image to cloudinary
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex gap-5 mb-5">
          {images.map((image) => {
            return (
              <div className="flex border border-solid border-gray-500 rounded p-2 items-end">
                <img className="h-20 w-20 object-cover" src={image} alt="" />
                <i
              className="ri-delete-bin-line"
              onClick={() => {deleteImage(image)
                
              }}
            ></i>
              </div>
            );
          })}
        </div>
      <Upload
        listType="picture"
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true)
        }}
       // beforeUpload={() => false}
       showUploadList={showPreview}
      >
        

        <Button type="dashed">Upload Image</Button>
      </Upload>
      <div className="flex justify-end gap-4 mt-5">
        <Button
          type="primary"
          onClick={() => {
            setShowProductForm(false);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
}
