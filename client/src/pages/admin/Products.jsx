import { Button, Table, App } from "antd";
import React, { useEffect, useState } from "react";

import Title from "antd/es/skeleton/Title";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

import moment from "moment";
import { EditStatusProduct, getAllProduct } from "../../apicalls/product";
export default function Products() {
  const [products, setProducts] = useState([]);
  const { message } = App.useApp();

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getAllProduct({});
      console.log(response.products);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await EditStatusProduct(id,status);
   
      dispatch(SetLoader(false));
  
      if (response.success) {
        message.success(response.message)
        getData()
      }else{
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Seller",
      dataIndex: "name",
      key: "seller",
      render: (text, record) => {
        return record.seller.name;
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render:(text,record)=>{return record.status.toUpperCase()}
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A "),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                Approve
              </span>
            )}
            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "rejected")}
              >
                Rejected
              </span>
            )}

            {status === "approved" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "blocked")}
              >
                Block
              </span>
            )}

            {status === "blocked" && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, "approved")}
              >
                UnBlock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={products} />
    </div>
  );
}
