import { Card, Image } from "antd";
import SimpleForm from "components/ChatBot";
import DashboardLayout from "components/SellerDashboardLayout";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { GetAllProducts, getNotifs } from "services/products.service";
import Styles from "styles/pages/Seller.module.scss";

export default function Dashboard() {
  const info = useSelector((state) => state.user);

  const { data: products, isLoading } = useQuery("myProducts", () =>
    GetAllProducts({
      sellerId: info.user.user._id,
    })
  );
  console.log(products);

  return (
    <DashboardLayout title="My Products">
      <div className={Styles.dashboard}>
        {products?.data?.products?.map((product, index) => (
          <Card className={Styles.productCard} key={index} hoverable={true}>
            <div className={Styles.productCardImage}>
              <Image src={product?.images[0]} height={200} width={400}></Image>
            </div>
            <div className={Styles.productCardTitle}>{product?.name}</div>
            <div className={Styles.productCardDesc}>{product?.description}</div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
