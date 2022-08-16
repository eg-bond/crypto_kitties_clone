const Kittycontract = artifacts.require('Kittycontract')

module.exports = async function (deployer) {
  await deployer.deploy(Kittycontract)
}
