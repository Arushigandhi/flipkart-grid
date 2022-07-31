import { Button, Card, Form, Input, Row, message } from "antd";
import Navbar from "components/Navbar";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { SignUp } from "services/auth.service";
import Styles from "styles/pages/Login.module.scss";

export default function register() {
  const router = useRouter();

  const regMutation = useMutation(SignUp, {
    onError: (e) => {
      message.error("Login failed!");
      message.error(e.message);
    },
    onSuccess: (data) => {
      message.success("Registered in successfully!");
      router.push("/login");
    },
  });

  const onRegSubmit = async (values) => {
    await regMutation.mutateAsync(values);
  };

  return (
    <div>
      <Navbar />
      <div className={Styles.background}>
        <Card hoverable={true} className={Styles.card}>
          <h1>Register to a world of secure shopping!</h1>
          <h2>
            Already have an account? <span>Login</span>
          </h2>
          <Form layout="vertical" onFinish={onRegSubmit}>
            <Row justify="space-between">
              <Form.Item name="firstName" style={{ width: "47%" }}>
                <Input placeholder="First Name" size="large" />
              </Form.Item>
              <Form.Item name="lastName" style={{ width: "47%" }}>
                <Input placeholder="Last Name" size="large" />
              </Form.Item>
            </Row>
            <Form.Item name="phoneNumber">
              <Input placeholder="Phone Number" size="large" />
            </Form.Item>
            <Form.Item name="email">
              <Input placeholder="Email Id" size="large" />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Button htmlType="submit" className={Styles.outlineButton}>
              Register
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}
