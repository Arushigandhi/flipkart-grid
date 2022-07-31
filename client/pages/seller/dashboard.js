import { Image } from "antd";
import SimpleForm from "components/ChatBot";
import DashboardLayout from "components/SellerDashboardLayout";
import React from "react";
import { useQuery } from "react-query";
import { getNotifs } from "services/products.service";
import Styles from "styles/pages/Seller.module.scss";

export default function Dashboard() {
  const { data: notifs, isLoading } = useQuery("notifs", getNotifs);
  return (
    <DashboardLayout title="My Products">
      <div className={Styles.dashboard}>
        <div className={Styles.productCard}>
          <div className={Styles.productCardImage}>
            <div className={Styles.productCardImageOverlay}>123 active</div>
            <Image
              src="https://rukminim1.flixcart.com/image/832/832/k2z1t3k0/plant-sapling/q/f/m/plmpceslsqdvn-w-1-rolling-nature-original-imafm6wv2qjjbgpx.jpeg?q=70"
              height={200}
              width={200}
            ></Image>
          </div>
          <div className={Styles.productCardTitle}>Potted Plant</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
