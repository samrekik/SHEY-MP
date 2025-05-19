import { Button, Table, App } from "antd";
import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import Title from "antd/es/skeleton/Title";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { getAllProduct, DeleteProduct } from "../../apicalls/product";
import moment from "moment";
export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const { message } = App.useApp();
  const [showProductForm, setShowProductForm] = useState(false);
  const dispatch = useDispatch();
  const deleteProduct = async (id) => {
    try {
      dispatch(SetLoader(true));

      const response = await DeleteProduct(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getAllProduct();
      console.log(response.products);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.prod);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A "),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i
              className="ri-delete-bin-line"
              onClick={() => {
                deleteProduct(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
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
      <div className="flex justify-end m-5">
        <Button
          type="default"
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
    </div>
  );
}
