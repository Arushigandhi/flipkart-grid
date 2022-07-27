import { Col, Row } from "antd";
import Styles from "styles/components/DashboardHeader.module.scss";

const DashboardHeader = ({ title }) => {
  return (
    <Row
      justify="space-between"
      align="middle"
      className={Styles.DashboardHeaderContainer}
    >
      <Col className={Styles.DashboardHeaderLeft}>
        <Row align="middle">
          <Col>
            <div className={Styles.DashboardHeaderTitle}>{title}</div>
          </Col>
        </Row>
      </Col>
      <Col className={Styles.DashboardHeaderRight}></Col>
    </Row>
  );
};

export default DashboardHeader;
