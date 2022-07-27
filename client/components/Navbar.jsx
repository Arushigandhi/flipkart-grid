import { Button, Layout, Alert, Input } from "antd";
import React, { useEffect, useState } from "react";
import Styles from "styles/components/Navbar.module.scss";
// import ConstantStyles from "styles/Constant.module.scss";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// import ActiveLink from "components/common/ActiveLink";
// import { useSelector } from "react-redux";
// import PrimaryButton from "components/common/PrimaryButton";
// import { useRouter } from "next/router";

function Navbar({ notification }) {
  // const router = useRouter();
  // const { isLoggedIn } = useSelector((state) => state.user);
  const [navbar, setNavbar] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [screen, setScreen] = useState(false);
  const [visible, setVisible] = useState(
    // router.pathname === "/" ? true : false
    false
  );

  const handleClose = () => {
    setVisible(false);
  };
  const openSidebar = () => {
    setToggle(true);
  };

  const closeSidebar = () => {
    setToggle(false);
  };

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 80) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });

  useEffect(() => {
    const changeWidth = () => {
      if (window.innerWidth <= 1207) {
        setScreen(true);
      } else {
        setScreen(false);
      }
    };

    changeWidth();
    window.addEventListener("resize", changeWidth);
  });

  return (
    <>
      <Layout
        style={{
          height:
            navbar && !visible
              ? "68px"
              : navbar && visible
              ? "100px"
              : !navbar && visible
              ? "110px"
              : "80px",
        }}
        className={Styles.navbarContainer}
      >
        <div
          className={Styles.wrapper}
          style={{
            transform: navbar ? "scale(0.98)" : "scale(1)",
            height:
              navbar && !visible
                ? "68px"
                : navbar && visible
                ? "100px"
                : !navbar && visible
                ? "80px"
                : "110px",
          }}
        >
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <Image
                src={"/Flipkart-logo.png"}
                width={180}
                height={80}
                objectFit="contain"
                alt="bugbase-logo"
              />
            </Link>
          </div>
          {/* <Input.Search
            size="large"
            placeholder="Search for Products, Self help groups and more"
            className={Styles.search}
          /> */}
          <nav className={Styles.mainNav}>
            {/* <ActiveLink href="/companies" activeClassName={Styles.active}> */}
            <a className={`${Styles.navLink}`}>Become a seller</a>
            {/* </ActiveLink> */}

            {/* <ActiveLink href="/hackers" activeClassName={Styles.active}> */}
            <a className={Styles.navLink}>Cart</a>
            {/* </ActiveLink> */}

            {/* <ActiveLink href="/hacktivity" activeClassName={Styles.active}> */}
            <a className={Styles.navLink}>More</a>
            {/* </ActiveLink> */}

            <Link href="/login">
              <Button
                className={`${Styles.navButton}`}
                style={{
                  color: "#FFF",
                }}
              >
                Login
              </Button>
            </Link>
            {/* )} */}
          </nav>
          <div className={Styles.hamSec}>
            <MenuOutlined onClick={openSidebar} className={Styles.ham} />
          </div>
        </div>
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: toggle && screen ? "block" : "none",
              }}
              className={Styles.sidebarContainer}
            >
              <div className={Styles.closeSec}>
                <CloseOutlined
                  onClick={closeSidebar}
                  className={Styles.close}
                />
              </div>
              <div className={Styles.sidebarWrapper}>
                <nav className={Styles.mainNav}>
                  <a
                    onClick={closeSidebar}
                    href="/companies"
                    className={`${Styles.navLink} ${Styles.diff}`}
                  >
                    For Companies
                  </a>
                  <a
                    onClick={closeSidebar}
                    href="/hackers"
                    className={`${Styles.navLink} ${Styles.diff}`}
                  >
                    For Researchers
                  </a>
                  <a
                    onClick={closeSidebar}
                    href="/plans"
                    className={`${Styles.navLink} ${Styles.diff}`}
                  >
                    Plans
                  </a>

                  <a
                    onClick={closeSidebar}
                    href="/hacktivity"
                    className={`${Styles.navLink} ${Styles.diff}`}
                  >
                    Hacktivity
                  </a>
                  <a
                    onClick={closeSidebar}
                    href="https://docs.bugbase.in/"
                    className={`${Styles.navLink} ${Styles.diff}`}
                  >
                    Docs
                  </a>
                  <a
                    onClick={closeSidebar}
                    href="/blog"
                    className={`${Styles.navLink} ${Styles.diff}`}
                  >
                    Blog
                  </a>
                  <a
                    onClick={closeSidebar}
                    href="#communitySection"
                    className={`${Styles.navLink} ${Styles.diff}`}
                  >
                    Community
                  </a>
                  {/* <a
                    onClick={closeSidebar}
                    href="/events"
                    className={`${Styles.navLink} ${Styles.diff}`}
                  >
                    Events
                  </a> */}
                  {/* <a
                      onClick={closeSidebar}
                    href="/careers"
                    className={`${Styles.navLink} ${Styles.diff}`}
                  >
                    Careers
                  </a> */}
                  <Link href="/login">
                    <a
                      onClick={closeSidebar}
                      className={`${Styles.navLink} ${Styles.diff}`}
                    >
                      Login
                    </a>
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {visible && notification ? (
          <Alert
            banner
            showIcon={false}
            message={
              <Link passHref href={notification.link}>
                <a
                  style={{
                    color: "#FFF",
                  }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  {notification.message}
                </a>
              </Link>
            }
            type="success"
            closable={false}
            afterClose={handleClose}
          />
        ) : null}
      </Layout>
    </>
  );
}

export default Navbar;
