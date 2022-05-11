import { useState, useEffect, useMemo } from 'react'
import Web3 from 'web3'

export const chains = {
  1: 'ethereum',
  56: 'binance',
  137: 'polygon',
  250: 'fantom',
  1337: 'ganache',
}

export const getNativeCoinSymbol = chainName => {
  switch (chainName) {
    case 'ethereum':
      return 'ETH'
    case 'binance':
      return 'BNB'
    case 'polygon':
      return 'MATIC'
    case 'fantom':
      return 'FTM'
    case 'ganache':
      return 'ETH'
    default:
      break
  }
}

// return web3 instance
export const useWeb3 = () => {
  const web3 = useMemo(() => new Web3(Web3.givenProvider), [])
  return web3
}

// return current Metamask account
export const useCurrentAccount = () => {
  let [currentAccount, setAccount] = useState(0)

  useEffect(() => {
    // get current MM account
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(accounts => {
        setAccount(accounts[0])
      })
      .catch(err => {
        console.log(err)
        return
      })

    // subscribe to the MM account changing
    window.ethereum.on('accountsChanged', function (accounts) {
      setAccount(accounts[0])
    })
  }, [])

  return currentAccount
}

export const createContract = (web3, abi, contractAddress) => {
  return new web3.eth.Contract(abi, contractAddress)
}