import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { getAllProduct } from "../apicalls/product";
import { App, Divider } from "antd";

export default function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { message } = App.useApp();
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
      <div className="grid grid-cols-4 gap-5">
        {products?.map((prod) => {
          return (
            <div className="border border-gray-300 rounded border-solid flex flex-col">
              <img
                src={prod.images[0]}
                className="w-full h-40 object-cover"
                alt=""
              />
              <Divider />
              <div className="p-5 flex flex-col gap-2">
                <h1 className="text-lg font-semibold">{prod.name}</h1>
                <p className="text-sm ">{prod.description}</p>
                <span className="text-lg font-semibold text-green-500">
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
