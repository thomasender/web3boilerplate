import "./App.css";
import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { abi } from "./abis/abi";
import "semantic-ui-css/semantic.min.css";
import HeaderComponent from "./components/HeaderComponent";

import { Button } from "semantic-ui-react";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [contract, setContract] = useState({});

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () => {
    let web3 = null;
    const contractAddress = "0x722dd3F80BAC40c951b51BdD28Dd19d435762180";
    let token;
    let tokenNameString;
    if (!window.ethereum) {
      alert("Please install MetaMask");
      window.open("https://metamask.io/");
    }

    if (typeof web3 !== "undefined") {
      web3 = new Web3(window.ethereum);
      if (web3) {
        setWeb3(web3);
      }
      token = new web3.eth.Contract(abi, contractAddress);
      setContract(token);
      tokenNameString = await token.methods.name().call();
      setTokenName(tokenNameString);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const connectUser = async (web3) => {
    let accounts;
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    accounts = await web3.eth.getAccounts();
    if (accounts && accounts.length) {
      setUserAddress(accounts[0]);
    }
  };

  return (
    <div className="App">
      <HeaderComponent
        userAddress={userAddress}
        web3={web3}
        web3={initWeb3}
        tokenName={tokenName}
        contract={contract}
      />

      {userAddress === "" ? (
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            connectUser(web3);
          }}
        >
          Connect To Dapp
        </Button>
      ) : (
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
        >
          Disconnect
        </Button>
      )}
    </div>
  );
};

export default App;
