import DashboardLayout from "components/DashboardLayout";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import Web3Modal from "web3modal";
import Styles from "styles/pages/Buyer.module.scss";
import { Image } from "antd";
import { FiShare2 } from "react-icons/fi";
import Market from "../../artifacts/contracts/NFTWarranty.sol/NFTWarranty.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";

import { nftMarketAddress, nftAddress } from "../../.config";

export default function Dashboard() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    setLoadingState("loading");
    // connect to metamask wallet

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const nftWarranty = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      signer
    );
    console.log(nftWarranty);
    const nft = new ethers.Contract(nftAddress, NFT.abi, signer);

    // Call the fetchMyWarrantyItems function from the nftMarket instance
    const nfts = await nftWarranty.fetchMyExpiredWarrantyItems();

    console.log(nfts);
  };

  if (loadingState === "loaded" && !nfts.length) {
    return (
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <span>
            Customize <a href="#API">Description</a>
          </span>
        }
      >
        <Button type="primary">Create Now</Button>
      </Empty>
    );
  }

  console.log(nfts);

  return (
    <DashboardLayout title="My Warranties">
      <div className={Styles.dashboard}>
        <div className={Styles.productCard}>
          <div className={Styles.productCardImage}>
            <div className={Styles.productCardImageOverlay}>6 Months Left</div>
            <div className={Styles.productCardService}>
              <FiShare2 />
            </div>

            <Image
              src="https://rukminim1.flixcart.com/image/832/832/k2z1t3k0/plant-sapling/q/f/m/plmpceslsqdvn-w-1-rolling-nature-original-imafm6wv2qjjbgpx.jpeg?q=70"
              height={200}
              width={200}
            ></Image>
          </div>
          <div className={Styles.productCardName}>Sl No. 123445</div>
          <div className={Styles.productCardTitle}>Potted Plant</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={Styles.productCardName}>Extension Cost</div>
            <div className={Styles.productCardName}>1 Eth</div>
          </div>
          <div className={Styles.productCardImageOverlay2}>More Details</div>
        </div>

        <div className={Styles.productCard}>
          <div className={Styles.productCardImage}>
            <div className={Styles.productCardImageOverlay}>3 Months Left</div>
            <div className={Styles.productCardService}>
              <FiShare2 />
            </div>

            <Image
              src="https://rukminim1.flixcart.com/image/832/832/k2urhjk0/plant-sapling/s/2/h/golden-money-plant-in-imported-plastic-pot-air-purifier-1-dr-original-imafm42nnbdpzrye.jpeg?q=70"
              height={200}
              width={200}
            ></Image>
          </div>
          <div className={Styles.productCardName}>Sl No. 123445</div>
          <div className={Styles.productCardTitle}>Potted Plant</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className={Styles.productCardName}>Extension Cost</div>
            <div className={Styles.productCardName}>0.5 Eth</div>
          </div>
          <div className={Styles.productCardImageOverlay2}>More Details</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
