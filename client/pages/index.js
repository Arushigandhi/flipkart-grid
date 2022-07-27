import { Col, Row } from "antd";
import CategoryCard from "components/CategoryCard";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Styles from "styles/pages/Home.module.scss";

export default function Home() {
  return (
    <div className={Styles.container}>
      <Navbar />
      <div className={Styles.width}>
        <div className={Styles.hero}>
          <h1 className="rainbow-text">Transforming Warranties</h1>
          <p>The power of NFTs at your fingertips</p>
        </div>
        <h1 className={Styles.heading}>Products you'll love</h1>
        <Row className={Styles.categories}>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </Row>
      </div>
    </div>
  );
}
