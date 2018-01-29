Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.159.131:8545"));
abiDefinition = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"holderList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"holder","type":"bytes32"}],"name":"getAssetCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"fromHolder","type":"bytes32"},{"name":"toHolder","type":"bytes32"},{"name":"asset_count","type":"uint256"}],"name":"transferAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"holder","type":"bytes32"}],"name":"validHolder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"AssetReceived","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"holderNames","type":"bytes32[]"},{"name":"stockCounts","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')
AssetContract = web3.eth.contract(abiDefinition)
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
assetContractInstance = AssetContract.at('0xd96bc2d6b9a494fd36f79f48c4b57d9d6ab73023');
holders = {"Rama": "holder-1", "Nick": "holder-2", "Jose": "holder-3"}

function transferAsset() {
  var fromHolder = $("#fromHolder").val();
  var transferAmount = $("#transferAmount").val();
  var toHolder = $("#toHolder").val();
  alert("begin transferAsset");
  assetContractInstance.transferAsset('Rama', 'Nick', 2, {from: web3.eth.accounts[0]}, function() {
	  alert('callback');
  }
  );
  alert("end transferAsset");
  /*
  transferAssetABd();
  assetContractInstance.transferAsset(  function() {
  var fromHolder = $("#fromHolder").val();
  var toHolder = $("#toHolder").val();
  var transferAmount = $("#transferAmount").val();
  var eth ={from: web3.eth.accounts[0]};
    let div_id_from = holders[fromHolder];
    let div_id_to = holders[toHolder];
    $("#" + div_id_from).html(assetContractInstance.getAssetCount.call(fromHolder).toString());
    $("#" + div_id_to).html(assetContractInstance.getAssetCount.call(toHolder).toString());
  });
  */
}
function transferAssetABd(fromHolder, toHolder, transferAmount){
	alert(3);
  var fromHolder = $("#fromHolder").val();
  var transferAmount = $("#transferAmount").val();
  var toHolder = $("#toHolder").val();
  var eth ={from: web3.eth.accounts[0]};
  //alert(fromHolder);
  //alert(toHolder);
  //alert(transferAmount);
  //alert(eth);
    let div_id_from = holders[fromHolder];
    let div_id_to = holders[toHolder];
//voteForCandidate()();
    alert("123");
}


$(document).ready(function() {
  holderNames = Object.keys(holders);
  for (var i = 0; i < holderNames.length; i++) {
    let name = holderNames[i];
    let val = assetContractInstance.getAssetCount.call(name).toString()
    $("#" + holders[name]).html(val);
  }
});