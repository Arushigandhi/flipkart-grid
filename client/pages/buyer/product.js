import DashboardLayout from "components/DashboardLayout";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import Styles from "styles/pages/Home.module.scss";
import { Col, Row, Image, Avatar, Tabs, Button, Result } from "antd";
import { FiShare2 } from "react-icons/fi";
import Market from "../../artifacts/contracts/NFTWarranty.sol/NFTWarranty.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";

import { nftMarketAddress, nftAddress } from "../../.config";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

export default function Dashboard() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

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

    console.log(nfts);
  };

  const { isLoggedIn } = useSelector((state) => state.user);

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <span>
            Customize <a href="#API">Description</a>
          </span>
        }
      >
        <Button type="primary">Create Now</Button>
      </Empty>
    );
  }

  console.log(nfts);

  return (
    <DashboardLayout title="My Warranties">
      <div className={Styles.controller}>
        <Row justify="space-around">
          <Col
            span={10}
            className={Styles.col}
            style={{ borderRight: "2px solid #E3E1E3" }}
          >
            <Image
              src="https://via.placeholder.com/150"
              alt="warranty"
              col={400}
              height={400}
              style={{ borderRadius: "8px" }}
            />
          </Col>
          <Col span={12} className={Styles.col}>
            <h1>Product Name Goes Here</h1>
            <Col className={Styles.sellerDeets}>
              <Row>
                <h3>Sold by</h3>
              </Row>
              <Row align="middle">
                <Avatar size={64} icon="user" style={{ marginRight: "1rem" }} />
                <h4>Mia Ayana</h4>
              </Row>
            </Col>
            <Tabs defaultActiveKey="1" className={Styles.tabs}>
              <TabPane tab="Details" key="1" className={Styles.tab}>
                Content of Tab Pane 1
                <Result
                  status="success"
                  title="Successfully Verified your Product!"
                  subTitle="Serial number: 12456"
                  extra={[
                    <Button type="primary" key="console">
                      Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                  ]}
                />
              </TabPane>
              <TabPane tab="Owners" key="2" className={Styles.tab}>
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="History" key="3" className={Styles.tab}>
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
}
