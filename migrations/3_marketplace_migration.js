const Kittycontract = artifacts.require('Kittycontract')
const Marketplace = artifacts.require('KittyMarketPlace')

module.exports = async function (deployer) {
  // fill the Marketplace constructor with Kittycontract address
  // which is deplayed before Marketplace
  await deployer.deploy(Marketplace, Kittycontract.address)
}
