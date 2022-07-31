// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

 //prevents re-entrancy attacks
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


import "hardhat/console.sol";

contract NFTWarranty is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsProvided;

    Counters.Counter private _tokenIds;

    string constant NOT_OWNER = "003007";

    address owner; //owner of the smart contract

    //people have to pay to puy their NFT on this marketplace
    // uint256 listingPrice = 0.0005 ether;

    constructor () payable ERC721("Metaverse Tokens", "MET") {
        owner = msg.sender;
    }

       // make a warranty item using nft
    struct WarrantyItem {
        uint itemId;
        uint256 tokenId;
        address seller; //person selling the nft
        address payable owner; //owner of the nft
        uint256 startDate;
        string productUrl;  // a variable for adding product url
        bool active;
        uint256 period;
        string sno;
        uint256 incrementPrice;
    }


    /// @notice create a new token
    /// @param uri : token URI
    function createToken(string memory uri,
        uint256 period,
        string memory sno,
        uint256 incrementPrice) public returns (uint) {
        //set a new token id for the token to be minted
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
         
         _safeMint (msg.sender, newItemId); //mint the token
         _setTokenURI(newItemId, uri); //generate the URI

         _itemIds.increment();
         uint256 itemId = _itemIds.current();

        idToWarrantyItem[itemId] = WarrantyItem(
            itemId,
            newItemId,
            owner, // the smart contract is the seller of the nft 
            payable(msg.sender),
            block.timestamp,
            uri,
            true,
            period,
            sno,
            incrementPrice
        );

            // log the event
            emit WarrantyItemCreated(
                itemId,
                newItemId,
                owner,
                msg.sender,
                block.timestamp,
                uri,
                true,
                period,
                sno,
                incrementPrice
            );


        return newItemId; 
    }

    
    /**
   * @dev Mapping from owner address to count of his tokens.
   */
  mapping (address => uint256) private ownerToNFTokenCount;

    /**
    * @dev Mapping from NFT ID to approved address.
    */
    mapping (uint256 => address) internal idToApproval;

    /**
    * @dev A mapping from NFT ID to the address that owns it.
    */
    mapping (uint256 => address) internal idToOwner;

    //a way to access values of the WarrantyItem struct above by passing an integer ID
    mapping(uint256 => WarrantyItem) private idToWarrantyItem;

    //log message (when Item is sold)
    event WarrantyItemCreated (
        uint indexed itemId,
        uint256 indexed tokenId,
        address  seller,
        address  owner,
        uint256 startDate,
        string productUrl,
        bool active,
        uint256 period,
        string sno,
        uint256 incrementPrice
    );

    // function getListingPrice() public view returns (uint256) {
    //     return listingPrice;
    // }

    // function setListingPrice(uint _price) public returns(uint) {
    //      if(msg.sender == address(this) ){
    //          listingPrice = _price;
    //      }
    //      return listingPrice;
    // }

    function createWarrantyItem(
        uint256 tokenId,
        string memory productUrl,
        uint256 period,
        string memory sno,
        uint256 incrementPrice
    ) public {
        
        // require(msg.value == listingPrice, "Price must match listing price"); // to check if the passed listing price actually matches the listing price
            _itemIds.increment();
            uint256 itemId = _itemIds.current();

            idToWarrantyItem[itemId] = WarrantyItem(
                itemId,
                tokenId,
                owner, // the smart contract is the seller of the nft 
                payable(msg.sender),
                block.timestamp,
                productUrl,
                true,
                period,
                sno,
                incrementPrice
            );

            // log the event
            emit WarrantyItemCreated(
                itemId,
                tokenId,
                owner,
                msg.sender,
                block.timestamp,
                productUrl,
                true,
                period,
                sno,
                incrementPrice
            );
    }


    function getWarrantyItemCount() public view returns (uint256) {
        return _itemIds.current();
    }
    
    function getAllWarrantyItems() public view returns (WarrantyItem[] memory) {
        uint256 count = getWarrantyItemCount();
        uint currentIndex = 0;

        WarrantyItem[] memory items = new WarrantyItem[](count);
        for (uint256 i = 0; i < count; i++) {
            uint currentId = idToWarrantyItem[i+1].itemId;
            WarrantyItem storage currentItem = idToWarrantyItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    /// @notice fetch list of NFT Warranties owned by the user
    function fetchMyWarrantyItems() public view returns (WarrantyItem[] memory) {
       uint256 count = getWarrantyItemCount();
        uint currentIndex = 0;
        uint itemCount = 0;

        for(uint i = 0; i < count; i++){
            uint currentId = idToWarrantyItem[i+1].itemId;
            WarrantyItem storage currentItem = idToWarrantyItem[currentId];
            if(currentItem.owner == msg.sender && currentItem.active == true){
                itemCount += 1;
            }
        }

        WarrantyItem[] memory items = new WarrantyItem[](itemCount);
        for (uint256 i = 0; i < count; i++) {
            uint currentId = idToWarrantyItem[i+1].itemId;
            WarrantyItem storage currentItem = idToWarrantyItem[currentId];
            if(currentItem.owner == msg.sender && currentItem.active == true){
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
    

    /// @notice fetch list of NFT Warranties owned/bought by this user which are expired
    function fetchMyExpiredWarrantyItems() public view returns (WarrantyItem[] memory) {
        uint256 count = getWarrantyItemCount();
        uint currentIndex = 0;
        uint itemCount = 0;

        for(uint i = 0; i < count; i++){
            uint currentId = idToWarrantyItem[i+1].itemId;
            WarrantyItem storage currentItem = idToWarrantyItem[currentId];
            if(currentItem.owner == msg.sender && currentItem.active == true){
                itemCount += 1;
            }
        }

        WarrantyItem[] memory items = new WarrantyItem[](itemCount);
        for (uint256 i = 0; i < count; i++) {
            uint currentId = idToWarrantyItem[i+1].itemId;
            WarrantyItem storage currentItem = idToWarrantyItem[currentId];
            if(currentItem.owner == msg.sender && currentItem.active == false){
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // verify the NFT Ownership
    function verifyNFTOwnership(uint256 tokenId) public view returns (bool) {
        // check if the msg.sender is the owner of the NFT
        if(idToWarrantyItem[tokenId].owner == msg.sender){
            return true;
        }
        return false;
    }

    function returnCaller () public view returns (address) {
        return msg.sender;
    }

    // function to verify the warranty item is active
    function verifyWarrantyItemActive(uint256 itemId) public view returns (bool) {
        return idToWarrantyItem[itemId].active == true;
    }

    // Function to calculate months passed since the start date of the warranty item
    function getMonthsPassed(uint256 itemId) public view returns (uint256) {
        uint256 startDate = idToWarrantyItem[itemId].startDate;
        uint256 currentDate = block.timestamp;
        uint256 monthsPassed = (currentDate - startDate) / (30 * 24 * 60 * 60);
        return monthsPassed;
    }

    // Function to calculate if the months passed is greater than the period of the warranty item, if it is then burn the nft
    function checkIfExpired(uint256 itemId) public view returns (bool) {
        uint256 monthsPassed = getMonthsPassed(itemId);
        uint256 period = idToWarrantyItem[itemId].period;
        if(monthsPassed > period) {
            return true;
        }
        return false;
    }

    // Function to burn the nft
    function burnNFT(uint256 tokenId) public returns (bool) {
        require(verifyNFTOwnership(tokenId), "You are not the owner of this NFT");
        idToWarrantyItem[tokenId].active = false;
        _burn(tokenId);
        return true;
    }

    // function to transfer the ownership of the warranty item to another user using ierc721
    function transferWarrantyItem(uint256 tokenId, address payable newOwner) public {
        require(verifyNFTOwnership(tokenId), "You are not the owner of this NFT");
        transferFrom(msg.sender, newOwner, tokenId);
        // find the warranty item
        idToWarrantyItem[tokenId].owner = newOwner;
    }
    
    function increasePeriod(uint256 itemId, uint256 addPeriod) payable public {
        // uint256 price = idToWarrantyItem[itemId].incrementPrice * addPeriod;
        
        // require(msg.value == value, "You need to pay the correct price for increasing the period");
        if(verifyWarrantyItemActive(itemId)){
            idToWarrantyItem[itemId].period += addPeriod;
        }
        else {
            idToWarrantyItem[itemId].period = addPeriod;
            idToWarrantyItem[itemId].active = true;
            idToWarrantyItem[itemId].startDate = block.timestamp;
        }
    }


}