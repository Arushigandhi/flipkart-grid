import { Button, Card, Form, Input } from "antd";
import Navbar from "components/Navbar";
import React from "react";
import Styles from "styles/pages/Login.module.scss";

export default function register() {
  return (
    <div>
      <Navbar />
      <div className={Styles.background}>
        <Card hoverable={true} className={Styles.card}>
          <h1>Register to a world of secure shopping!</h1>
          <h2>
            Already have an account? <span>Login</span>
          </h2>
          <Form layout="vertical">
            <Form.Item name="name">
              <Input placeholder="Full Name" size="large" />
            </Form.Item>
            <Form.Item name="email">
              <Input placeholder="Email Id" size="large" />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Button className={Styles.outlineButton}>Login</Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
