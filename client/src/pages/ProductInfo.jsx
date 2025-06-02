import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import moment from "moment";
import { App } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../components/Divider";
import { GetProductById } from "../apicalls/product";

export default function ProductInfo() {
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const navigate = useNavigate();

  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      console.log(id);
      const response = await GetProductById(id);
      console.log(response);
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div>
        <div className="container mx-auto grid grid-cols-2 gap-5">
          {/* images*/}
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 object-cover rounded-md"
            />
            <div className="flex gap-5">
              {product.images.map((image, index) => {
                return (
                  <img
                    src={image}
                    alt=""
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer transition-all duration-200 " +
                      (selectedImageIndex === index
                        ? "border-2 border-green-700 border-dashed p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                  />
                );
              })}
            </div>
            <div>
              <Divider/>
        <h1 className="text-gray-600">Added On</h1>
        <span className="text-gray-600">{moment(product.createdAt).format("MMM D, YYYY hh:mm A")}</span>
      </div>
          </div>
          {/* details*/}
          <div className="flex flex-col gap-3">
            <div>
                <h1 className="text-2xl font-semibold text-orange-900">{product.name}</h1>
                <span>{product.description}</span>
            </div>
            <Divider/>
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-orange-900">product details</h1>
                <div className="flex justify-between mt-2">
                    <span>Price</span>
                    <span>{product.price}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Category</span>
                    <span className="uppercase">{product.category}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Bill Available</span>
                    <span>{product.billAvailable ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Box Available</span>
                    <span>{product.boxAvailable ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Warranty Available</span>
                    <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Accessories Available</span>
                    <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
                </div>
            </div>
            <Divider/>
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-orange-900">Seller details</h1>
               <div className="flex justify-between mt-2">
                    <span>Name</span>
                    <span>{product.seller.name}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Email</span>
                    <span>{product.seller.email}</span>
                </div>
               
            </div>
          </div>
        </div>
      </div>
    )
  );
}
