import React, { useState, useEffect } from "react";
import Web3 from "web3";

import { abi } from "../abis/abi";
import "semantic-ui-css/semantic.min.css";
import HeaderComponent from "./HeaderComponent";
import CardComponent from "./CardComponent";

import { Button, Segment } from "semantic-ui-react";

function HomeComponent() {
  if (!window.ethereum) {
    alert("Please install MetaMask!  Visit https://metamask.io/");
  }

  const [web3, setWeb3] = useState(null);
  const [chainId, setChainId] = useState(0);
  const [token, setToken] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () => {
    let web3 = null;
    const contractAddress = "0x54956E74cb8bF3974A7a03Aef313287956E4c254";

    let token;
    let tokenNameString;
    let ttlSupply;
    let symbol;
    let decimals;
    let blockchainId;
    let tokenObject = {};
    if (!window.ethereum) {
      alert("Please install MetaMask! Visit https://metamask.io/");
      window.open("https://metamask.io/");
    }

    if (typeof web3 !== undefined) {
      web3 = new Web3(window.ethereum);
      if (web3) {
        setWeb3(web3);
      }
      token = new web3.eth.Contract(abi, contractAddress);
      tokenNameString = await token.methods.name().call();
      ttlSupply = await token.methods.totalSupply().call();
      symbol = await token.methods.symbol().call();
      decimals = await token.methods.decimals().call();

      tokenObject.tokenInstance = token;
      tokenObject.tokenName = tokenNameString;
      tokenObject.totalSupply = ttlSupply;
      tokenObject.tokenSymbol = symbol;
      tokenObject.tokenDecimals = decimals;
      setToken(tokenObject);

      blockchainId = await web3.eth.getChainId();
      setChainId(blockchainId);
    }
  };

  const connectUser = async () => {
    requestUserPermission();
    initUser();
  };

  const initUser = async () => {
    let accounts;
    let userAddr;
    let userTokenBal;
    let userETHBal;
    let didRequest;
    let userObject = {};
    userObject.userAddress = "";
    let contractInst = token.tokenInstance;

    accounts = await web3.eth.getAccounts();
    if (accounts && accounts.length) {
      userAddr = accounts[0];
      userTokenBal = await contractInst.methods.balanceOf(userAddr).call();
      userETHBal = await web3.eth.getBalance(userAddr);
      didRequest = await contractInst.methods.tokenRequested(userAddr).call();
      userObject.userAddress = userAddr;
      userObject.userTokenBalance = userTokenBal;
      userObject.userETHBalance = web3.utils.fromWei(userETHBal, "ether");
      userObject.didRequestToken = didRequest;
      setUser(userObject);
    }
  };
  const requestUserPermission = async () => {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
  };
  window.ethereum.on("accountsChanged", async (accounts) => {
    initWeb3();
    initUser();
  });
  window.ethereum.on("chainChanged", (chainId) => {
    window.location.reload();
  });
  return (
    <div className="App">
      {/* HEADER */}
      <Segment>
        <HeaderComponent
          web3={web3}
          tokenData={token}
          userData={user}
          chainId={chainId}
        />
        {user.userAddress === undefined ? (
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              connectUser();
            }}
          >
            Connect To Dapp
          </Button>
        ) : (
          ""
        )}{" "}
      </Segment>
      {/* DEPOSIT */}
      <Segment>
        <CardComponent
          web3={web3}
          contract={token.tokenInstance}
          userData={user}
          initWeb3={() => initWeb3()}
          initUser={() => initUser()}
        />
      </Segment>
    </div>
  );
}

export default HomeComponent;
