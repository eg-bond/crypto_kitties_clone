pragma solidity ^0.8.0;


import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./IKittyMarketplace.sol";
import "./Kittycontract.sol";

contract KittyMarketPlace is Ownable, IKittyMarketPlace {
  Kittycontract private _kittyContract;

  struct Offer {
    address payable seller;
    uint price;
    uint index;
    uint tokenId;
    bool active;
  }

  Offer[] offers;

  mapping (uint=>Offer) tokenIdToOffer;
  
  function setKittyContract(address _kittyContractAddress) onlyOwner public {
    _kittyContract = Kittycontract(_kittyContractAddress);
  }

  constructor (address _kittyContractAddress) {
    setKittyContract(_kittyContractAddress);
  }

  function getOffer(uint256 _tokenId) public view returns ( 
    address seller, uint price, uint index, uint tokenId, bool active
  ) {
    Offer storage offer = tokenIdToOffer[_tokenId];
    seller = offer.seller;
    price = offer.price;
    index = offer.index;
    tokenId = offer.tokenId;
    active = offer.active;
    
  }

  function getAllTokenOnSale() external view returns(uint[] memory listOfOffers) {

    if (offers.length == 0) {
      return new uint[](0);
    }
    
    uint[] memory tokenIds = new uint[](offers.length);

    for (uint i = 0; i < offers.length; i++) {
      if(offers[i].active) {
        tokenIds[i] = offers[i].tokenId;
      }
    }
    return tokenIds;
  }

  function setOffer(uint _price, uint _tokenId) external {
    // Only the owner of _tokenId can create an offer.
    require(_kittyContract.ownerOf(_tokenId) == msg.sender, 'You are not the owner of this token');
    // There can only be one active offer for a token at a time.
    require(!tokenIdToOffer[_tokenId].active, 'Active offer for this token is already exists');
    // Marketplace contract (this) needs to be an approved operator when the offer is created.
    require(_kittyContract.isApprovedForAll(msg.sender, address(this)), 'Contract needs to be approved first');

    Offer memory newOffer = Offer(payable(msg.sender), _price, offers.length, _tokenId, true);

    offers.push(newOffer);
    tokenIdToOffer[_tokenId] = newOffer;

    emit MarketTransaction("Create offer", msg.sender, _tokenId);
  }

  function removeOffer(uint _tokenId) external {
    Offer memory offer = tokenIdToOffer[_tokenId];
    // Only the seller of _tokenId can remove an offer.
    require(offer.seller == msg.sender, 'You are not the seller of this token'); 

    offers[offer.index].active = false;
    delete tokenIdToOffer[_tokenId];

    emit MarketTransaction("Remove offer", msg.sender, _tokenId);
  }

  function buyKitty(uint256 _tokenId) external payable {
    Offer memory offer = tokenIdToOffer[_tokenId];
    // * Requirement: The msg.value needs to equal the price of _tokenId
    require(msg.value == offer.price, 'The price is incorrect');
    // * Requirement: There must be an active offer for _tokenId
    require(tokenIdToOffer[_tokenId].active, 'There is no active offer for this token');

    // Deleting token from the mappping and arr before paying to prefent reentrancy
    offers[offer.index].active = false;
    delete tokenIdToOffer[_tokenId];

    // Transfer the funds to the seller
    if (offer.price > 0) {
      offer.seller.transfer(offer.price);
    }

    // transfer ownership of the kitty
    _kittyContract.transferFrom(offer.seller, msg.sender, _tokenId);    

    emit MarketTransaction("Buy", msg.sender, _tokenId);
  }

}

  