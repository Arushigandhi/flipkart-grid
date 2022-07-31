import {
  Form,
  Upload,
  Input,
  InputNumber,
  Tooltip,
  Select,
  message,
  Button,
  notification,
} from "antd";
import DashboardLayout from "components/SellerDashboardLayout";
import Navbar from "components/Navbar";
import React, { useState } from "react";
import Styles from "styles/pages/Seller.module.scss";
import { InboxOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import { create } from "ipfs-http-client";
import { AddProduct } from "services/products.service";

const { Dragger } = Upload;
const { Option } = Select;

const props = {
  name: "file",
  multiple: true,
  // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

  onChange(info) {
    const { status } = info.file;

    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },

  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function RegisterProduct() {
  const [loading, setLoading] = useState(false);
  return (
    <DashboardLayout title="Add a Product">
      <div className={Styles.width} style={{ width: "60%", margin: "auto" }}>
        <Form
          onFinish={async (values) => {
            console.log(values);
            const files = [];
            try {
              for (let file of values.files?.fileList || []) {
                try {
                  console.log(file);
                  const added = await client.add(file.originFileObj);
                  const url = `https://ipfs.infura.io/ipfs/${added.path}`;
                  files.push(url);
                } catch (error) {
                  console.log("File ain`t uploadin..", error);
                }
              }
              await AddProduct({ ...values, images: files, files: undefined });
              message.success("Product added successfully");
            } catch (err) {
              console.log("ERROR");
              console.log(err);
              notification.error("Unknown error!");
            }
          }}
          layout="vertical"
        >
          <Form.Item
            className={Styles.formItem}
            name="files"
            label="Upload File"
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="name"
            label="Product Name"
          >
            <Input
              placeholder="Product Name"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="description"
            label="Product Description"
          >
            <Input.TextArea
              placeholder="Product Description"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="quantity"
            label="Product Quantity"
          >
            <InputNumber
              placeholder="Product Quantity"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="sellPrice"
            label="Product Price"
          >
            {/* <Input placeholder="Product Price" size="large" /> */}
            {/* <Input.Group compact placeholder className={Styles.formInput}> */}
            {/* <Select
                defaultValue="INR"
                style={{ width: "20%" }}
                className={Styles.formInput}
              >
                <Option value="INR">INR</Option>
                <Option value="ETH">ETH</Option>
              </Select> */}
            <Input
              className={Styles.formInput}
              style={{ width: "80%" }}
              placeholder="Product Price"
              // options={[{ value: "text 1" }, { value: "text 2" }]}
            />
            {/* </Input.Group> */}
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="warrantyExtensionPrice"
            label={
              <label>
                Warranty Extension Price
                <Tooltip
                  title="This is the price the customers would have to pay for every six
                month time period they want an extension for."
                >
                  <InfoCircleOutlined style={{ margin: "0.5rem" }} />
                </Tooltip>
              </label>
            }
          >
            {/* <Input placeholder="Warranty Extension Price" size="large" /> */}
            {/* <Input.Group compact className={Styles.formInput}> */}
            {/* <Select
                defaultValue="INR"
                style={{ width: "20%" }}
                className={Styles.formInput}
              >
                <Option value="INR">INR</Option>
                <Option value="ETH">ETH</Option>
              </Select> */}
            <Input
              style={{ width: "80%" }}
              placeholder="Warranty Extension Price"
              // options={[{ value: "text 1" }, { value: "text 2" }]}
              className={Styles.formInput}
            />
            {/* </Input.Group> */}
          </Form.Item>
          <div className={Styles.loginBtn}>
            <Button className={Styles.outlineButton} htmlType="submit">
              Add Item
            </Button>
          </div>
        </Form>
      </div>
    </DashboardLayout>
  );
}
