import "./App.css";
import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { abi } from "./abis/abi";
import "semantic-ui-css/semantic.min.css";
import HeaderComponent from "./components/HeaderComponent";
import CardComponent from "./components/CardComponent";

import { Button, Segment } from "semantic-ui-react";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [userETHBalance, setUserETHBalance] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [contract, setContract] = useState({});
  const [chainId, setChainId] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(0);
  const [didRequestToken, setDidRequestToken] = useState(false);

  useEffect(() => {
    initWeb3();
  }, []);

  const initWeb3 = async () => {
    let web3 = null;
    const contractAddress = "0x54956E74cb8bF3974A7a03Aef313287956E4c254";
    let token;
    let tokenNameString;
    let blockchainId;
    let ttlSupply;
    let symbol;
    let bal;
    let ethBal;
    let decimals;
    let didRequest;
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
      blockchainId = await web3.eth.getChainId();
      setChainId(blockchainId);
      ttlSupply = await token.methods.totalSupply().call();
      setTotalSupply(web3.utils.fromWei(ttlSupply, "ether"));
      symbol = await token.methods.symbol().call();
      setTokenSymbol(symbol);
      let acc = await web3.eth.getAccounts();
      let user = acc[0];
      bal = await token.methods.balanceOf(user).call();
      setUserBalance(bal);
      ethBal = await web3.eth.getBalance(user);
      setUserETHBalance(web3.utils.fromWei(ethBal, "ether"));
      decimals = await token.methods.decimals().call();
      setTokenDecimals(decimals);
      didRequest = await token.methods.tokenRequested(user).call();
      setDidRequestToken(didRequest);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const connectUser = async () => {
    let accounts;
    // console.log(contract);
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

  window.ethereum.on("accountsChanged", async (accounts) => {
    initWeb3();
  });
  window.ethereum.on("chainChanged", (chainId) => {
    setChainId(parseInt(chainId));
  });
  return (
    <div className="App">
      {/* HEADER */}
      <Segment>
        <HeaderComponent
          userAddress={userAddress}
          web3={web3}
          tokenName={tokenName}
          contract={contract}
          chainId={chainId}
          totalSupply={totalSupply}
          tokenSymbol={tokenSymbol}
          userBalance={userBalance}
          tokenDecimals={tokenDecimals}
          userETHBalance={userETHBalance}
        />
        {userAddress === "" ? (
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
          contract={contract}
          didRequestToken={didRequestToken}
          userAddress={userAddress}
          initWeb3={initWeb3}
        />
      </Segment>
    </div>
  );
};

export default App;
