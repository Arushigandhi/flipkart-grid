import { Table } from "antd";
import SimpleForm from "components/ChatBot";
import DashboardLayout from "components/DashboardLayout";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { GetMyRequests } from "services/products.service";

export default function repairs() {
  const info = useSelector((state) => state.user);

  const { data: reqs, isLoading } = useQuery("myRequests", () =>
    GetMyRequests({
      buyerId: info.user.user._id,
    })
  );
  console.log(reqs, "buyer");

  const columns = [
    {
      title: "Service Requested",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Serial Number",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <DashboardLayout title="My Requests">
      <Table dataSource={reqs?.data?.requests} columns={columns} />
      <SimpleForm />
    </DashboardLayout>
  );
}
