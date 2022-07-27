import { Col, Row, Image } from "antd";
import Navbar from "components/Navbar";
import React from "react";
import Styles from "styles/pages/Home.module.scss";

export default function list() {
  return (
    <div className={Styles.container}>
      <Navbar />
      <div className={Styles.width}>
        <Row>
          <Col>
            <Image
              src="https://via.placeholder.com/150"
              alt="warranty"
              width={200}
              height={200}
            />
          </Col>
          <Col>
            <h1>Product Name</h1>
            <Row>
              <h2>$ 500</h2>
              <h2>20 products available </h2>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}
