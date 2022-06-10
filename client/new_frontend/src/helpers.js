export const getOwnedKitties = async (
  kittyContract,
  selectedAccount,
  dispatch
) => {
  if (selectedAccount) {
    const kittyIds = await kittyContract.methods
      .getKittyByOwner(selectedAccount)
      .call()
    const promises = []
    kittyIds.forEach(id =>
      promises.push(
        kittyContract.methods
          .getKitty(id)
          .call()
          .then(kittyObj => {
            return { [id]: kittyObj }
          })
      )
    )
    Promise.all(promises).then(kittiesArray => {
      let payload = {}
      kittiesArray.forEach(
        indexedKittyObj => (payload = { ...payload, ...indexedKittyObj })
      )
      dispatch({ type: 'SET_KITTIES', payload })
    })
  }
}

export const fetchTokenIdsOnSale = async (marketplaceContract, dispatch) => {
  marketplaceContract.methods
    .getAllTokenOnSale()
    .call()
    .then(idsArray => {
      console.log('fetched')
      dispatch({ type: 'SET_ALL_TOKEN_IDS_ON_SALE', payload: idsArray })
    })
}

export const getKitties = async (kittyContract, idsArray, dispatch) => {
  const promises = []
  idsArray.forEach(id =>
    promises.push(
      kittyContract.methods
        .getKitty(id)
        .call()
        .then(kittyObj => {
          return { [id]: kittyObj }
        })
    )
  )
  Promise.all(promises).then(kittiesArray => {
    let payload = {}
    kittiesArray.forEach(
      indexedKittyObj => (payload = { ...payload, ...indexedKittyObj })
    )
    dispatch({ type: 'SET_ALL_KITTIES_ON_SALE', payload })
  })
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const shortenAccount = (account, endChars) => {
  return account.slice(0, 2) + '...' + account.slice('-' + endChars)
}
