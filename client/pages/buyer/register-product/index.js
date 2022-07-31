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
  Descriptions,
  Empty,
} from "antd";
import DashboardLayout from "components/DashboardLayout";
import Navbar from "components/Navbar";
import React, { useState } from "react";
import Styles from "styles/pages/Seller.module.scss";
import { InboxOutlined } from "@ant-design/icons";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { BsArrowBarLeft, BsArrowLeft } from "react-icons/bs";
import { useMutation } from "react-query";
import { checkIfProductIsSold } from "services/products.service";
import Web3Modal from "web3modal";
import web3 from "web3";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { nftMarketAddress, nftAddress } from "../../../.config";
import Market from "../../../artifacts/contracts/NFTWarranty.sol/NFTWarranty.json";
import NFT from "../../../artifacts/contracts/NFT.sol/NFT.json";
import { useSelector } from "react-redux";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const { Dragger } = Upload;
const { Option } = Select;
const { Step } = Steps;

export default function RegisterProduct() {
  const router = useRouter();
  const [current, setcurrent] = React.useState(0);
  const [status, setStatus] = React.useState("process");
  const [details, setDetails] = React.useState({});

  const [fileUrl, setFileUrl] = useState(null);

  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });

  const next = () => {
    setcurrent(current + 1);
  };

  const prev = () => {
    setcurrent(current - 1);
    setStatus("process");
  };

  const checkProductMutation = useMutation(checkIfProductIsSold, {
    onSuccess: (d) => {
      next();
      console.log(d.data);
      setDetails(d.data.result);
    },
    onError: () => {
      setStatus("error");
      next();
    },
  });

  const onFinish = async (values) => {
    await checkProductMutation.mutateAsync(values);
  };

  const steps = [
    {
      name: "something",
      component: (
        <>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              className={Styles.formItem}
              name="serialNo"
              label="Product Serial Number"
              rules={[
                {
                  required: true,
                  message: "Product Serial Number is required",
                },
              ]}
            >
              <Input
                placeholder="Serial Number"
                size="large"
                className={Styles.formInput}
              />
            </Form.Item>
            <Form.Item
              className={Styles.formItem}
              name="buyerName"
              label="Your Name"
              rules={[
                {
                  required: true,
                  message: "Your Name is required",
                },
              ]}
            >
              <Input
                placeholder="Name"
                size="large"
                className={Styles.formInput}
              />
            </Form.Item>
            <Form.Item
              className={Styles.formItem}
              name="buyerEmail"
              label="Your Email Address"
              required
              rules={[
                {
                  required: true,

                  message: "Your Email is required",
                },
              ]}
            >
              <Input
                placeholder="Email ID"
                size="large"
                className={Styles.formInput}
              />
            </Form.Item>
            <div className={Styles.loginBtn}>
              <Button
                htmlType="submit"
                className={Styles.outlineButton}
                // onClick={() => next()}
              >
                Next
              </Button>
            </div>
          </Form>
        </>
      ),
    },
    {
      name: "something 2",
      component: (
        <>
          {status !== "error" ? (
            <>
              <Descriptions
                title="Confirm Product Details"
                layout="vertical"
                style={{ marginTop: "2rem", marginBottom: "2rem" }}
              >
                <Descriptions.Item
                  label="Product Name"
                  labelStyle={{
                    color: "#047bd5",
                    fontWeight: "500",
                  }}
                >
                  {details?.product?.name}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Price"
                  labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                >
                  {details?.product?.sellPrice}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Serial No"
                  labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                >
                  {details?.soldProduct?.sno}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Seller Name"
                  labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                >
                  {details?.seller?.firstName} {details?.seller?.lastName}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Seller Email"
                  labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                >
                  {details?.seller?.email}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Your Email"
                  labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                >
                  {details?.soldProduct?.buyerEmail}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Your Phone Number"
                  labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                >
                  {details?.soldProduct?.phoneNumber}
                </Descriptions.Item>
              </Descriptions>
              <div className={Styles.loginBtn}>
                <Button className={Styles.outlineButton} onClick={() => prev()}>
                  <BsArrowLeft />
                  &nbsp; Back
                </Button>
                <Button className={Styles.outlineButton} onClick={() => next()}>
                  Next
                </Button>
              </div>
            </>
          ) : (
            <>
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 200,
                  marginTop: "2rem",
                  marginBottom: "2rem",
                }}
                description={
                  <span style={{ fontSize: "1.4rem" }}>
                    Oops! Looks like something went wrong. Please re-check the
                    details entered and try again.
                  </span>
                }
              ></Empty>
              <div className={Styles.loginBtn}>
                <Button className={Styles.outlineButton} onClick={() => prev()}>
                  <BsArrowLeft />
                  &nbsp; Back
                </Button>
              </div>
            </>
          )}
        </>
      ),
    },
    {
      name: "something 2",
      component: (
        <>
          <div className={Styles.loginBtn}>
            <Button className={Styles.outlineButton} onClick={() => prev()}>
              <BsArrowLeft />
              &nbsp; Back
            </Button>
          </div>
        </>
      ),
    },
  ];

  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <DashboardLayout title="Register my Product">
      <div className={Styles.width} style={{ width: "80%", margin: "auto" }}>
        <Steps progressDot current={current} status={status}>
          <Step title="Basic Info" />
          <Step title="Confirm Product Details" />
          <Step title="Get your NFT" />
        </Steps>
        {steps[current].component}
      </div>
    </DashboardLayout>
  );
}
