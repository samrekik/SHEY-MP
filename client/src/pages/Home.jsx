import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { getAllProduct } from "../apicalls/product";
import { App } from "antd";
import {  useNavigate } from "react-router-dom";
import Divider from "../components/Divider"

export default function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const navigate=useNavigate()
  const [filters, setFilters] = useState({ status: "approved" });
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getAllProduct(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
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
    <div>
      <div className="grid grid-cols-5 gap-5 m-5">
        {products?.map((prod) => {
          return (
            <div className="border border-gray-300 rounded border-solid flex flex-col gap-5 pb-2 cursor-pointer" key={prod._id} onClick={()=>navigate(`/product/${prod._id}`)}>
              <img
                src={prod.images[0]}
                className="w-full h-40 object-cover"
                alt=""
              />
             
              <div className="px-2 flex flex-col gap-1">
                <h1 className="text-lg font-semibold">{prod.name}</h1>
                <p className="text-sm ">{prod.description}</p>
                 <Divider />
                <span className="text-lg font-semibold text-green-700">
                  ${prod.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
