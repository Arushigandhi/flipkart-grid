/* test/sample-test2.js */
describe("NFTWarranty", function () {
  it("Should create and execute NFT warranties", async function () {
    const Market = await ethers.getContractFactory("NFTWarranty");
    const market = await Market.deploy();
    await market.deployed();

    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();

    const nftContractAddress = nft.address;

    // let listingPrice = await market.getListingPrice();

    // listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits("1", "ether");

    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");

    await market.createWarrantyItem(
      nftContractAddress,
      1,
      "https://www.flipkart.com",
      1,
      "1234",
      4
    );

    await market.createWarrantyItem(
      nftContractAddress,
      2,
      "https://www.flipkart.com",
      6,
      "1235",
      2
    );

    await market.createWarrantyItem(
      nftContractAddress,
      3,
      "https://www.flipkart.com/abcd",
      9,
      "1237",
      1
    );

    const [_, buyerAddress] = await ethers.getSigners();

    // console.log(buyerAddress);

    items = await market.getAllWarrantyItems();

    console.log("items: ", items);

    await market.transferWarrantyItem(
      nftContractAddress,
      2,
      buyerAddress.address
    );

    const burn = await market.burnNFT(nftContractAddress, 1);

    if (burn) {
      await nft.burnNFT(1);
      console.log("burned");
    }

    const items2 = await market.fetchMyWarrantyItems();

    console.log("items2: ", items2);
  });
});
