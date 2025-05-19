import {
  App,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Tabs,
} from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { AddProduct, EditProduct } from "../../apicalls/product";
const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
    default: false,
  },

  {
    label: "Warranty Available",
    name: "warrantyAvailable",
    default: false,
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
    default: false,
  },
  {
    label: "Box Available",
    name: "boxAvailable",
    default: false,
  },
];
export default function ProductForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const {message} = App.useApp();
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, values);
      } else {
        values.seller = user._id;
        values.status = "pending";
        response = await AddProduct(values);
      }
      dispatch(SetLoader(false));
      if (response?.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      console.error("Error caught:", error);
      message.error(error.message);
    }
  };
  const initialValues = Object.fromEntries(
    additionalThings.map((item) => [item.name, item.default])
  );
  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);
  return (
    <div>
      <Modal
        title=""
        open={showProductForm}
        onCancel={() => setShowProductForm(false)}
        centered
        okText="Save"
        width={1000}
        onOk={() => {
          formRef.current.submit();
        }}
      >
        <div>
          <h1 className="text-2xl font-bold text-center uppercase">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </h1>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="General" key="1">
              <Form
                layout="vertical"
                ref={formRef}
                onFinish={onFinish}
                initialValues={initialValues}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      label="Price"
                      name="price"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Category"
                      name="category"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="electronics">
                          Electronics
                        </Select.Option>
                        <Select.Option value="fashion">Fashion</Select.Option>
                        <Select.Option value="home">Home</Select.Option>
                        <Select.Option value="sports">Sports</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Age"
                      name="age"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </Col>
                </Row>
                <div className="flex gap-10">
                  {additionalThings.map((item) => {
                    return (
                      <Form.Item
                        key={item.name}
                        name={item.name}
                        valuePropName="checked"
                      >
                        <Checkbox defaultChecked={item.default}>
                          {item.label}
                        </Checkbox>
                      </Form.Item>
                    );
                  })}
                </div>
              </Form>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Image" key="2">
              <h1>Image</h1>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </div>
  );
}
