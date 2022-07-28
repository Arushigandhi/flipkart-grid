import { Badge, Col, Row, Segmented } from "antd";
import Styles from "styles/components/DashboardHeader.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MdOutlineNotifications } from "react-icons/md";
import { NotificationOutlined } from "@ant-design/icons";

const DashboardHeader = ({ title }) => {
  const [value, setValue] = useState("Buyer");
  const router = useRouter();

  const pathname = router.asPath;
  const asPathWithoutParam = pathname.split("/")[1];
  // capitalise first letter of asPathWithoutParam
  const asPathWithoutParamCapitalised =
    asPathWithoutParam.charAt(0).toUpperCase() + asPathWithoutParam.slice(1);

  useEffect(() => {
    setValue(asPathWithoutParamCapitalised);
  });

  // change url based on value
  const onChange = (e) => {
    if (e == "Buyer") router.push("/buyer/dashboard");
    else if (e == "Seller") router.push("/seller/dashboard");
  };
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
      <Col className={Styles.DashboardHeaderRight}>
        <Segmented
          options={["Buyer", "Seller"]}
          value={value}
          onChange={onChange}
          size="large"
        />
        <Badge dot count={2}>
          <NotificationOutlined
            style={{
              fontSize: 16,
              cursor: "pointer",
              marginLeft: "1rem",
            }}
          />
        </Badge>
      </Col>
    </Row>
  );
};

export default DashboardHeader;
