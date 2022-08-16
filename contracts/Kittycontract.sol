pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Kittycontract is ERC721("CryptoKittiesClone", "CKC"), Ownable {
  struct Kitty {
    uint256 genes;
    uint64 birthTime;
    uint64 breedingReadyTime;
    uint32 mumId;
    uint32 dadId;
    uint16 generation;
  }
  
  Kitty[] kitties;
  mapping (address => bool) gotFreeKitty;
  uint breedingCooldown = 1 days;

  function alreadyGotFreeKitty(address user) view public returns (bool) {
    if (gotFreeKitty[user] == true) {
        return true;
    }    
    return false;    
  } 

  function totalSupply() view public returns (uint) {
    return kitties.length;
  }  

  function getKitty(uint id) public view returns (Kitty memory) {
    return kitties[id];
  }

  function getKittyByOwner(address _owner) external view returns(uint[] memory) {
    uint[] memory result = new uint[](balanceOf(_owner));
    uint counter = 0;
    for (uint i = 0; i < kitties.length; i++) {
      if (ownerOf(i) == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  uint public constant CREATION_LIMIT_GEN0 = 20;
  uint public gen0Counter;
  

  event Birth(
    uint256 _mumId,
    uint256 _dadId,
    uint256 _generation,
    uint256 _genes,
    address _owner
  );

  // prevents the error with marketplace getAllTokenOnSale()
  constructor () {
    _createKitty(0, 0, 0, 0, msg.sender);
  }

  function _triggerCooldown(Kitty storage _kitty) internal {
    _kitty.breedingReadyTime = uint64(block.timestamp + breedingCooldown);
  }

  function _isReady(Kitty storage _kitty) internal view returns (bool) {
    return (_kitty.breedingReadyTime <= block.timestamp);
  }

  function createKittyGen0(uint256 _genes) public {
      if (msg.sender == owner()) {          
          require(gen0Counter < CREATION_LIMIT_GEN0, 'Amount of first generation kitties is exceeded');
          gen0Counter++;
          _createKitty(0, 0, 0, _genes, msg.sender);
      } else {
          require(alreadyGotFreeKitty(msg.sender) == false, "You have already created the free kitty");
          gotFreeKitty[msg.sender] = true; 
          _createKitty(0, 0, 0, _genes, msg.sender);
      }
  }  

  function _createKitty(
    uint256 _mumId,
    uint256 _dadId,
    uint256 _generation,
    uint256 _genes,
    address _owner
  ) private returns (uint256) {
    Kitty memory _kitty = Kitty({
      genes: _genes,
      birthTime: uint64(block.timestamp),
      breedingReadyTime: uint64(block.timestamp),
      // breedingReadyTime: uint64(block.timestamp + breedingCooldown),
      mumId: uint32(_mumId),
      dadId: uint32(_dadId),
      generation: uint16(_generation)
    });

    kitties.push(_kitty);
    uint256 newKittenId = kitties.length - 1;

    _safeMint(_owner, newKittenId);
    emit Birth(_mumId, _dadId, _generation, _genes, _owner);
    
    return newKittenId;
  }

  function breed(uint _dadId, uint _mumId) public returns (uint) {
    //check ownership
    require(ownerOf(_dadId) == _msgSender() && ownerOf(_mumId) == _msgSender(),
     "You are not the owner of thees kitties"
     );

    //get parents data
    Kitty storage dad = kitties[_dadId];
    Kitty storage mum = kitties[_mumId];

    require(_isReady(dad) && _isReady(mum),
     "Kitties are not ready for breeding"
    );    

    // increase cooldowns for parents
    _triggerCooldown(dad);
    _triggerCooldown(mum);

    uint newDna = _mixDna(dad.genes, mum.genes);
    //figure out the generation
    uint newGen = _newGeneration(dad.generation, mum.generation);
    //create a new cat with the new props, give it to the msg.sender
    return _createKitty(_mumId, _dadId, newGen, newDna, _msgSender());
  }

  function _mixDna(uint _dadDna, uint _mumDna) pure internal returns (uint) {
    uint firstHalf = _dadDna / 100000000;
    uint secondHalf = _mumDna % 100000000;
    uint mixedDna = firstHalf * 100000000 + secondHalf;
    return mixedDna;     
  }

  function _newGeneration(uint _dadGen, uint _mumGen) pure internal returns (uint) {
    if (_dadGen + 1 > _mumGen + 1) {
        return _dadGen + 1;
    } 
    return _mumGen + 1;    
  }
}

