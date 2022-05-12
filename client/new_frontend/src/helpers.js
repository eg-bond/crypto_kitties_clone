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

export const fetchTokenIdsOnSale = (marketplaceContract, dispatch) => {
  marketplaceContract.methods
    .getAllTokenOnSale()
    .call()
    .then(idsArray =>
      dispatch({ type: 'SET_ALL_TOKEN_IDS_ON_SALE', payload: idsArray })
    )
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
