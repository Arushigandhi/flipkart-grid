import DashboardLayout from "components/DashboardLayout";
import React from "react";
import Styles from "styles/pages/Buyer.module.scss";
import { Image } from "antd";
import { FiShare2 } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <DashboardLayout title="Expired Warranties">
      <div className={Styles.dashboard}>
        <div className={Styles.productCard}>
          <div className={Styles.productCardImage}>
            <div className={Styles.productCardService}>
              <FiShare2 />
            </div>

            <Image
              src="https://rukminim1.flixcart.com/image/832/832/k2z1t3k0/plant-sapling/q/f/m/plmpceslsqdvn-w-1-rolling-nature-original-imafm6wv2qjjbgpx.jpeg?q=70"
              height={200}
              width={200}
            ></Image>
          </div>
          <div className={Styles.productCardName}>Jyothsna Ashok</div>
          <div className={Styles.productCardTitle}>Potted Plant</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={Styles.productCardName}>Extension Cost</div>
            <div className={Styles.productCardName}>1 Eth</div>
          </div>
          <div className={Styles.productCardImageOverlay2}>Buy Extension</div>
        </div>

        <div className={Styles.productCard}>
          <div className={Styles.productCardImage}>
            <div className={Styles.productCardService}>
              <FiShare2 />
            </div>

            <Image
              src="https://rukminim1.flixcart.com/image/832/832/k2urhjk0/plant-sapling/s/2/h/golden-money-plant-in-imported-plastic-pot-air-purifier-1-dr-original-imafm42nnbdpzrye.jpeg?q=70"
              height={200}
              width={200}
            ></Image>
          </div>
          <div className={Styles.productCardName}>Jyothsna Ashok</div>
          <div className={Styles.productCardTitle}>Potted Plant</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={Styles.productCardName}>Extension Cost</div>
            <div className={Styles.productCardName}>0.5 Eth</div>
          </div>
          <div className={Styles.productCardImageOverlay2}>Buy Extension</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
