import { useContext } from 'react'
import { Web3Context } from './Web3Provider'

export const useMarketplace = () => {
  const { web3, kittyContract, marketplaceContract, connectedAccount, login } =
    useContext(Web3Context)

  // put it in a separate 'useKittyContract' hook ???
  const getKitty = async id => kittyContract.methods.getKitty(id).call()
  // put it in a separate 'useKittyContract' hook ???
  const getKittyOwner = async id => kittyContract.methods.ownerOf(id).call()

  const getOffer = async id => marketplaceContract.methods.getOffer(id).call()

  const getKittyPrice = async id => {
    const offer = await getOffer(id)
    return web3.utils.fromWei(offer.price, 'ether')
  }

  const getKittyPrices = async idsArray => {
    const promises = []
    idsArray.forEach(id =>
      promises.push(
        getKittyPrice(id).then(price => {
          // if kitty is for sale
          if (price !== '0') {
            return { [id]: price }
          }
        })
      )
    )

    let payload = {}
    await Promise.all(promises).then(pricesArray => {
      pricesArray.forEach(
        indexedPriceObj => (payload = { ...payload, ...indexedPriceObj })
      )
    })
    return payload
  }

  const sellKitty = async (price, id) => {
    let weiPrice = web3.utils.toWei(price, 'ether')
    console.log('weiPrice', weiPrice)
    return marketplaceContract.methods
      .setOffer(weiPrice, id)
      .send({ from: connectedAccount })
  }

  const buyKitty = async id => {
    const price = await getKittyPrice(id)

    return marketplaceContract.methods
      .buyKitty(id)
      .send({ from: connectedAccount, value: web3.utils.toWei(price, 'ether') })
  }

  const removeOffer = async id =>
    marketplaceContract.methods.removeOffer(id).send({ from: connectedAccount })

  const approve = async () => {
    const tx_info = await kittyContract.methods
      .setApprovalForAll(marketplaceContract._address, true)
      .send({ from: connectedAccount })
    return tx_info.status
  }

  const disapprove = async () =>
    kittyContract.methods
      .setApprovalForAll(marketplaceContract._address, false)
      .send({ from: connectedAccount })

  return {
    getKitty,
    getKittyPrice,
    getKittyPrices,
    sellKitty,
    buyKitty,
    removeOffer,
    getKittyOwner,
    approve,
    disapprove,
  }
}
