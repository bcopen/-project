Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.159.131:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"holder","type":"bytes32"}],"name":"getAssetCount","outputs":[{"name":"","type":"uint"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"holder","type":"bytes32"}],"name":"validHolder","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"AssetReceived","outputs":[{"name":"","type":"uint"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"holderList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"holder","type":"bytes32"}],"name":"getAssetCount","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"holderNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
AssetContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
assetContractInstance = AssetContract.at('0x866c142413e389a41d2194f70be88400f506aa73');
holders = {"Rama": "holder-1", "Nick": "holder-2", "Jose": "holder-3"}

function transferAsset() {
  fromHolder = $("#fromHolder").val();
  toHolder = $("#toHolder").val();
  transferAmount = $("#transferAmount").val();
  assetContractInstance.transferAsset(fromHolder, toHolder, transferAmount, {from: web3.eth.accounts[0]}, function() {
    let div_id_from = holders[fromHolder];
    let div_id_to = holders[toHolder];
    $("#" + div_id_from).html(assetContractInstance.getAssetCount.call(fromHolder).toString());
    $("#" + div_id_to).html(assetContractInstance.getAssetCount.call(toHolder).toString());
  });
}

$(document).ready(function() {
  holderNames = Object.keys(holders);
  for (var i = 0; i < holderNames.length; i++) {
    let name = holderNames[i];
    let val = assetContractInstance.getAssetCount.call(name).toString()
    $("#" + holders[name]).html(val);
  }
});