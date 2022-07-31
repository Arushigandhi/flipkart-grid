import { Col, Row } from "antd";
import React from "react";
import Styles from "styles/components/Sidebar.module.scss";
import { AiOutlineHome, AiOutlineCar } from "react-icons/ai";
import {
  BsClockHistory,
  BsFillPlayCircleFill,
  BsInfoCircleFill,
  BsPeople,
} from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineCreate } from "react-icons/md";
import { FiTool } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const sidebarData = [
    {
      name: "My Products",
      icon: <AiOutlineHome className={Styles.navIcon} />,
      path: "/seller/dashboard",
    },
    {
      name: "Warranties",
      icon: <IoWalletOutline className={Styles.navIcon} />,
      path: "/seller/my-warranties",
    },
    {
      name: "Add Product",
      icon: <MdOutlineCreate className={Styles.navIcon} />,
      path: "/seller/register-product",
    },
    {
      name: "Repairs",
      icon: <FiTool className={Styles.navIcon} />,
      path: "/develop",
    },
    {
      name: "Record Sale",
      icon: <BsClockHistory className={Styles.navIcon} />,
      path: "/seller/record-sale",
    },
  ];

  return (
    <>
      <Col
        align="middle"
        justify="space-between"
        className={Styles.sidebarContainer}
      >
        <Link href="/">
          <div className={Styles.sidebarHeading}>A.</div>
        </Link>
        <nav className={Styles.sidebarItems}>
          {sidebarData.map((item, index) => (
            <Link href={item.path} key={index}>
              <Row
                className={
                  router.pathname === item.path
                    ? Styles.activenavItem
                    : Styles.navItem
                }
              >
                <Col>{item.icon}</Col>
                <Col className={Styles.navItemName}>{item.name}</Col>
              </Row>
            </Link>
          ))}
        </nav>
        <div className={Styles.navHelp}>
          <div className={Styles.infoIcon}>
            <BsInfoCircleFill className={Styles.navIcon} />
          </div>
          <h1>Need Guidance?</h1>
          <p>See the video, it can help you to understand the application.</p>
          <div className={Styles.videoButton}>
            Play Video
            <BsFillPlayCircleFill className={Styles.navIcon} />
          </div>
        </div>
      </Col>
    </>
  );
};

export default Sidebar;
