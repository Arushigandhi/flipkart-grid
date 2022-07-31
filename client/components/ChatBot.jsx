import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { Button } from "antd";
import { useQuery } from "react-query";
import { getNotifs } from "services/products.service";
import { useSelector } from "react-redux";

export const Review = (props) => {
  const [srno, setSrno] = useState();
  const [service, setService] = useState();
  const [address, setAddress] = useState();

  const info = useSelector((state) => state.user);

  const { isLoading } = useQuery("requestRaise", () =>
    getNotifs({
      sno: props?.steps?.srno?.message,
      service: props?.steps?.service?.message,
      address: props?.steps?.address?.message,
      buyerId: info.user.user._id,
    })
  );

  return (
    <div style={{ width: "100%" }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Serial Number</td>
            <td>{props?.steps?.srno?.message}</td>
          </tr>
          <tr>
            <td>Service Type</td>
            <td>{props?.steps?.service?.message}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{props?.steps?.address?.message}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const theme = {
  background: "#fff",
  fontFamily: "Poppins",
  headerBgColor: "#047bd5",
  headerFontColor: "#fff",
  headerFontSize: "18px",
  botBubbleColor: "#047bd5",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#000",
};

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

export default function SimpleForm() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        recognitionEnable={true}
        speechSynthesis={{ enable: true, lang: "en" }}
        floating={true}
        steps={[
          {
            id: "1",
            message: "Hey there, may I know the serial number of your product?",
            trigger: "srno",
          },
          {
            id: "srno",
            user: true,
            trigger: "3",
          },
          {
            id: "3",
            message: "What services do you require?",
            trigger: "service",
          },
          {
            id: "service",
            options: [
              { value: "warranty", label: "Warranty", trigger: "5" },
              { value: "repair", label: "Repair", trigger: "5" },
              { value: "replacement", label: "Replacement", trigger: "5" },
              { value: "return", label: "Return", trigger: "5" },
            ],
          },
          {
            id: "5",
            message: "May I know your location?",
            trigger: "address",
          },
          {
            id: "address",
            user: true,
            trigger: "7",
          },
          {
            id: "7",
            message: "Great! Check out your summary",
            trigger: "review",
          },
          {
            id: "review",
            component: <Review />,
            asMessage: true,
            trigger: "update",
          },
          {
            id: "update",
            message: "Would you like to update some field?",
            trigger: "update-question",
          },
          {
            id: "update-question",
            options: [
              { value: "yes", label: "Yes", trigger: "update-yes" },
              { value: "no", label: "No", trigger: "end-message" },
            ],
          },
          {
            id: "update-yes",
            message: "What field would you like to update?",
            trigger: "update-fields",
          },
          {
            id: "update-fields",
            options: [
              {
                value: "srno",
                label: "Serial Number",
                trigger: "update-srno",
              },
              {
                value: "service",
                label: "Service",
                trigger: "update-service",
              },
              {
                value: "address",
                label: "Address",
                trigger: "update-address",
              },
            ],
          },
          {
            id: "update-srno",
            update: "srno",
            trigger: "7",
          },
          {
            id: "update-service",
            update: "service",
            trigger: "7",
          },
          {
            id: "update-address",
            update: "address",
            trigger: "7",
          },
          {
            id: "end-message",
            message: "Thanks! Your data was submitted successfully!",
            end: true,
          },
        ]}
      />
    </ThemeProvider>
  );
}
