import './App.css';
import Web3 from 'web3';
import { useState } from 'react'

function App() {
  var web3;
  var accounts;
  var user;
  var balance;
  
  const initWeb3 = async () =>{

  web3 = null;
  
    if(!window.ethereum){
      alert("Please install MetaMask");
    }

    if(typeof web3 !== 'undefined'){
      web3 = new Web3(window.ethereum);
      console.log(web3);
      accounts = await web3.eth.getAccounts();
      user = accounts[0];
      console.log("usER", user);
      balance = await web3.eth.getBalance(user);
      console.log(balance);
    } else {
      // set the provider you want from Web3.providers
      alert("Please install Metamask");
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

  }
  
  initWeb3();
  return (
    <div className="App">
      { web3 ? "Its there" : "Not there" }
      { user ? "Yep" : "nope"}
    </div>
  );
}

export default App;
