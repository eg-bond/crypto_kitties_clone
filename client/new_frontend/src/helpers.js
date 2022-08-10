import { useEffect, useState } from 'react'
import { pageCapacity } from './pages/Catalogue/MyKittiesPage'

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

export const getOwnedKittiesIds = async (kittyContract, selectedAccount) => {
  if (selectedAccount) {
    const kittyIds = await kittyContract.methods
      .getKittyByOwner(selectedAccount)
      .call()
    return kittyIds
  }
}

export const fetchTokenIdsOnSale = async (marketplaceContract, dispatch) => {
  marketplaceContract.methods
    .getAllTokenOnSale()
    .call()
    .then(idsArray => {
      dispatch({
        type: 'SET_ALL_TOKEN_IDS_ON_SALE',
        payload: [...new Set(idsArray)],
      })
    })
}

export const getKitties = async (kittyContract, idsArray) => {
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

  let payload = {}
  await Promise.all(promises).then(kittiesArray => {
    kittiesArray.forEach(
      indexedKittyObj => (payload = { ...payload, ...indexedKittyObj })
    )
  })
  return payload
}

export const getKittiesByPage = async (page, kittyContract, idsArray) => {
  const targetSlice = idsArray.slice(
    (page - 1) * pageCapacity,
    page * pageCapacity
  )
  const kitties = await getKitties(kittyContract, targetSlice)
  return kitties
}

export const useGetKittiesByPage = (
  pageNumber,
  idsArray,
  kittyContract,
  dispatch
) => {
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [lastPage, setLastPage] = useState(
    Math.ceil(idsArray.length / pageCapacity) || 1
  )

  useEffect(() => {
    dispatch({ type: 'SET_PAGE', payload: 1 })
    dispatch({ type: 'CLEAR_KITTIES' })
    setLastPage(Math.ceil(idsArray.length / pageCapacity))
  }, [idsArray])

  useEffect(() => {
    if (lastPage > pageNumber) {
      setHasMore(true)
    } else {
      setHasMore(false)
    }
  }, [lastPage, pageNumber])

  useEffect(() => {
    setLoading(true)
    getKittiesByPage(pageNumber, kittyContract, idsArray)
      .then(payload => {
        dispatch({ type: 'ADD_KITTIES', payload })
      })
      .then(() => setLoading(false))
  }, [pageNumber, idsArray])

  return { loading, hasMore }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const shortenAccount = (account, endChars) => {
  return account.slice(0, 2) + '...' + account.slice('-' + endChars)
}
