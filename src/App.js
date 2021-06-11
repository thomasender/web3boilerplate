import './App.css';
import Web3 from 'web3';
import React, { useState, useEffect } from 'react'
import { abi } from './abis/abi';

const App = () => {

  const [userAddress, setUserAddress] = useState("");
  const [tokenName, setTokenName] = useState("");

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () =>{

  let web3 = null;
  let accounts;
  const contractAddress = "0x722dd3F80BAC40c951b51BdD28Dd19d435762180";
  let token;

    if(!window.ethereum){
      alert("Please install MetaMask");
      window.open("https://metamask.io/");
    }

    if(typeof web3 !== 'undefined'){
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {}
          }
        ]
      });
      accounts = await web3.eth.getAccounts();
      if(accounts && accounts.length){
        setUserAddress(accounts[0]);
      }
      token = new web3.eth.Contract(abi, contractAddress);
        setTokenName( async () => {
          if(token){
            await token.methods.name().call()
          }
        })
  } else {
    alert("")
  }
}

  return (
    <div className="App">
        
    </div>
  );

} 

export default App;
