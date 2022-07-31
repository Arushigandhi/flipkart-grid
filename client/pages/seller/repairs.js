import { Table } from "antd";
import DashboardLayout from "components/DashboardLayout";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { GetSellerRequests } from "services/products.service";

export default function repairs() {
  const info = useSelector((state) => state.user);

  const { data: reqs, isLoading } = useQuery("sellerRequests", () =>
    GetSellerRequests({
      sellerId: info.user.user._id,
    })
  );
  console.log(reqs);

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
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: "Buyer Email",
      dataIndex: "buyerEmail",
      key: "buyerEmail",
    },
  ];

  return (
    <DashboardLayout title="My Requests">
      <Table dataSource={reqs?.data?.requests} columns={columns} />
    </DashboardLayout>
  );
}
