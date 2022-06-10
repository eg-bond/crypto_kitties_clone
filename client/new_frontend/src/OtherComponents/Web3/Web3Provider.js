import React, { createContext } from 'react'
import { createContract, useAuth, useWeb3 } from './web3Cliend'
import Kittycontract from 'truffleBuild/contracts/Kittycontract.json'
import MarketplaceContract from 'truffleBuild/contracts/KittyMarketPlace.json'
import { useNetworkSwitch } from './useNetworkSwitch'

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const web3 = useWeb3()
  const { connectedAccount, login, logout } = useAuth()
  const [currentChainName, handleNetworkSwitch] = useNetworkSwitch(web3)

  const kittyContract = createContract(
    web3,
    Kittycontract.abi,
    Kittycontract.networks[5777].address
  )
  const marketplaceContract = createContract(
    web3,
    MarketplaceContract.abi,
    MarketplaceContract.networks[5777].address
  )

  return (
    <Web3Context.Provider
      value={{
        web3,
        kittyContract,
        marketplaceContract,
        connectedAccount,
        currentChainName,
        handleNetworkSwitch,
        login,
        logout,
      }}>
      {children}
    </Web3Context.Provider>
  )
}

export default Web3Provider
