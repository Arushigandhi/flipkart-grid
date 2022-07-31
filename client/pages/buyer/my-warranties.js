import DashboardLayout from "components/DashboardLayout";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import Styles from "styles/pages/Buyer.module.scss";
import {
  Col,
  Row,
  Image,
  Tabs,
  Button,
  Result,
  Descriptions,
  message,
  Timeline,
  Form,
  Input,
  InputNumber,
} from "antd";
import { FiShare2 } from "react-icons/fi";
import Market from "../../artifacts/contracts/NFTWarranty.sol/NFTWarranty.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import moment from "moment";
import { useRouter } from "next/router";

import { nftMarketAddress, nftAddress } from "../../.config";
import { useSelector } from "react-redux";
import SimpleForm from "components/ChatBot";
import { BsArrowLeft } from "react-icons/bs";

const { TabPane } = Tabs;

export default function Dashboard() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [current, setCurrent] = useState(0);
  const [nftData, setNftData] = useState({});

  const [requestedVerification, setRequestedVerification] = useState(false);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    setLoadingState("loading");
    // connect to metamask wallet

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const nftWarranty = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      signer
    );
    console.log(nftWarranty);

    // Call the fetchMyWarrantyItems function from the nftMarket instance
    const nfts = await nftWarranty.fetchMyWarrantyItems();

    const items = await Promise.all(
      nfts.map(async (i) => {
        const tokenUri = await nftWarranty.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let item = {
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          startDate: i.startDate.toNumber(),
          productData: meta.data,
          active: i.active,
          period: i.period,
          sno: i.sno,
          incrementPrice: i.incrementPrice,
          ownerHistory: i.ownerHistory,
        };
        return item;
      })
    );
    // find time left for nft.startDate + period

    // console.log(timeLeft);

    console.log(items);
    setNfts(items);
    setLoadingState("loaded");
  };

  const verifyOwnership = async (tokenId) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const nftWarranty = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      signer
    );
    console.log(nftWarranty);

    // Call the verifyOwnership function from the nftMarket instance
    const nft = await nftWarranty.verifyNFTOwnership(tokenId);
    console.log(nft);
    if (nft == true) {
      setRequestedVerification(true);
    } else {
      message.error("You are not the owner of this product");
    }
  };

  const transferWarrantyItem = async (toAddress) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const nftWarranty = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      signer
    );

    console.log(nftWarranty);

    // Call the transferWarrantyItem function from the nftMarket instance
    const nft = await nftWarranty.transferWarrantyItem(
      nftData.tokenId,
      toAddress
    );
    console.log(nft);
    message.success("Successfully transferred warranty item");
    setNfts([]);
    loadNFTs();
    setCurrent(0);
  };

  const extendWarrantyItem = async (addPeriod) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const nftWarranty = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      signer
    );

    console.log(nftWarranty);

    const price = (nftData.incrementPrice * addPeriod) / 6;
    console.log(price);
    const finalPrice = ethers.utils.parseUnits(price.toString());

    // Call the transferWarrantyItem function from the nftMarket instance
    const nft = await nftWarranty.increasePeriod(nftData.tokenId, addPeriod, {
      value: finalPrice,
    });
    console.log(nft);
    message.success("Successfully Extended Warranty");
    setCurrent(0);
    loadNFTs();
  };

  const steps = [
    {
      title: "Warranty",
      component: (
        <>
          <div className={Styles.dashboard}>
            {nfts.map((nft) => {
              return (
                <div className={Styles.productCard}>
                  <div className={Styles.productCardImage}>
                    <div className={Styles.productCardImageOverlay}>
                      {renderTime(nft)} days left
                    </div>
                    <div className={Styles.productCardService}>
                      <FiShare2 />
                    </div>

                    <Image
                      src={nft?.productData?.productImage}
                      height={200}
                      width={200}
                    ></Image>
                  </div>
                  <div className={Styles.productCardName}>Sl No. {nft.sno}</div>
                  <div className={Styles.productCardTitle}>
                    {nft?.productData?.productName}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className={Styles.productCardName}>Extension Cost</div>
                    <div className={Styles.productCardName}>
                      {nft.productData.extensionPrice} Eth
                    </div>
                  </div>
                  <Button
                    className={Styles.productCardImageOverlay2}
                    onClick={() => {
                      setNftData(nft);
                      setCurrent(1);
                    }}
                  >
                    More Details
                  </Button>
                </div>
              );
            })}
          </div>
        </>
      ),
    },
    {
      title: "Warranty Details",
      component: (
        <>
          <div className={Styles.controller}>
            <Col
              span={3}
              style={{ fontSize: "2rem", color: "#047bd5", cursor: "pointer" }}
            >
              <div
                onClick={() => {
                  setNftData({});
                  setCurrent(0);
                }}
              >
                <BsArrowLeft />
              </div>
            </Col>
            <Row justify="space-around">
              <Col
                span={10}
                className={Styles.col}
                style={{ borderRight: "2px solid #E3E1E3" }}
              >
                <Image
                  src={nftData?.productData?.productImage}
                  alt="warranty"
                  col={400}
                  height={400}
                  style={{ borderRadius: "8px" }}
                />
              </Col>
              <Col span={12} className={Styles.col}>
                <h1>{nftData?.productData?.productName}</h1>
                <Col className={Styles.sellerDeets}>
                  <Row>
                    <h3>Sold by</h3>
                  </Row>
                  <Row align="middle">
                    <h4>{nftData?.productData?.sellerName}</h4>
                  </Row>
                </Col>
                <Tabs defaultActiveKey="1" className={Styles.tabs}>
                  <TabPane tab="Details" key="1" className={Styles.tab}>
                    {!requestedVerification ? (
                      <>
                        <Button
                          className={Styles.outlineButton}
                          onClick={() => verifyOwnership(nftData.tokenId)}
                        >
                          Verify Ownership
                        </Button>
                        <Descriptions
                          title="Product Details"
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
                            {nftData?.productData?.productName}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Price"
                            labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                          >
                            {nftData?.productData?.price}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Serial No"
                            labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                          >
                            {nftData?.sno}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Token Id"
                            labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                          >
                            {nftData?.tokenId}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Seller Email"
                            labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                          >
                            {nftData?.productData?.sellerEmail}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Warranty Period"
                            labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                          >
                            {nftData?.period?.toNumber()} months
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Valid through"
                            labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                          >
                            {moment(nftData.startDate * 1000)
                              .add(nftData.period, "months")
                              .format("DD-MM-YYYY")}
                          </Descriptions.Item>
                          <Descriptions.Item
                            label="Extension Cost (for 6 months)"
                            labelStyle={{ color: "#047bd5", fontWeight: "500" }}
                          >
                            {nftData?.productData?.extensionPrice} Eth
                          </Descriptions.Item>
                        </Descriptions>
                      </>
                    ) : (
                      <Result
                        status="success"
                        title="Successfully Verified your Product!"
                        subTitle={`Serial number: ${nftData?.sno}`}
                        extra={[
                          <Button
                            type="primary"
                            key="console"
                            onClick={() => setRequestedVerification(false)}
                          >
                            Back to Product Details
                          </Button>,
                        ]}
                      />
                    )}
                  </TabPane>
                  <TabPane
                    tab="Ownership History"
                    key="2"
                    className={Styles.tab}
                    style={{
                      marginTop: "2rem",
                    }}
                  >
                    <Timeline>
                      <Timeline.Item>
                        Create a services site 2015-09-01
                      </Timeline.Item>
                      <Timeline.Item>
                        Solve initial network problems 2015-09-01
                      </Timeline.Item>
                      <Timeline.Item>
                        Technical testing 2015-09-01
                      </Timeline.Item>
                      <Timeline.Item>
                        Network problems being solved 2015-09-01
                      </Timeline.Item>
                    </Timeline>
                  </TabPane>
                  <TabPane tab="Transfer" key="3" className={Styles.tab}>
                    <Form
                      layout="vertical"
                      onFinish={(values) =>
                        transferWarrantyItem(values.toAddress)
                      }
                    >
                      <Form.Item
                        className={Styles.formItem}
                        name="toAddress"
                        label="Buyer's Wallet Address"
                      >
                        <Input
                          placeholder="Wallet Address (Include 0x)"
                          size="large"
                          className={Styles.formInput}
                        />
                      </Form.Item>
                      <div className={Styles.loginBtn}>
                        <Button
                          className={Styles.outlineButton}
                          htmlType="submit"
                        >
                          Transfer Item
                        </Button>
                      </div>
                    </Form>
                  </TabPane>
                  <TabPane tab="Extend Warranty" key="4" className={Styles.tab}>
                    <b> Note:</b> You will be charged the extension cost of{" "}
                    {nftData?.productData?.extensionPrice} Eth per 6 months
                    accordingly.
                    <br></br>
                    <Form
                      layout="vertical"
                      onFinish={(values) =>
                        extendWarrantyItem(values.addPeriod)
                      }
                      style={{ marginTop: "2rem" }}
                    >
                      <Form.Item
                        className={Styles.formItem}
                        name="addPeriod"
                        label="Additional Period (in Months)"
                      >
                        <InputNumber
                          placeholder="Additional Period (in Months)"
                          size="large"
                          className={Styles.formInput}
                        />
                      </Form.Item>
                      <div className={Styles.loginBtn}>
                        <Button
                          className={Styles.outlineButton}
                          htmlType="submit"
                        >
                          Extend
                        </Button>
                      </div>
                    </Form>
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </div>
        </>
      ),
    },
    {
      title: "Success",
      component: (
        <>
          <Result
            status="success"
            title="Successfully Minted your NFT!"
            subTitle="Go to My Warranties page to see your warranty information"
            extra={[
              <Button type="primary" key="console">
                My Warranties
              </Button>,
            ]}
          />
        </>
      ),
    },
  ];

  const { isLoggedIn } = useSelector((state) => state.user);

  function renderTime(item) {
    console.log(moment(item.startDate * 1000).format("YYYY-MM-DD"));

    // add period to nft[0].startDate
    const period = moment(item.startDate * 1000).add(item.period, "months");

    // find time left for period
    const timeLeft = moment(period).diff(moment(), "days");

    return timeLeft;
  }

  console.log(nfts);

  if (loadingState === "loaded" && !nfts.length)
    return (
      <DashboardLayout title="My Warranties">
        <Result
          status="404"
          title="No Warranties Found"
          subTitle="Sorry, there are no warranties to display here."
          extra={<Button type="primary">Register a Product</Button>}
        />
      </DashboardLayout>
    );

  return (
    <DashboardLayout title="My Warranties">
      <SimpleForm />
      {steps[current].component}
    </DashboardLayout>
  );
}
