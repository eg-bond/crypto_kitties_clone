const Token = artifacts.require('Kittycontract')

module.exports = async function (deployer) {
  await deployer.deploy(Token)
  // let kittyInstance = await Token.deployed()
  // await kittyInstance.createKittyGen0(1111)
  // await kittyInstance.createKittyGen0(2222)
  // await kittyInstance.createKittyGen0(3333)
}
