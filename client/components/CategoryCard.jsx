import { Avatar, Badge, Card, Col, Image, Row } from "antd";
import React from "react";
import Styles from "styles/components/CategoryCard.module.scss";
import { FaRegHeart } from "react-icons/fa";

export default function CategoryCard() {
  return (
    // <Badge count={5} size="default" color="#047BD5">
    <Card className={Styles.card}>
      <Col className={Styles.details}>
        <Image src="https://via.placeholder.com/150" width={"16.8rem"} />

        <h3>Category Name</h3>
        <Row justify="space-between" className={Styles.footer}>
          $ 500
          <FaRegHeart style={{ fontSize: "1.2rem" }} />
        </Row>
      </Col>
    </Card>
    // </Badge>
  );
}
