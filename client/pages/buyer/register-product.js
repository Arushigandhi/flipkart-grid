import {
  Form,
  Upload,
  Input,
  InputNumber,
  Tooltip,
  Select,
  message,
  Button,
} from "antd";
import DashboardLayout from "components/DashboardLayout";
import Navbar from "components/Navbar";
import React from "react";
import Styles from "styles/pages/Seller.module.scss";
import { InboxOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { Option } = Select;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

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

export default function RegisterProduct() {
  return (
    <DashboardLayout title="Register my Product">
      <div className={Styles.width} style={{ width: "60%", margin: "auto" }}>
        <Form layout="vertical">
          <Form.Item
            className={Styles.formItem}
            name="productName"
            label="Product Serial Number"
          >
            <Input
              placeholder="Serial Number"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="customerName"
            label="Your Name"
          >
            <Input
              placeholder="Name"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
          <Form.Item
            className={Styles.formItem}
            name="customerEmail"
            label="Your Email Address"
          >
            <Input
              placeholder="Email ID"
              size="large"
              className={Styles.formInput}
            />
          </Form.Item>
        </Form>
        <div className={Styles.loginBtn}>
          <Button className={Styles.outlineButton}>Next</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
