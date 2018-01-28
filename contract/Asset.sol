pragma solidity ^0.4.17;
// We have to specify what version of compiler this code will compile with

contract Asset {
  /* mapping field below is equivalent to an associative array or hash.
  The key of the mapping is holder name stored as type bytes32 and value is
  an unsigned integer to store the vote count
  */
  
  mapping (bytes32 => uint) public AssetReceived;
  
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of holders
  */
  
  bytes32[] public holderList;

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of holders who will be contesting in the election
  */
  function Asset(bytes32[] holderNames, uint[] stockCounts) public {
    holderList = holderNames;
    for (uint i = 0; i < holderList.length; i++) {
       AssetReceived[holderList[i]] = stockCounts[i];
    }
  }

  // This function returns the total votes a holder has received so far
  function getAssetCount(bytes32 holder) view public returns (uint) {
    require(validHolder(holder));
    return AssetReceived[holder];
  }
  
  // This function returns the total votes a holder has received so far
  function getAssetCountTmp1(bytes32 holder) view public returns (uint) {
    require(validHolder(holder));
    return 0;
  }

  // This function returns the total votes a holder has received so far
  function getAssetCountTmp(bytes32 holder) view public returns (uint) {
    return 0;
  }

  // This function increments the vote count for the specified holder. This
  // is equivalent to casting a vote
  function transferAsset(bytes32 fromHolder, bytes32 toHolder, uint asset_count) public {
    require(validHolder(fromHolder));
    require(validHolder(toHolder));
    AssetReceived[fromHolder] -= asset_count;
    AssetReceived[toHolder] += asset_count;
  }

  function validHolder(bytes32 holder) view public returns (bool) {
    for (uint i = 0; i < holderList.length; i++) {
      if (holderList[i] == holder) {
        return true;
      }
    }
    return false;
  }
}
