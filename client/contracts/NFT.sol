// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
 

contract NFT is ERC721URIStorage, ERC721Burnable, Ownable  {
    //auto-increment field for each token
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

     //address of the NFT market place
    address contractAddress;

    constructor (address marketplaceAddress) ERC721("Metaverse Tokens", "MET") {
        contractAddress = marketplaceAddress;
    }

    /// @notice create a new token
    /// @param uri : token URI
    function createToken(string memory uri) public onlyOwner returns (uint) {
        //set a new token id for the token to be minted
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
         
         _safeMint (msg.sender, newItemId); //mint the token
         _setTokenURI(newItemId, uri); //generate the URI
        setApprovalForAll(contractAddress, true); //grant transaction permission to marketplace
        return newItemId; 
    }

    function _burn(uint256 tokenId) internal override( ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function burnNFT(uint256 tokenId) public {
        _burn(tokenId);
    }

}

