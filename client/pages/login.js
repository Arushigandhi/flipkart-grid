import { Button, Card, Form, Input, message } from "antd";
import Navbar from "components/Navbar";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { SignIn } from "services/auth.service";
import Styles from "styles/pages/Login.module.scss";

export default function Login() {
  const router = useRouter();

  const loginMutation = useMutation(SignIn, {
    onError: (e) => {
      message.error("Login failed!");
      message.error(e.message);
    },
    onSuccess: (data) => {
      message.success(data.message);
      router.push("/seller/dashboard");
    },
  });

  const onLoginSubmit = async (values) => {
    await loginMutation.mutateAsync(values);
  };
  return (
    <div>
      <Navbar />
      <div className={Styles.background}>
        <Card hoverable={true} className={Styles.card}>
          <div className={Styles.loginCardBtn}>Welcome Back!</div>
          <div className={Styles.loginSubtitle}>
            Enter your details below to continue
          </div>
          <Form layout="vertical" onFinish={onLoginSubmit}>
            <Form.Item name="email">
              <Input placeholder="Email Id" size="large" />
            </Form.Item>
            <Form.Item name="password">
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <div className={Styles.loginBtn}>
              <Button className={Styles.outlineButton} htmlType="submit">
                Login
              </Button>
            </div>
            <p>
              Don't have an account?{" "}
              <span>
                <a href="/register">Regsiter Now</a>
              </span>
            </p>
          </Form>
        </Card>
      </div>
    </div>
  );
}
