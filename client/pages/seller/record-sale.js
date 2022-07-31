import {
  Form,
  Upload,
  Input,
  Select,
  message,
  Button,
  InputNumber,
} from "antd";
import DashboardLayout from "components/SellerDashboardLayout";
import React, { useState } from "react";
import Styles from "styles/pages/Seller.module.scss";
import { AddSoldProduct, getAllProductNames } from "services/products.service";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";

const { Option } = Select;

export default function recordSale() {
  const { data: names, isLoading } = useQuery(
    "productNames",
    getAllProductNames
  );
  console.log(names?.data?.productNames);

  const submitMutation = useMutation(AddSoldProduct, {
    onError: (e) => {
      message.error("Creation failed!");
      message.error(e.message);
    },
    onSuccess: (data) => {
      message.success("Created successfully!");
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    await submitMutation.mutateAsync({
      ...values,
      sellerId: info.user.user._id,
    });
  };

  const info = useSelector((state) => state.user);

  return (
    <DashboardLayout title="Record a Sale">
      <div className={Styles.width} style={{ width: "60%", margin: "auto" }}>
        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            className={Styles.formItem}
            name="productName"
            label="Product Name"
          >
            <Select size="large" placeholder="Select a Product Name">
              {names?.data?.productNames?.map((name, index) => (
                <Option key={index} value={name.name}>
                  {name.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="productId"
            label="Product Id"
          >
            <Select size="large" placeholder="Select a Product Id">
              {names?.data?.productNames?.map((name, index) => (
                <Option key={index} value={name._id}>
                  {name._id}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="buyerEmail"
            label="Buyer Email Id"
          >
            <Input
              placeholder="Buyer Email Id"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="buyerName"
            label="Buyer Name"
          >
            <Input
              placeholder="Buyer Name"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Form.Item className={Styles.formItem} name="sno" label="Serial No">
            <Input
              placeholder="Serial No"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            className={Styles.formItem}
          >
            <Input
              placeholder="Phone Number"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Form.Item
            name="warrantyPeriod"
            label="Warranty Period"
            className={Styles.formItem}
          >
            <InputNumber
              placeholder="Warranty Period"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Button className={Styles.outlineButton} htmlType="submit">
            Add Item
          </Button>
        </Form>
      </div>
    </DashboardLayout>
  );
}
