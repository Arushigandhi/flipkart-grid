import {
  Form,
  Upload,
  Input,
  InputNumber,
  Tooltip,
  Select,
  message,
  Button,
  Steps,
} from "antd";
import DashboardLayout from "components/DashboardLayout";
import Navbar from "components/Navbar";
import React from "react";
import Styles from "styles/pages/Seller.module.scss";
import { InboxOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { Option } = Select;
const { Step } = Steps;

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

const { isLoggedIn } = useSelector((state) => state.user);

export default function RegisterProduct({ sno }) {
  return (
    <DashboardLayout title="Register my Product">
      <div className={Styles.width} style={{ width: "60%", margin: "auto" }}>
        <Steps progressDot current={1}>
          <Step title="Basic Info" />
          <Step title="Confirm Product Details" />
          <Step title="Get your NFT" />
        </Steps>

        <div className={Styles.loginBtn}>
          <Button className={Styles.outlineButton}>Next</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

RegisterProduct.getInitialProps = async ({ query: { sno } }) => {
  return { sno };
};
