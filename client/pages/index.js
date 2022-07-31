import { Avatar, Col, Row, Image, Button } from "antd";
import CategoryCard from "components/CategoryCard";
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
          <Row>
            <Button className={Styles.outlineButton}>Get Started</Button>
            <Button className={Styles.outlineButtonFilled}>
              Know our Journey
            </Button>
          </Row>
        </div>
        {/* <h1 className={Styles.heading}>Trending Brands</h1>
        <Row className={Styles.trending}>
          <Avatar
            size={100}
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{
                  width: 100,
                }}
              />
            }
          />
          <Avatar
            size={100}
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{
                  width: 100,
                }}
              />
            }
          />
          <Avatar
            size={100}
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{
                  width: 100,
                }}
              />
            }
          />
          <Avatar
            size={100}
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{
                  width: 100,
                }}
              />
            }
          />
          <Avatar
            size={100}
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{
                  width: 100,
                }}
              />
            }
          />
          <Avatar
            size={100}
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{
                  width: 100,
                }}
              />
            }
          />
        </Row> */}
        {/* <Row className={Styles.categories}>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </Row> */}
      </div>
    </div>
  );
}
