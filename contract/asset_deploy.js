Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider("http://10.16.86.4:8545"))
// 编译contract：
asset_code = fs.readFileSync('Asset.sol').toString()
solc = require('solc')
compiledAssetCode = solc.compile(asset_code)


compiledAssetCode.contracts[':Asset'].bytecode
compiledAssetCode.contracts[':Asset'].interface

// 部署contract：
abiDefinition = JSON.parse(compiledAssetCode.contracts[':Asset'].interface)
AssetContract = web3.eth.contract(abiDefinition)
byteCode = compiledAssetCode.contracts[':Asset'].bytecode
deployedAssetContract = AssetContract.new(['Rama','Nick','Jose'],[100 ,10, 0],{data: byteCode, from: web3.eth.accounts[0], gas: 6700000})
deployedAssetContract.address
assetContractInstance = AssetContract.at(deployedAssetContract.address)


// 验证部署
deployedAssetContract.address   // 0xb616bfab01e4aeda2943d0ce700aaaa6f4231b73
assetContractInstance.getAssetCount('Rama', {from: web3.eth.accounts[0]})
assetContractInstance.getAssetCount('Nick')
assetContractInstance.getAssetCount('Jose')
assetContractInstance.transferAsset('Rama', 'Nick', 10, {from: web3.eth.accounts[0]})

