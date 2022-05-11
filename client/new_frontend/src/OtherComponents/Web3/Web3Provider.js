import React, { createContext } from 'react'
import { createContract, useCurrentAccount, useWeb3 } from './web3Cliend'
import Kittycontract from 'truffleBuild/contracts/Kittycontract.json'

export const Web3Context = createContext()

export const Web3Provider = ({ children }) => {
  const web3 = useWeb3()
  let selectedAccount = useCurrentAccount()
  const kittyContract = createContract(
    web3,
    Kittycontract.abi,
    Kittycontract.networks[5777].address
  )

  return (
    <Web3Context.Provider value={{ web3, selectedAccount, kittyContract }}>
      {children}
    </Web3Context.Provider>
  )
}

export default Web3Provider
