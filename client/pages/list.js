import { Col, Row, Image, Avatar, Tabs, Button } from "antd";
import Navbar from "components/Navbar";
import React from "react";
import Styles from "styles/pages/Home.module.scss";

const { TabPane } = Tabs;
export default function list() {
  return (
    <div className={Styles.containerList}>
      <Navbar />
      <div className={Styles.controller}>
        <Row justify="space-around">
          <Col
            span={12}
            className={Styles.col}
            style={{ borderRight: "2px solid #E3E1E3" }}
          >
            <Image
              src="https://via.placeholder.com/150"
              alt="warranty"
              col={600}
              height={600}
              style={{ borderRadius: "8px" }}
            />
          </Col>
          <Col span={12} className={Styles.col}>
            <h1>Product Name Goes Here</h1>
            <Row>
              <h2>
                For <span>$500</span>
              </h2>
              <h2>
                <span> &nbsp; - &nbsp;20 products</span> available{" "}
              </h2>
            </Row>
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
              </TabPane>
              <TabPane tab="Offer" key="2" className={Styles.tab}>
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="History" key="3" className={Styles.tab}>
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
            <Row>
              <Button className={Styles.button}>Buy Now</Button>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
