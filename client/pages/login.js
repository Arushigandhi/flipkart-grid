import { Button, Card, Form, Input } from "antd";
import Navbar from "components/Navbar";
import React from "react";
import Styles from "styles/pages/Login.module.scss";

export default function Login() {
  return (
    <div>
      <Navbar />
      <div className={Styles.background}>
        <Card hoverable={true} className={Styles.card}>
          <div className={Styles.loginCardBtn}>Welcome Back!</div>
          <div className={Styles.loginSubtitle}>
            Enter your details below to continue
          </div>
          <Form layout="vertical">
            <Form.Item name="email">
              <Input placeholder="Email Id" size="large" />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <div className={Styles.loginBtn}>
              <Button className={Styles.outlineButton}>Login</Button>
            </div>
            <p>
              Don't have an account? <span>Sign up Now</span>
            </p>
          </Form>
        </Card>
      </div>
    </div>
  );
}
