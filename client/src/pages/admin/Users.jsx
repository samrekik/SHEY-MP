import { Button, Table, App } from "antd";
import React, { useEffect, useState } from "react";

import Title from "antd/es/skeleton/Title";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";

import moment from "moment";
import { EditStatusProduct } from "../../apicalls/product";
import { EditStatusUser, getAllUser } from "../../apicalls/users";
export default function Users() {
  const [users, setUsers] = useState([]);
  const { message } = App.useApp();

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await getAllUser({});
   
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await EditStatusUser(id,status);
   
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    
    
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render:(text,record)=>{return record.role.toUpperCase()}
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render:(text,record)=>moment(record.createdAt).format("DD-MM-YYYY hh:mm A")
    },
   
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render:(text,record)=>{return record.status.toUpperCase()}
    },
    

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "active" && (
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
                onClick={() => onStatusUpdate(_id, "active")}
              >
                Unblock
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
      <Table columns={columns} dataSource={users} />
    </div>
  );
}
