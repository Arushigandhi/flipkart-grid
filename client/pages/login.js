import { Button, Card, Form, Input, message } from "antd";
import Navbar from "components/Navbar";
import { useRouter } from "next/router";
import React from "react";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { SignIn } from "services/auth.service";
import { login } from "store/user.slice";
import Styles from "styles/pages/Login.module.scss";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const info = useSelector((state) => state.user);

  const loginMutation = useMutation(SignIn, {
    onError: (e) => {
      message.error("Login failed!");
      message.error(e.message);
    },
    onSuccess: (data) => {
      message.success("Logged in successfully!");
      router.push("/seller/dashboard");
      dispatch(login(data));
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
                <a href="/register">Register Now</a>
              </span>
            </p>
          </Form>
        </Card>
      </div>
    </div>
  );
}
